from django.db import models

class HeroProfile(models.Model):
    name_ar = models.CharField(max_length=150, default="يوسف طارق", verbose_name="الاسم بالعربية")
    name_en = models.CharField(max_length=150, default="Yousif Tariq", verbose_name="الاسم بالإنجليزية")
    role_ar = models.CharField(max_length=200, default="مهندس أنظمة وبرمجيات متقدمة", verbose_name="المسمى الوظيفي بالعربية")
    role_en = models.CharField(max_length=200, default="Lead Systems & Software Engineer", verbose_name="المسمى الوظيفي بالإنجليزية")
    badge_ar = models.CharField(max_length=200, default="مهندس أنظمة وبرمجيات • Systems & Software Engineer", verbose_name="شارة التعريف بالعربية")
    badge_en = models.CharField(max_length=200, default="Systems & Software Engineer", verbose_name="شارة التعريف بالإنجليزية")
    bio_ar = models.TextField(default="مهندس برمجيات ونظم شغوف بهندسة البنى التحتية المتينة وتطوير حلول برمجية متكاملة تمزج بين الأداء الخارق وجمال التجربة الرقمية.", verbose_name="النبذة بالعربية")
    bio_en = models.TextField(default="A passionate systems & software engineer dedicated to building resilient distributed infrastructures and scalable software solutions.", verbose_name="النبذة بالإنجليزية")
    
    # Photos
    primary_photo = models.ImageField(upload_to="profile/", blank=True, null=True, verbose_name="الصورة الشخصية الأساسية")
    alter_ego_photo = models.ImageField(upload_to="profile/", blank=True, null=True, verbose_name="الصورة الشخصية الثانية (Alter Ego)")

    # Buttons
    cta_primary_ar = models.CharField(max_length=100, default="ابدأ الغوص في المعمارية", verbose_name="نص الزر الرئيسي بالعربية")
    cta_primary_en = models.CharField(max_length=100, default="Explore Architecture Dive", verbose_name="نص الزر الرئيسي بالإنجليزية")
    cta_secondary_ar = models.CharField(max_length=100, default="إرسال إشارة اتصال", verbose_name="نص الزر الثانوي بالعربية")
    cta_secondary_en = models.CharField(max_length=100, default="Transmit Signal", verbose_name="نص الزر الثانوي بالإنجليزية")

    # Metrics / Stats
    stat_1_val = models.CharField(max_length=50, default="+5", verbose_name="إحصائية 1 - القيمة")
    stat_1_lbl_ar = models.CharField(max_length=100, default="سنوات الخبرة في الهندسة", verbose_name="إحصائية 1 - النص بالعربية")
    stat_1_lbl_en = models.CharField(max_length=100, default="Years Engineering Experience", verbose_name="إحصائية 1 - النص بالإنجليزية")

    stat_2_val = models.CharField(max_length=50, default="+28", verbose_name="إحصائية 2 - القيمة")
    stat_2_lbl_ar = models.CharField(max_length=100, default="أنظمة ومشاريع منجزة", verbose_name="إحصائية 2 - النص بالعربية")
    stat_2_lbl_en = models.CharField(max_length=100, default="Production Systems Built", verbose_name="إحصائية 2 - النص بالإنجليزية")

    stat_3_val = models.CharField(max_length=50, default="< 5ms", verbose_name="إحصائية 3 - القيمة")
    stat_3_lbl_ar = models.CharField(max_length=100, default="كفاءة وزمن استجابة أقل من", verbose_name="إحصائية 3 - النص بالعربية")
    stat_3_lbl_en = models.CharField(max_length=100, default="Core Latency Target", verbose_name="إحصائية 3 - النص بالإنجليزية")

    stat_4_val = models.CharField(max_length=50, default="99.9%", verbose_name="إحصائية 4 - القيمة")
    stat_4_lbl_ar = models.CharField(max_length=100, default="جاهزية واستقرار النظم", verbose_name="إحصائية 4 - النص بالعربية")
    stat_4_lbl_en = models.CharField(max_length=100, default="System Availability", verbose_name="إحصائية 4 - النص بالإنجليزية")

    is_active = models.BooleanField(default=True, verbose_name="تفعيل هذا الملف")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="آخر تحديث")

    class Meta:
        verbose_name = "الملف الشخصي والواجهة الرئيسية (Hero)"
        verbose_name_plural = "الملف الشخصي والواجهة الرئيسية (Hero)"

    def __str__(self):
        return f"{self.name_ar} ({self.name_en})"


