const axios = require("axios");

const callAI = async (messageText) => {
  const prompt = `أنت محلّل نوايا باللهجة العربية السورية. اقرَأ رسالة المستخدم وأعد فقط JSON صحيح بصيغة:\n{\n  "intent": "<intent_name>",\n  "entities": { ... }\n}\nقائمة الأمثلة:\n"أريد 2 كيس بطاطا" => {"intent":"place_order","entities":{"items":[{"name":"بطاطا","qty":2}]}}\n"كم سعر البسكويت؟" => {"intent":"ask_price","entities":{"product":"بسكويت"}}\n"ضيف منتج: بسكويت، سعر 200، كمية 10" => {"intent":"add_product","entities":{"name":"بسكويت","price":200,"stock":10}}\n"الغاء الطلب 12345" => {"intent":"cancel_order","entities":{"order_id":"12345"}}\nالآن حلّل الرسالة التالية فقط: "${messageText}"\n`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Or gpt-4, or Gemini equivalent
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI service:", error.response ? error.response.data : error.message);
    return { intent: "unknown", entities: {} };
  }
};

module.exports = { callAI };


