export async function uploadProductsToGitHub(products: any[]) {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const owner = 'اسم_المستخدم_على_GitHub';
  const repo = 'alma-store';
  const branch = 'main';
  const path = 'public/data/products.json';

  const content = JSON.stringify(products, null, 2);
  const encodedContent = btoa(unescape(encodeURIComponent(content)));

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    const fileData = await res.json();
    const sha = fileData.sha;

    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: 'Update products.json',
        content: encodedContent,
        sha,
        branch,
      }),
    });
  } catch (error) {
    console.error('فشل في رفع البيانات إلى GitHub:', error);
  }
}