class SkillCategory(models.Model):
    category_id = models.CharField(max_length=50, unique=True, verbose_name="المعرف البرمجي (systems, distributed, software, data)")
    name_ar = models.CharField(max_length=150, verbose_name="اسم التصنيف بالعربية")
    name_en = models.CharField(max_length=150, verbose_name="اسم التصنيف بالإنجليزية")
    order = models.PositiveIntegerField(default=1, verbose_name="الترتيب")

    class Meta:
        verbose_name = "تصنيف مهارات"
        verbose_name_plural = "تصنيفات المهارات"
        ordering = ['order']

    def __str__(self):
        return self.name_ar


class SkillItem(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name="skills", verbose_name="التصنيف")
    name = models.CharField(max_length=100, verbose_name="اسم المهارة أو التقنية")
    level = models.PositiveIntegerField(default=85, verbose_name="نسبة الإتقان (1-100)%")
    desc_ar = models.TextField(blank=True, verbose_name="الوصف والتفاصيل بالعربية")
    desc_en = models.TextField(blank=True, verbose_name="الوصف والتفاصيل بالإنجليزية")
    order = models.PositiveIntegerField(default=1, verbose_name="الترتيب")

    class Meta:
        verbose_name = "مهارة تقنية"
        verbose_name_plural = "المهارات والتقنيات"
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.name} ({self.level}%)"


class ProjectItem(models.Model):
    title = models.CharField(max_length=200, verbose_name="عنوان المشروع")
    category = models.CharField(max_length=100, default="Distributed Systems", verbose_name="تصنيف المشروع")
    desc_ar = models.TextField(verbose_name="وصف المشروع بالعربية")
    desc_en = models.TextField(verbose_name="وصف المشروع بالإنجليزية")
    
    # Stats
    stat_throughput = models.CharField(max_length=50, default="1.2M ops/sec", verbose_name="مقياس الأداء / Throughput")
    stat_latency = models.CharField(max_length=50, default="< 1.8ms", verbose_name="زمن التأخير / Latency")
    stat_availability = models.CharField(max_length=50, default="99.999%", verbose_name="الجاهزية / Availability")
    
    tags = models.CharField(max_length=300, default="C++20, Rust, gRPC", verbose_name="الوسوم التقنية (مفصولة بفاصلة)")
    features_ar = models.TextField(help_text="اكتب كل ميزة في سطر منفصل", verbose_name="الميزات المعمارية بالعربية")
    features_en = models.TextField(help_text="Each feature on a new line", verbose_name="الميزات المعمارية بالإنجليزية")
    
    demo_url = models.URLField(blank=True, default="#", verbose_name="رابط المعاينة المباشرة")
    github_url = models.URLField(blank=True, default="#", verbose_name="رابط كود المصدر (GitHub)")
    order = models.PositiveIntegerField(default=1, verbose_name="الترتيب")

    class Meta:
        verbose_name = "مشروع بارز"
        verbose_name_plural = "المشاريع الكبرى"
        ordering = ['order']

    def __str__(self):
        return self.title


