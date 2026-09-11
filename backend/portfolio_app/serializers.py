from rest_framework import serializers
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

class ContactMessageSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, trim_whitespace=True)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200, required=False, default="استفسار عام / General Signal", trim_whitespace=True)
    message = serializers.CharField(min_length=5, max_length=5000, trim_whitespace=True)

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("الاسم يجب أن يحتوي على حرفين على الأقل.")
        return cleaned

    def validate_message(self, value):
        cleaned = value.strip()
        if len(cleaned) < 5:
            raise serializers.ValidationError("نص الرسالة قصير جداً.")
        return cleaned


class VisitorLogSerializer(serializers.ModelSerializer):
    device_id = serializers.CharField(max_length=120, required=False, allow_blank=True)
    language = serializers.CharField(max_length=10, required=False, default='en')
    screen_resolution = serializers.CharField(max_length=50, required=False, allow_blank=True)
    referrer = serializers.CharField(max_length=500, required=False, allow_blank=True, allow_null=True)
    path_visited = serializers.CharField(max_length=200, required=False, default='/')

    class Meta:
        model = VisitorLog
        fields = [
            'id', 'device_id', 'language', 'screen_resolution',
            'referrer', 'path_visited', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class SkillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillItem
        fields = ['id', 'name', 'level', 'desc_ar', 'desc_en', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillItemSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'category_id', 'name_ar', 'name_en', 'order', 'skills']


class ProjectItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectItem
        fields = '__all__'


class ExperienceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceItem
        fields = '__all__'


class HeroProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroProfile
        fields = '__all__'


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'
