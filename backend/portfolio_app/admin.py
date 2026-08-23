from django.contrib import admin
from django.utils.html import format_html
from .models import (
    HeroProfile,
    SkillCategory,
    SkillItem,
    ProjectItem,
    ExperienceItem,
    ContactMessage,
    SiteSettings
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
