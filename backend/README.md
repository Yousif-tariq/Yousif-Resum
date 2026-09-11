# 🚀 دليل نشر الواجهة الخلفية على Render و GitHub
# Django Backend Deployment Guide (Render.com & GitHub)

هذا الدليل يوضح لك بالخطوات السريعة والمباشرة كيفية رفع الواجهة الخلفية (`backend/`) إلى **GitHub** ونشرها على منصة **Render** وربطها بقاعدة بيانات **Turso (libSQL)**.

---

## 📋 1. إعدادات النشر على منصة Render (Render Web Service Settings)

عند إنشاء خدمة جديدة **New Web Service** على [Render.com](https://dashboard.render.com/):

| الإعداد (Setting) | القيمة المطلوبة (Value) |
| :--- | :--- |
| **Language / Runtime** | `Python 3` |
| **Root Directory** | `backend` *(إذا رفعت المستودع كاملاً)* أو اتركها فارغة *(إذا كان المستودع للـ backend فقط)* |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT` |
| **Plan Type** | `Free` (أو Starter) |

---

## 🔑 2. متغيرات البيئة في Render (Environment Variables)

داخل تبويب **Environment** في خدمة Render، أضف المتغيرات التالية:

| المتغير (Key) | القيمة (Value) | الوصف |
| :--- | :--- | :--- |
| `PYTHON_VERSION` | `3.12.2` | إصدار بايثون المدعوم |
| `DEBUG` | `False` | تعطيل وضع التطوير في الإنتاج |
| `DJANGO_SECRET_KEY` | *(اضغط Generate أو اكتب نصاً طويلاً عشوائياً)* | مفتاح التشفير السري لـ Django |
| `ALLOWED_HOSTS` | `.onrender.com,localhost,127.0.0.1` | النطاقات المسموح باستقبال الطلبات منها |
| `TURSO_DATABASE_URL` | `https://resueem-yousif249x.aws-ap-south-1.turso.io` | رابط قاعدة بيانات Turso السحابية |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` | الرمز الأمني لقاعدة بيانات Turso |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | اسم مستخدم لوحة التحكم |
| `DJANGO_SUPERUSER_PASSWORD` | `اختر_كلمة_مرور_قوية_هنا` | كلمة مرور لوحة التحكم |
| `DJANGO_SUPERUSER_EMAIL` | `yousif.tariq@engineer.dev` | البريد الإلكتروني للمدير |

---

## 🛠️ 3. أوامر الرفع إلى GitHub (Git Push Steps)

من موجه الأوامر (Terminal / PowerShell):

```bash
# 1. الانتقال إلى مجلد المشروع
cd c:\Users\cooly\Desktop\yousif_resuom

# 2. إضافة كافة الملفات المحدثة
git add .

# 3. حفظ التغييرات برسالة واضحة
git commit -m "feat: prepare production backend for Render deployment with Turso db"

# 4. رفع الكود إلى فرعك الرئيسي على GitHub
git push origin main
```

---

## 🌐 4. ربط الواجهة الأمامية بالواجهة الخلفية (Connect Frontend to Render)

بعد انتهاء النشر على Render، ستحصل على رابط مثل:
`https://yousif-portfolio-backend.onrender.com`

قم بإضافته في إعدادات البيئة الخاصة بالواجهة الأمامية (Vercel / Netlify / .env):
```env
VITE_API_URL=https://yousif-portfolio-backend.onrender.com
```

---

## ✅ 5. ماذا يحدث أثناء عملية البناء (`build.sh`)؟
1. تحديث وتثبيت كافة الحزم المطلوبة من `requirements.txt`.
2. تجميع الملفات الثابتة عبر **WhiteNoise** لتوفير أداء فائق وسرعة تحميل للوحة التحكم.
3. ترحيل وتطبيق جداول قاعدة البيانات (`migrate`) تلقائياً على سحابة Turso.
4. تنفيذ سكريبت التهيئة التلقائية (`seed_data.py`) لإنشاء حساب المدير والبيانات الأساسية تلقائياً دون أي تدخل يدوي.
