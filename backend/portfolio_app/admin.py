from django.contrib import admin
from django.utils.html import format_html
from .models import (
    HeroProfile,
    SkillCategory,
    SkillItem,
    ProjectItem,
    ExperienceItem,
    ContactMessage,
    SiteSettings,
    VisitorLog
)

admin.site.site_header = "لوحة تحكم منصة المهندس يوسف طارق | Quantum CMS"
admin.site.site_title = "إدارة المنظومة"
admin.site.index_title = "مرحباً بك في لوحة تحكم السيرة الذاتية ثلاثية الأبعاد 🚀"

class SkillItemInline(admin.TabularInline):
    model = SkillItem
    extra = 1
    fields = ['name', 'level', 'desc_ar', 'desc_en', 'order']

@admin.register(HeroProfile)
class HeroProfileAdmin(admin.ModelAdmin):
    list_display = ['name_ar', 'role_ar', 'primary_photo_preview', 'alter_ego_photo_preview', 'is_active', 'updated_at']
    list_editable = ['is_active']
    readonly_fields = ['primary_photo_preview_large', 'alter_ego_photo_preview_large']
    fieldsets = (
        ('المعلومات الأساسية (Identity)', {
            'fields': (('name_ar', 'name_en'), ('role_ar', 'role_en'), ('badge_ar', 'badge_en'), ('bio_ar', 'bio_en'))
        }),
        ('الصور الشخصية والتفاعلية (Hologram Photos)', {
            'description': 'يمكنك رفع الصورة الأساسية وصورة التأثير التفاعلي (Alter Ego) التي تظهر عند تمرير المؤشر مباشرة من جهازك.',
            'fields': (
                ('primary_photo', 'primary_photo_preview_large'),
                ('alter_ego_photo', 'alter_ego_photo_preview_large')
            )
        }),
        ('أزرار الإجراءات (Call to Actions)', {
            'fields': (('cta_primary_ar', 'cta_primary_en'), ('cta_secondary_ar', 'cta_secondary_en'))
        }),
        ('إحصائيات الإنجازات (Metrics / Stats)', {
            'fields': (
                ('stat_1_val', 'stat_1_lbl_ar', 'stat_1_lbl_en'),
                ('stat_2_val', 'stat_2_lbl_ar', 'stat_2_lbl_en'),
                ('stat_3_val', 'stat_3_lbl_ar', 'stat_3_lbl_en'),
                ('stat_4_val', 'stat_4_lbl_ar', 'stat_4_lbl_en'),
            )
        }),
        ('حالة التفعيل', {
            'fields': ('is_active',)
        }),
    )

    def primary_photo_preview(self, obj):
        if obj.primary_photo:
            return format_html('<img src="{}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 8px; border: 2px solid #a855f7;" />', obj.primary_photo.url)
        return "لا توجد صورة"
    primary_photo_preview.short_description = "معاينة الأساسية"

    def alter_ego_photo_preview(self, obj):
        if obj.alter_ego_photo:
            return format_html('<img src="{}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 8px; border: 2px solid #f43f5e;" />', obj.alter_ego_photo.url)
        return "لا توجد صورة"
    alter_ego_photo_preview.short_description = "معاينة البديلة (Alter Ego)"

    def primary_photo_preview_large(self, obj):
        if obj.primary_photo:
            return format_html('<img src="{}" style="max-width: 220px; max-height: 220px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid #a855f7;" />', obj.primary_photo.url)
        return "لم يتم رفع صورة أساسية بعد (سيتم استخدام الصورة الافتراضية)"
    primary_photo_preview_large.short_description = "المعاينة الحالية للصورة الأساسية"

    def alter_ego_photo_preview_large(self, obj):
        if obj.alter_ego_photo:
            return format_html('<img src="{}" style="max-width: 220px; max-height: 220px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid #f43f5e;" />', obj.alter_ego_photo.url)
        return "لم يتم رفع صورة بديلة بعد (سيتم استخدام الصورة الافتراضية)"
    alter_ego_photo_preview_large.short_description = "المعاينة الحالية للصورة البديلة"

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_ar', 'category_id', 'order', 'skills_count']
    list_editable = ['order']
    inlines = [SkillItemInline]

    def skills_count(self, obj):
        return obj.skills.count()
    skills_count.short_description = "عدد المهارات"

@admin.register(SkillItem)
class SkillItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level', 'order']
    list_filter = ['category']
    list_editable = ['level', 'order']
    search_fields = ['name', 'desc_ar', 'desc_en']

@admin.register(ProjectItem)
class ProjectItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'stat_throughput', 'stat_latency', 'order']
    list_editable = ['order']
    search_fields = ['title', 'desc_ar', 'tags']
    fieldsets = (
        ('معلومات المشروع الرئيسية', {
            'fields': ('title', 'category', ('desc_ar', 'desc_en'), 'tags', 'order')
        }),
        ('مقاييس الأداء العالي (Metrics)', {
            'fields': (('stat_throughput', 'stat_latency', 'stat_availability'),)
        }),
        ('الميزات المعمارية (Features)', {
            'fields': ('features_ar', 'features_en')
        }),
        ('الروابط الخارجية', {
            'fields': (('demo_url', 'github_url'),)
        }),
    )