class ExperienceItem(models.Model):
    role_ar = models.CharField(max_length=150, verbose_name="المسمى الوظيفي بالعربية")
    role_en = models.CharField(max_length=150, verbose_name="المسمى الوظيفي بالإنجليزية")
    company = models.CharField(max_length=150, verbose_name="اسم الشركة / المنظمة")
    period_ar = models.CharField(max_length=100, default="2024 - الآن", verbose_name="الفترة بالعربية")
    period_en = models.CharField(max_length=100, default="2024 - Present", verbose_name="الفترة بالإنجليزية")
    desc_ar = models.TextField(verbose_name="وصف الإنجازات والمهام بالعربية")
    desc_en = models.TextField(verbose_name="وصف الإنجازات والمهام بالإنجليزية")
    skills = models.CharField(max_length=300, default="System Architecture, Kubernetes, High-Performance C++", verbose_name="التقنيات المستخدمة (مفصولة بفاصلة)")
    order = models.PositiveIntegerField(default=1, verbose_name="الترتيب")

    class Meta:
        verbose_name = "محطة خبرة مهنية"
        verbose_name_plural = "مسار الخبرات والقيادة"
        ordering = ['order']

    def __str__(self):
        return f"{self.role_ar} @ {self.company}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150, verbose_name="الاسم")
    email = models.EmailField(verbose_name="البريد الإلكتروني")
    subject = models.CharField(max_length=200, blank=True, default="استفسار عام", verbose_name="الموضوع")
    message = models.TextField(verbose_name="نص الرسالة")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الاستلام")
    is_read = models.BooleanField(default=False, verbose_name="تمت القراءة")
    admin_notes = models.TextField(blank=True, verbose_name="ملاحظات الإدارة")

    class Meta:
        verbose_name = "رسالة واردة"
        verbose_name_plural = "صندوق الرسائل الواردة"
        ordering = ['-created_at']

    def __str__(self):
        return f"رسالة من: {self.name} ({self.email})"


class SiteSettings(models.Model):
    title = models.CharField(max_length=150, default="إعدادات المنظومة والموقع", verbose_name="عنوان الإعدادات")
    email = models.EmailField(default="yousif.tariq@engineer.dev", verbose_name="البريد الرسمي")
    location_ar = models.CharField(max_length=200, default="الرياض • متاح للعمل عن بعد وحول العالم", verbose_name="الموقع بالعربية")
    location_en = models.CharField(max_length=200, default="Riyadh • Available for Global & Remote Challenges", verbose_name="الموقع بالإنجليزية")
    status_ar = models.CharField(max_length=200, default="متاح حالياً للمشاريع والتحديات الهندسية المتقدمة 🟢", verbose_name="حالة التوفر بالعربية")
    status_en = models.CharField(max_length=200, default="Currently Available for Advanced Systems & Architecture Roles 🟢", verbose_name="حالة التوفر بالإنجليزية")
    terminal_title = models.CharField(max_length=150, default="yousif@quantum-core:~$ connect --secure", verbose_name="عنوان شاشة الأوامر")

    class Meta:
        verbose_name = "إعدادات الموقع والتواصل"
        verbose_name_plural = "إعدادات الموقع والتواصل"

    def __str__(self):
        return self.title


class VisitorLog(models.Model):
    """
    Records detailed device, browser, and network visits to the application.
    """
    ip_address = models.GenericIPAddressField(verbose_name="عنوان الـ IP", null=True, blank=True)
    device_id = models.CharField(max_length=120, db_index=True, verbose_name="معرف الجهاز الفريد")
    user_agent = models.TextField(blank=True, verbose_name="بيانات المتصفح والنظام (User Agent)")
    device_type = models.CharField(max_length=50, default="Desktop", verbose_name="نوع الجهاز (Mobile/Desktop/Tablet)")
    browser = models.CharField(max_length=100, default="Unknown", verbose_name="المتصفح")
    os = models.CharField(max_length=100, default="Unknown", verbose_name="نظام التشغيل")
    language = models.CharField(max_length=10, default="en", verbose_name="لغة التصفح")
    screen_resolution = models.CharField(max_length=50, blank=True, verbose_name="دقة الشاشة")
    referrer = models.URLField(max_length=500, blank=True, null=True, verbose_name="مصدر الزيارة (Referrer)")
    path_visited = models.CharField(max_length=200, default="/", verbose_name="الصفحة / المسار")
    country = models.CharField(max_length=100, blank=True, null=True, verbose_name="الدولة")
    city = models.CharField(max_length=100, blank=True, null=True, verbose_name="المدينة")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="تاريخ ووقت الزيارة")

    class Meta:
        verbose_name = "سجل زيارة جهاز"
        verbose_name_plural = "سجلات زيارات التطبيق (Analytics)"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.device_type} ({self.os}/{self.browser}) - IP: {self.ip_address or 'Unknown'} @ {self.created_at.strftime('%Y-%m-%d %H:%M')}"

