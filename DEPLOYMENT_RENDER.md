# 🚀 دليل نشر الواجهة الخلفية على Render و GitHub
# Django Backend Deployment Guide (Render.com & GitHub)

تم تجهيز وهندسة الواجهة الخلفية لتكون متوافقة 100% مع نشر الإنتاج الفوري (One-Click / Auto-Deploy) على منصة **Render** وربطها بقاعدة بيانات **Turso (libSQL)**.

---

## 📋 1. إعدادات النشر على منصة Render (Render Web Service Settings)

عند إنشاء خدمة جديدة **New Web Service** على [Render.com](https://dashboard.render.com/):

| الإعداد (Setting) | القيمة المطلوبة (Value) |
| :--- | :--- |
| **Language / Runtime** | `Python 3` |
| **Root Directory** | `backend` *(إذا تم ربط مستودع المشروع كاملاً)* |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT` |
| **Plan Type** | `Free` (أو Starter) |

---

## 🔑 2. متغيرات البيئة في Render (Environment Variables)

داخل تبويب **Environment** في خدمة Render، أضف المتغيرات التالية:

| المتغير (Key) | القيمة (Value) | الوصف |
| :--- | :--- | :--- |
| `PYTHON_VERSION` | `3.12.2` | إصدار بايثون |
| `DEBUG` | `False` | إيقاف وضع التطوير |
| `DJANGO_SECRET_KEY` | *(اضغط Generate أو اكتب نصاً طويلاً)* | مفتاح التشفير السري |
| `ALLOWED_HOSTS` | `.onrender.com,localhost,127.0.0.1` | النطاقات المصرح لها |
| `TURSO_DATABASE_URL` | `https://resueem-yousif249x.aws-ap-south-1.turso.io` | رابط قاعدة بيانات Turso |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` | الرمز الأمني لقاعدة بيانات Turso |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | اسم مستخدم لوحة التحكم |
| `DJANGO_SUPERUSER_PASSWORD` | `اختر_كلمة_مرور_قوية` | كلمة مرور لوحة التحكم |
| `DJANGO_SUPERUSER_EMAIL` | `yousif.tariq@engineer.dev` | بريد المدير |

---

## 🛠️ 3. خطوات الرفع على GitHub (Git Commands)

```bash
git add .
git commit -m "feat: prepare production backend for Render deployment with Turso db"
git push origin main
```

---

## 🌐 4. ربط الواجهة الأمامية بالخادم بعد النشر

بعد اكتمال بناء ونشر الخادم، انسخ عنوان الـ URL الذي يعطيك إياه Render، وضعه في متغيرات بيئة الواجهة الأمامية (مثل Vercel):
```env
VITE_API_URL=https://your-backend-app.onrender.com
```
