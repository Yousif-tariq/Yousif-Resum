from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import (
    HeroProfile,
    SkillCategory,
    SkillItem,
    ProjectItem,
    ExperienceItem,
    ContactMessage,
    SiteSettings
)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_portfolio_data(request):
    """
    Returns full bilingual dynamic portfolio data structured for React frontend.
    """
    profile = HeroProfile.objects.filter(is_active=True).first()
    settings = SiteSettings.objects.first()
    categories = SkillCategory.objects.prefetch_related('skills').all()
    projects = ProjectItem.objects.all()
    experiences = ExperienceItem.objects.all()

    # Build Arabic Data
    ar_data = {
        "hero": {
            "badge": profile.badge_ar if profile else "مهندس أنظمة وبرمجيات • Systems & Software Engineer",
            "name": profile.name_ar if profile else "يوسف طارق",
            "role": profile.role_ar if profile else "مهندس أنظمة وبرمجيات متقدمة",
            "tagline": "تصميم وبناء المعماريات الموزعة، الأنظمة فائقة الأداء، والبرمجيات السحابية الحديثة",
            "bio": profile.bio_ar if profile else "مهندس برمجيات ونظم شغوف بهندسة البنى التحتية المتينة وتطوير حلول برمجية متكاملة تمزج بين الأداء الخارق وجمال التجربة الرقمية.",
            "ctaPrimary": profile.cta_primary_ar if profile else "ابدأ الغوص في المعمارية",
            "ctaSecondary": profile.cta_secondary_ar if profile else "إرسال إشارة اتصال",
            "primaryPhoto": request.build_absolute_uri(profile.primary_photo.url) if profile and profile.primary_photo else None,
            "alterEgoPhoto": request.build_absolute_uri(profile.alter_ego_photo.url) if profile and profile.alter_ego_photo else None,
            "stats": [
                {"label": profile.stat_1_lbl_ar if profile else "سنوات الخبرة في الهندسة", "value": profile.stat_1_val if profile else "+5"},
                {"label": profile.stat_2_lbl_ar if profile else "أنظمة ومشاريع منجزة", "value": profile.stat_2_val if profile else "+28"},
                {"label": profile.stat_3_lbl_ar if profile else "كفاءة وزمن استجابة أقل من", "value": profile.stat_3_val if profile else "< 5ms"},
                {"label": profile.stat_4_lbl_ar if profile else "جاهزية واستقرار النظم", "value": profile.stat_4_val if profile else "99.9%"}
            ]
        },
        "skills": {
            "title": "مصفوفة التقنيات وهندسة النظم",
            "subtitle": "بناء الحلول من طبقات النظام الأساسية وحتى قمة السحابة",
            "categories": [
                {
                    "id": cat.category_id,
                    "name": cat.name_ar,
                    "skills": [
                        {
                            "name": s.name,
                            "level": s.level,
                            "desc": s.desc_ar
                        } for s in cat.skills.all()
                    ]
                } for cat in categories
            ]
        },
        "projects": {
            "title": "معرض الأنظمة والمشاريع البارزة",
            "subtitle": "استكشف نماذج حقيقية من الأنظمة البرمجية والمعمارية المتطورة",
            "items": [
                {
                    "id": str(p.id),
                    "title": p.title,
                    "category": p.category,
                    "desc": p.desc_ar,
                    "tags": [t.strip() for t in p.tags.split(',') if t.strip()],
                    "stats": {
                        "throughput": p.stat_throughput,
                        "latency": p.stat_latency,
                        "availability": p.stat_availability
                    },
                    "features": [f.strip() for f in p.features_ar.split('\n') if f.strip()],
                    "demoUrl": p.demo_url,
                    "githubUrl": p.github_url
                } for p in projects
            ]
        },
        "experience": {
            "title": "مسار الخبرة والقيادة الهندسية",
            "subtitle": "محطات التميز في بناء وتطوير الأنظمة المعقدة",
            "timeline": [
                {
                    "period": exp.period_ar,
                    "role": exp.role_ar,
                    "company": exp.company,
                    "desc": exp.desc_ar,
                    "skills": [s.strip() for s in exp.skills.split(',') if s.strip()]
                } for exp in experiences
            ]
        },
        "contact": {
            "title": "مركز إرسال الإشارة والتواصل",
            "subtitle": "جاهز دائماً لمناقشة المشاريع الهندسية، الاستشارات التقنية، والفرص الواعدة",
            "terminalTitle": settings.terminal_title if settings else "yousif@quantum-core:~$ connect --secure",
            "formName": "الاسم الكريم",
            "formEmail": "البريد الإلكتروني",
            "formSubject": "موضوع الرسالة",
            "formMessage": "نص الرسالة أو تفاصيل المشروع",
            "submitBtn": "إرسال الإشارة الفورية ⚡",
            "sending": "جاري تشفير وإرسال الإشارة...",
            "success": "تم استلام رسالتك وتوصيلها بنجاح إلى مركز القيادة! سأتواصل معك قريباً.",
            "email": settings.email if settings else "yousif.tariq@engineer.dev",
            "location": settings.location_ar if settings else "الرياض • متاح للعمل عن بعد وحول العالم",
            "status": settings.status_ar if settings else "متاح حالياً للمشاريع والتحديات الهندسية المتقدمة 🟢"
        }
    }

    # Build English Data
    en_data = {
        "hero": {
            "badge": profile.badge_en if profile else "Systems & Software Engineer",
            "name": profile.name_en if profile else "Yousif Tariq",
            "role": profile.role_en if profile else "Lead Systems & Software Engineer",
            "tagline": "Architecting High-Performance Distributed Systems & Scalable Software",
            "bio": profile.bio_en if profile else "A passionate systems & software engineer dedicated to building resilient distributed infrastructures and scalable software solutions.",
            "ctaPrimary": profile.cta_primary_en if profile else "Explore Architecture Dive",
            "ctaSecondary": profile.cta_secondary_en if profile else "Transmit Signal",
            "primaryPhoto": request.build_absolute_uri(profile.primary_photo.url) if profile and profile.primary_photo else None,
            "alterEgoPhoto": request.build_absolute_uri(profile.alter_ego_photo.url) if profile and profile.alter_ego_photo else None,
            "stats": [
                {"label": profile.stat_1_lbl_en if profile else "Years Engineering Experience", "value": profile.stat_1_val if profile else "+5"},
                {"label": profile.stat_2_lbl_en if profile else "Production Systems Built", "value": profile.stat_2_val if profile else "+28"},
                {"label": profile.stat_3_lbl_en if profile else "Core Latency Target", "value": profile.stat_3_val if profile else "< 5ms"},
                {"label": profile.stat_4_lbl_en if profile else "System Availability", "value": profile.stat_4_val if profile else "99.9%"}
            ]
        },
        "skills": {
            "title": "Core Technology & Systems Matrix",
            "subtitle": "Engineering solutions from bare-metal kernel layers to the cloud summit",
            "categories": [
                {
                    "id": cat.category_id,
                    "name": cat.name_en,
                    "skills": [
                        {
                            "name": s.name,
                            "level": s.level,
                            "desc": s.desc_en or s.desc_ar
                        } for s in cat.skills.all()
                    ]
                } for cat in categories
            ]
        },
        "projects": {
            "title": "Featured Systems & Multiverse",
            "subtitle": "Explore high-impact production systems and engineering milestones",
            "items": [
                {
                    "id": str(p.id),
                    "title": p.title,
                    "category": p.category,
                    "desc": p.desc_en or p.desc_ar,
                    "tags": [t.strip() for t in p.tags.split(',') if t.strip()],
                    "stats": {
                        "throughput": p.stat_throughput,
                        "latency": p.stat_latency,
                        "availability": p.stat_availability
                    },
                    "features": [f.strip() for f in p.features_en.split('\n') if f.strip()] or [f.strip() for f in p.features_ar.split('\n') if f.strip()],
                    "demoUrl": p.demo_url,
                    "githubUrl": p.github_url
                } for p in projects
            ]
        },
        "experience": {
            "title": "Engineering Journey & Milestones",
            "subtitle": "Proven track record of architecting and shipping mission-critical software",
            "timeline": [
                {
                    "period": exp.period_en,
                    "role": exp.role_en,
                    "company": exp.company,
                    "desc": exp.desc_en or exp.desc_ar,
                    "skills": [s.strip() for s in exp.skills.split(',') if s.strip()]
                } for exp in experiences
            ]
        },
        "contact": {
            "title": "Signal Nexus & Transmission Center",
            "subtitle": "Open for high-impact engineering collaborations, architectural consulting, and visionary endeavors",
            "terminalTitle": settings.terminal_title if settings else "yousif@quantum-core:~$ connect --secure",
            "formName": "Your Full Name",
            "formEmail": "Your Email Address",
            "formSubject": "Transmission Subject",
            "formMessage": "Message / Project Architecture Details",
            "submitBtn": "Transmit Secure Signal ⚡",
            "sending": "Encrypting and dispatching signal...",
            "success": "Signal dispatched and safely received at core command! I will reply shortly.",
            "email": settings.email if settings else "yousif.tariq@engineer.dev",
            "location": settings.location_en if settings else "Riyadh • Available for Global & Remote Challenges",
            "status": settings.status_en if settings else "Currently Available for Advanced Systems & Architecture Roles 🟢"
        }
    }

    return Response({"ar": ar_data, "en": en_data})


@api_view(['POST'])
@permission_classes([AllowAny])
def dispatch_contact_message(request):
    """
    Receives contact form submissions and saves them into Django Admin.
    """
    data = request.data
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject', 'General Signal')
    message = data.get('message')

    if not name or not email or not message:
        return Response(
            {"error": "جميع الحقول المطلوبة (الاسم، البريد، الرسالة) يجب تعبئتها"},
            status=status.HTTP_400_BAD_REQUEST
        )

    msg_obj = ContactMessage.objects.create(
        name=name,
        email=email,
        subject=subject,
        message=message
    )

    return Response({
        "success": True,
        "message": "تم استلام رسالتك بنجاح وتسجيلها في قاعدة بيانات الإدارة (Django Admin)",
        "id": msg_obj.id
    }, status=status.HTTP_201_CREATED)
