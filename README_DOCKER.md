# 🐳 تشغيل منصة السيرة الذاتية عبر Docker

تم تجهيز التطبيق بالكامل بحاويات **Docker & Docker Compose** مع خادم **Nginx** عالي الأداء للواجهة الأمامية وخادم **Gunicorn / Python** للباك إند وقاعدة البيانات.

---

## 🚀 التشغيل المباشر بخطوة واحدة:

من المجلد الرئيسي للمشروع، نفّذ الأمر التالي:

```bash
docker compose up --build
```

أو للتشغيل في الخلفية:
```bash
docker compose up -d --build
```

---

## 🌐 الروابط بعد التشغيل عبر Docker:

| الخدمة | الرابط | الوصف |
| :--- | :--- | :--- |
| **الواجهة الأمامية (Frontend)** | [http://localhost/](http://localhost/) أو [http://localhost:3000/](http://localhost:3000/) | الموقع التفاعلي بالكامل عبر Nginx |
| **لوحة تحكم Django Admin** | [http://localhost:8000/admin/](http://localhost:8000/admin/) أو [http://localhost/admin/](http://localhost/admin/) | لوحة إدارة المحتوى ورفع الصور |
| **الـ API التفاعلي** | [http://localhost:8000/api/portfolio-data/](http://localhost:8000/api/portfolio-data/) | واجهة تبادل البيانات الديناميكية |

---

### 🛡️ بيانات الدخول الافتراضية للوحة التحكم:
* **اسم المستخدم:** `admin`
* **كلمة المرور:** `admin123`

---

## 🛑 إيقاف الحاويات:

```bash
docker compose down
```
