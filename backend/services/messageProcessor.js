const { getSession, updateSession, deleteSession } = require('./sessionService');
const { sendMessage, getTelegramFileUrl } = require('./telegramService');
const { callAI } = require('./ai');
const { createProduct } = require('./productService');
const { uploadImageFromUrl } = require('./storageService');
const axios = require('axios');


const processMessage = async (channel, payload) => {
  if (channel !== 'telegram' || !payload.message) {
    return;
  }

  const chatId = payload.message.chat.id.toString();
  const text = payload.message.text;
  const photo = payload.message.photo;

  console.log(`Processing message from Telegram chat ID ${chatId}`);

  const session = await getSession(chatId);

  // Handle multi-step conversation (e.g., adding a product)
  if (session && session.current_step) {
    let context = session.context || {};

    // Handle photo upload step
    if (session.current_step === 'awaiting_product_image') {
      if (!photo) {
        await sendMessage(chatId, 'الرجاء إرسال صورة للمتابعة.');
        return;
      }
      try {
        await sendMessage(chatId, 'جاري رفع الصورة، الرجاء الانتظار...');

        // Get the largest photo
        const fileId = photo[photo.length - 1].file_id;

        // Get file path from Telegram
        const fileUrl = await getTelegramFileUrl(fileId);
        if (!fileUrl) {
          throw new Error('Could not get file path from Telegram.');
        }

        // Upload to Supabase
        const fileName = `products/${chatId}-${Date.now()}.jpg`;
        const publicUrl = await uploadImageFromUrl(fileUrl, 'product_images', fileName);
        if (!publicUrl) {
            throw new Error('Failed to upload image to storage.');
        }
        context.image_url = publicUrl;

        // Create product in DB
        const newProduct = await createProduct(context);
        if (!newProduct) {
            throw new Error('Failed to save product to database.');
        }

        await sendMessage(chatId, `✅ تم إضافة المنتج بنجاح!\n\n*الاسم:* ${newProduct.name}\n*الوصف:* ${newProduct.description}\n*السعر:* ${newProduct.price}\n[عرض الصورة](${newProduct.image_url})`);

        await deleteSession(chatId); // End session

      } catch (error) {
        console.error('Error during image upload and product creation:', error);
        await sendMessage(chatId, 'حدث خطأ أثناء معالجة الصورة. الرجاء المحاولة مرة أخرى.');
      }
      return;
    }

    // Handle text-based steps
    switch (session.current_step) {
      case 'awaiting_product_name':
        context.name = text;
        await updateSession(chatId, 'awaiting_product_description', context);
        await sendMessage(chatId, 'رائع. الآن، ما هو وصف المنتج؟');
        break;
      case 'awaiting_product_description':
        context.description = text;
        await updateSession(chatId, 'awaiting_product_price', context);
        await sendMessage(chatId, 'ممتاز. ما هو سعر المنتج؟');
        break;
      case 'awaiting_product_price':
        const price = parseFloat(text);
        if (isNaN(price) || price <= 0) {
          await sendMessage(chatId, 'الرجاء إدخال سعر صحيح (رقم أكبر من صفر).');
          return;
        }
        context.price = price;
        await updateSession(chatId, 'awaiting_product_image', context);
        await sendMessage(chatId, 'أخيراً، الرجاء إرسال صورة للمنتج.');
        break;
      default:
        await deleteSession(chatId);
        await sendMessage(chatId, 'كنت في عملية غير معروفة، تم إلغاؤها. كيف يمكنني خدمتك الآن؟');
    }
    return;
  }

  // If no active session, use AI to understand intent
  try {
    const aiResultString = await callAI(text);
    const aiResult = JSON.parse(aiResultString); // The AI returns a stringified JSON

    console.log('AI Analysis Result:', aiResult);

    const { intent, entities } = aiResult;

    // TODO: Implement a router to handle different intents
    if (intent === 'add_product') {
      // Start a new session for adding a product
      await updateSession(chatId, 'awaiting_product_name', entities || {});
      await sendMessage(chatId, 'حسناً، لنبدأ بإضافة منتج جديد. ما هو اسم المنتج؟');
    } else if (intent === 'ask_price') {
      await sendMessage(chatId, `أنت تسأل عن سعر: ${entities.product}. (سيتم تنفيذ البحث قريباً)`);
    } else {
      await sendMessage(chatId, `لقد فهمت أنك تريد: ${intent}. (سيتم تنفيذ المنطق قريباً)`);
    }

  } catch (error) {
    console.error('Error during AI processing or intent handling:', error);
    await sendMessage(chatId, 'عذراً، لم أتمكن من فهم طلبك. هل يمكنك إعادة الصياغة؟');
  }
};

const setupQueueProcessor = () => {
  // The queue worker is not needed for this simplified, direct-response model.
  // We can re-introduce it later if performance requires it.
  return;
};

module.exports = { processMessage, setupQueueProcessor };


