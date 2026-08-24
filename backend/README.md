# 🛡️ Yousif Tariq - Portfolio Django Backend & CMS API

خادم الباك إند ونظام إدارة المحتوى المتقدم (Django 5 + Django REST Framework + WhiteNoise + Gunicorn).

---

## 🚀 النشر على Render (Deploy to Render):

1. سجل دخولك على [Render.com](https://render.com/).
2. اختر **New +** ثم **Web Service**.
3. اربط هذا المستودع: `https://github.com/Yousif-tariq/cv_bacend`.
4. الإعدادات المطلوبة:
   - **Name:** `yousif-portfolio-backend`
   - **Environment:** `Python 3`
   - **Build Command:** `./build.sh` (أو `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate && python seed_data.py`)
   - **Start Command:** `gunicorn config.wsgi:application`
5. اضغط **Deploy Web Service**.

---

## 🔑 الدخول للوحة التحكم (Admin Panel):
- **الرابط:** `https://<YOUR-RENDER-URL>.onrender.com/admin/`
- **اسم المستخدم (Username):** `admin`
- **كلمة المرور (Password):** `admin123`

---

## 🌐 نقاط النهاية (API Endpoints):
- `GET /api/portfolio-data/`: جلب كافة بيانات الموقع باللغتين العربية والإنجليزية.
- `POST /api/contact/`: إرسال رسائل التواصل وتخزينها في قاعدة البيانات.
