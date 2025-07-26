import axios from "axios";

// تحميل المتغيرات من .env
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// إعدادات مستودع GitHub
const REPO_OWNER = "alaa8ali";
const REPO_NAME = "alma-store";
const BRANCH_NAME = "main";

// مسار الملف داخل المستودع (يمكن تغييره إلى services.json حسب الحاجة)
const FILE_PATH = "public/data/products.json";

async function uploadToGitHub(jsonData: object) {
  try {
    // جلب محتوى الملف الحالي للحصول على sha (للتحديث)
    const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    };

    let sha = "";

    try {
      const res = await axios.get(getUrl, { headers });
      sha = res.data.sha;
    } catch (err) {
      console.warn("ملف جديد سيتم إنشاؤه، لا يوجد ملف سابق.");
    }

    // تجهيز بيانات الملف الجديد (base64)
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(jsonData, null, 2))));

    const payload = {
      message: `🛒 تحديث ملف المنتجات (${new Date().toISOString()})`,
      content: content,
      branch: BRANCH_NAME,
      sha: sha || undefined,
    };

    // إرسال التحديث
    const res = await axios.put(getUrl, payload, { headers });

    console.log("✅ تم رفع الملف إلى GitHub:", res.data.content.path);
  } catch (error) {
    console.error("❌ فشل رفع الملف إلى GitHub:", error);
    alert("حدث خطأ أثناء حفظ البيانات على GitHub.");
  }
}

export default uploadToGitHub;
