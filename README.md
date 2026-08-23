# 🌌 Yousif Tariq - Quantum Systems 3D Portfolio & CMS Core

منصة سيرة ذاتية تفاعلية ثلاثية الأبعاد ونظام إدارة محتوى متقدم للمهندس **يوسف طارق**، تم بناؤها بمعمارية هجينة تجمع بين محرك رسومات ثلاثي الأبعاد فائق السرعة (**Three.js / WebGL**) وواجهة **React 19** الحديثة مع خادم خلفي ديناميكي **Django REST Framework & CMS**.

---

## ⚡ المميزات المعمارية الرئيسية:

- **🌌 3D Interactive Spatial Canvas**: محرك تفاعلي ثلاثي الأبعاد باستخدام Three.js يتفاعل مع حركة الفأرة والتمرير السلس (Smooth Scrolling عبر Lenis).
- **🎭 Hologram Portrait & Sliced Masking**: صورة شخصية تفاعلية ثنائية الطبقة تكشف بدقة صورة الـ Alter Ego عند التمرير بالماوس.
- **🛡️ Django Admin CMS**: لوحة تحكم إدارية متكاملة للتحكم في كافة النصوص، المهارات، المشاريع، الخبرات، ورفع الصور من الجهاز مباشرة.
- **🌐 Bilingual & Theming**: دعم كامل للغتين العربية والإنجليزية مع إمكانية التبديل بين الوضع المظلم والنهاري (Dark/Light).
- **🐳 Dockerized Architecture**: جاهز للتشغيل والإنتاج الفوري عبر Docker & Docker Compose مع خادم Nginx و Gunicorn.
- **🚀 Ready for Vercel & Cloud**: مهيأ للنشر المباشر على Vercel و GitHub وخدمات الاستضافة السحابية.

---

## 🛠️ بنية المشروع (Project Structure):

```text
├── frontend/                # واجهة المستخدم (React 19 + Vite + Three.js)
│   ├── src/                 # مكونات الواجهة والمشاهد ثلاثية الأبعاد
│   ├── nginx.conf           # إعدادات خادم الإنتاج Nginx
│   ├── Dockerfile           # بناء الحاوية متعدد المراحل
│   └── vercel.json          # إعدادات النشر على منصة Vercel
├── backend/                 # الخادم الخلفي ونظام CMS (Django + DRF)
│   ├── portfolio_app/       # النماذج وقواعد البيانات ولوحة التحكم
│   ├── config/              # إعدادات Django وتوجيه الروابط
│   ├── seed_data.py         # زرع البيانات الافتراضية
│   ├── entrypoint.sh        # ترحيل البيانات وتشغيل Gunicorn
│   └── Dockerfile           # بناء حاوية البايثون
├── docker-compose.yml       # تشغيل المنظومة كاملة بضغطة واحدة
├── vercel.json              # إعدادات Vercel الجذرية
└── README_DOCKER.md         # دليل تشغيل دوكر المفصل
```

---

## 🚀 التشغيل السريع محلياً (Local Development):

### 1. تشغيل الباك إند (Django Backend):
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate      # على ويندوز
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver 127.0.0.1:8000
```

### 2. تشغيل الواجهة (Frontend):
```bash
cd frontend
npm install
npm run dev
```
- افتح الموقع: [http://localhost:5173/](http://localhost:5173/)
- لوحة تحكم Django: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) (المستخدم: `admin` / كلمة المرور: `admin123`)

---

## 🐳 التشغيل عبر Docker:

```bash
docker compose up --build
```
- الموقع: [http://localhost/](http://localhost/) أو [http://localhost:3000/](http://localhost:3000/)
- لوحة التحكم: [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

## ☁️ النشر على Vercel (Frontend Deployment):

1. **ارفع الكود إلى GitHub** (راجع خطوات Git بالأسفل).
2. ادخل على منصة [Vercel](https://vercel.com/) واضغط **Add New Project**.
3. اختر مستودع الـ GitHub الخاص بك.
4. **في إعدادات المشروع على Vercel:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./frontend` (أو اتركها كـ `./` حيث تم إعداد `vercel.json` تلقائياً).
   - **Environment Variables (اختياري):**
     - `VITE_API_URL`: رابط الباك إند المرفوع (مثلاً على Render / Railway / PythonAnywhere).
5. اضغط **Deploy**.

---

## 📦 رفع التحديثات إلى GitHub:

```bash
git add .
git commit -m "feat: complete 3D interactive portfolio with Django CMS, Docker & Vercel readiness"
git push origin main
```

---

## 👨‍💻 المهندس يوسف طارق (Yousif Tariq)
- Lead Systems & Software Engineer
- High-Performance Distributed Architectures & 3D Interactive Web