@admin.register(ExperienceItem)
class ExperienceItemAdmin(admin.ModelAdmin):
    list_display = ['role_ar', 'company', 'period_ar', 'order']
    list_editable = ['order']
    search_fields = ['role_ar', 'company', 'desc_ar']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    list_editable = ['is_read']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    fieldsets = (
        ('بيانات الرسالة الواردة', {
            'fields': ('name', 'email', 'subject', 'message', 'created_at')
        }),
        ('إجراءات الإدارة', {
            'fields': ('is_read', 'admin_notes')
        }),
    )

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['title', 'email', 'location_ar', 'status_ar']


@admin.register(VisitorLog)
class VisitorLogAdmin(admin.ModelAdmin):
    list_display = ['location_badge', 'device_badge', 'ip_address', 'isp_badge', 'browser', 'os', 'path_visited', 'created_at']
    list_filter = ['country', 'city', 'device_type', 'os', 'browser', 'language', 'created_at']
    search_fields = ['ip_address', 'city', 'country', 'region', 'isp', 'device_id', 'user_agent']
    readonly_fields = [
        'ip_address', 'device_id', 'device_type', 'browser', 'os',
        'language', 'screen_resolution', 'referrer', 'path_visited',
        'location_badge_large', 'map_link', 'country', 'country_code', 'region', 'city',
        'latitude', 'longitude', 'timezone', 'isp', 'user_agent', 'created_at'
    ]
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('الموقع الجغرافي الدقيق والإحداثيات (Geo-Location)', {
            'description': 'بيانات التحديد الجغرافي والإحداثيات اللحظية المستخرجة للزائر.',
            'fields': (
                ('location_badge_large', 'map_link'),
                ('city', 'region'),
                ('country', 'country_code'),
                ('latitude', 'longitude'),
                ('timezone', 'isp')
            )
        }),
        ('بيانات الجهاز والمتصفح (Device & Client Fingerprint)', {
            'fields': (
                ('device_type', 'browser', 'os'),
                ('language', 'screen_resolution'),
                ('device_id',)
            )
        }),
        ('بيانات الشبكة والمسار (Network & Route)', {
            'fields': (
                ('ip_address', 'path_visited'),
                ('referrer', 'created_at'),
                ('user_agent',)
            )
        }),
    )

    def location_badge(self, obj):
        flag = "📍"
        if obj.country_code:
            code = obj.country_code.upper()
            if code == 'SA': flag = "🇸🇦"
            elif code == 'AE': flag = "🇦🇪"
            elif code == 'KW': flag = "🇰🇼"
            elif code == 'QA': flag = "🇶🇦"
            elif code == 'BH': flag = "🇧🇭"
            elif code == 'OM': flag = "🇴🇲"
            elif code == 'EG': flag = "🇪🇬"
            elif code == 'JO': flag = "🇯🇴"
            elif code == 'US': flag = "🇺🇸"
            elif code == 'GB': flag = "🇬🇧"
            elif code == 'DE': flag = "🇩🇪"
            elif code == 'FR': flag = "🇫🇷"
            elif code == 'TR': flag = "🇹🇷"
            elif code == 'IN': flag = "🇮🇳"

        city_txt = obj.city or "مدينة غير محددة"
        country_txt = obj.country or "دولة غير محددة"
        return format_html(
            '<span style="font-weight: 700; color: #a855f7; display: inline-flex; align-items: center; gap: 4px;">{} <b>{}</b> <small style="color: #64748b;">({})</small></span>',
            flag, city_txt, country_txt
        )
    location_badge.short_description = "الموقع الدقيق"

    def location_badge_large(self, obj):
        loc = f"{obj.city or 'Unknown City'}, {obj.region or ''} - {obj.country or 'Unknown Country'}"
        coords = f"[{obj.latitude or '0.0'}, {obj.longitude or '0.0'}]"
        return format_html(
            '<div style="padding: 10px 14px; border-radius: 10px; background: rgba(168, 85, 247, 0.1); border: 1px solid #a855f7; color: #a855f7; font-weight: bold; font-size: 0.95rem;">🌍 {} <span style="color: #06b6d4; margin-right: 8px;">{}</span></div>',
            loc, coords
        )
    location_badge_large.short_description = "الموقع المسجل"

    def map_link(self, obj):
        if obj.latitude is not None and obj.longitude is not None:
            map_url = f"https://www.google.com/maps?q={obj.latitude},{obj.longitude}"
            return format_html(
                '<a href="{}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; background: #0284c7; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 0.85rem; box-shadow: 0 2px 8px rgba(2,132,199,0.4);">🗺️ عرض الموقع الدقيق على خريطة Google Maps ↗</a>',
                map_url
            )
        return "الإحداثيات غير متوفرة"
    map_link.short_description = "الخريطة المباشرة"

    def isp_badge(self, obj):
        if obj.isp:
            return format_html('<span style="font-size: 0.78rem; color: #0284c7; font-weight: 600;">📡 {}</span>', obj.isp[:35])
        return "-"
    isp_badge.short_description = "الشبكة / ISP"

    def device_badge(self, obj):
        color_map = {
            'Mobile': '#10b981',
            'Tablet': '#f59e0b',
            'Desktop': '#38bdf8'
        }
        icon_map = {
            'Mobile': '📱',
            'Tablet': '📟',
            'Desktop': '💻'
        }
        color = color_map.get(obj.device_type, '#a855f7')
        icon = icon_map.get(obj.device_type, '🌐')
        return format_html(
            '<span style="background: {}20; color: {}; border: 1px solid {}80; padding: 3px 10px; border-radius: 999px; font-weight: bold; font-size: 0.8rem;">{} {}</span>',
            color, color, color, icon, obj.device_type
        )
    device_badge.short_description = "الجهاز"

    def has_add_permission(self, request):
        return False


