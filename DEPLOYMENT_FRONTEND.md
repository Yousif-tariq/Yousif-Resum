# 🚀 دليل نشر الواجهة الأمامية (Frontend Deployment Guide)
# Vercel / Netlify / Cloudflare Pages

تم تجهيز الواجهة الأمامية بالكامل للإنتاج مع دعم مدمج لإعادة التوجيه (SPA Routing) وجميع الأصول وملفات الصوت والصور المتجاوبة.

---

## 🌐 1. النشر على منصة Vercel (موصى به)

1. ادخل على [Vercel.com](https://vercel.com/) واضغط على **Add New Project**.
2. اختر مستودع الـ GitHub: `Yousif-tariq/Yousif-Resum`.
3. إذا رفعت المشروع كاملاً، تأكد من:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./` (أو `frontend` حسب هيكل المشروع الذي تختاره)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. في تبويب **Environment Variables**، أضف رابط خادم الـ Backend (من Render):
   ```env
   VITE_API_URL=https://yousif-portfolio-backend.onrender.com
   ```
5. اضغط **Deploy**!

---

## ⚡ 2. النشر على منصة Netlify

1. ادخل على [Netlify.com](https://netlify.com/) واختر **Import from Git**.
2. الإعدادات:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
3. في **Environment variables**:
   - `VITE_API_URL`: رابط سيرفر Render.
4. تم تضمين ملف `_redirects` تلقائياً لضمان عدم حدوث أخطاء 404 عند تحديث الصفحة.
