from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from portfolio_app.models import (
    HeroProfile,
    SkillCategory,
    SkillItem,
    ProjectItem,
    ExperienceItem,
    ContactMessage,
    SiteSettings,
    VisitorLog
)

class PortfolioAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Seed minimal test data
        self.hero = HeroProfile.objects.create(
            name_ar="يوسف طارق",
            name_en="Yousif Tariq",
            role_ar="مهندس أنظمة",
            role_en="Systems Engineer",
            is_active=True
        )

        self.category = SkillCategory.objects.create(
            category_id="systems",
            name_ar="هندسة النظم",
            name_en="Systems Engineering",
            order=1
        )

        self.skill = SkillItem.objects.create(
            category=self.category,
            name="C++",
            level=95,
            desc_ar="وصف المهارة",
            desc_en="Skill description",
            order=1
        )

        self.project = ProjectItem.objects.create(
            title="Nexus Engine",
            category="Distributed Systems",
            desc_ar="محرك نظم موزعة",
            desc_en="Distributed engine",
            tags="C++, Rust",
            features_ar="ميزة 1\nميزة 2",
            features_en="Feature 1\nFeature 2",
            order=1
        )

        self.experience = ExperienceItem.objects.create(
            role_ar="كبير مهندسي النظم",
            role_en="Lead Systems Architect",
            company="Tech Corp",
            period_ar="2024 - الآن",
            period_en="2024 - Present",
            desc_ar="بناء وتطوير الأنظمة",
            desc_en="Building systems",
            skills="C++, Kubernetes",
            order=1
        )

        self.settings = SiteSettings.objects.create(
            title="إعدادات الموقع",
            email="yousif.tariq@engineer.dev"
        )

    def test_get_portfolio_data_success(self):
        """Test fetching full bilingual portfolio data."""
        url = reverse('portfolio-data')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('ar', response.data)
        self.assertIn('en', response.data)

        # Validate Arabic structure
        ar = response.data['ar']
        self.assertEqual(ar['hero']['name'], "يوسف طارق")
        self.assertEqual(len(ar['skills']['categories']), 1)
        self.assertEqual(ar['skills']['categories'][0]['skills'][0]['name'], "C++")
        self.assertEqual(len(ar['projects']['items']), 1)
        self.assertEqual(len(ar['experience']['timeline']), 1)

        # Validate English structure
        en = response.data['en']
        self.assertEqual(en['hero']['name'], "Yousif Tariq")

    def test_dispatch_contact_message_valid(self):
        """Test submitting valid contact message."""
        url = reverse('contact-dispatch')
        payload = {
            "name": "سارة الأحمد",
            "email": "sara@example.com",
            "subject": "مشروع استشاري",
            "message": "نود مناقشة مشروع معمارية سحابية متقدم."
        }
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertTrue(ContactMessage.objects.filter(email="sara@example.com").exists())

    def test_dispatch_contact_message_invalid_email(self):
        """Test submitting invalid email format returns 400."""
        url = reverse('contact-dispatch')
        payload = {
            "name": "سارة",
            "email": "not-an-email",
            "message": "رسالة اختبارية قصيرة ولكنها صالحة."
        }
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('details', response.data)

    def test_dispatch_contact_message_missing_fields(self):
        """Test submitting with empty name and message returns 400."""
        url = reverse('contact-dispatch')
        payload = {
            "name": "",
            "email": "test@domain.com",
            "message": ""
        }
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_track_visit_endpoint(self):
        """Test recording visitor device fingerprint and precise geolocation."""
        url = reverse('track-visit')
        payload = {
            "device_id": "test-dev-123456",
            "language": "ar",
            "timezone": "Asia/Riyadh",
            "screen_resolution": "1920x1080",
            "referrer": "https://google.com",
            "path_visited": "/"
        }
        response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertIn('location', response.data)
        
        log = VisitorLog.objects.filter(device_id="test-dev-123456").first()
        self.assertIsNotNone(log)
        self.assertIsNotNone(log.country)
        self.assertIsNotNone(log.city)

    def test_get_analytics_stats_masked_ip(self):
        """Test that public analytics stats mask IP addresses for privacy."""
        VisitorLog.objects.create(
            ip_address="192.168.1.55",
            device_id="dev-mask-test",
            device_type="Desktop",
            os="Windows",
            browser="Chrome",
            language="en"
        )

        url = reverse('analytics-stats')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_hits', response.data)
        self.assertIn('recent_visits', response.data)

        # Check IP masking for non-staff
        if len(response.data['recent_visits']) > 0:
            ip = response.data['recent_visits'][0]['ip_address']
            self.assertTrue(ip is None or '***' in ip or ip == 'anon-ip')
