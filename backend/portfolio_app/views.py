from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.response import Response
from rest_framework import status
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
from .serializers import (
    ContactMessageSerializer,
    VisitorLogSerializer
)

class ContactRateThrottle(AnonRateThrottle):
    rate = '10/minute'

class VisitTrackingThrottle(AnonRateThrottle):
    rate = '180/minute'


@api_view(['GET'])
@permission_classes([AllowAny])
def get_portfolio_data(request):
    """
    Returns full bilingual dynamic portfolio data structured for React frontend.
    """
    profile = HeroProfile.objects.filter(is_active=True).first() or HeroProfile.objects.first()
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
@throttle_classes([ContactRateThrottle])
def dispatch_contact_message(request):
    """
    Receives contact form submissions, validates data through DRF Serializer,
    and saves them safely into Django Admin.
    """
    serializer = ContactMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(
            {"error": "بيانات غير صالحة", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    msg_obj = serializer.save()

    return Response({
        "success": True,
        "message": "تم استلام رسالتك بنجاح وتسجيلها في قاعدة بيانات الإدارة (Django Admin)",
        "id": msg_obj.id
    }, status=status.HTTP_201_CREATED)


import urllib.request
import json
import socket

# In-memory GeoIP Cache to prevent repeated external network lookups
GEO_IP_CACHE = {}

def is_private_ip(ip):
    if not ip or ip in ('127.0.0.1', '::1', 'localhost', 'Unknown'):
        return True
    try:
        if ip.startswith('10.') or ip.startswith('192.168.') or ip.startswith('172.'):
            return True
    except Exception:
        pass
    return False


def resolve_ip_location(ip_address, request, client_data=None):
    """
    Accurately resolves geographical location (Country, Region, City, Coordinates, Timezone, ISP)
    from Cloudflare/Vercel edge headers, browser client data, and IP Geolocation API.
    """
    client_data = client_data or {}

    # 1. Check Cloud Edge Headers (Cloudflare, Vercel, CloudFront)
    country = (
        request.META.get('HTTP_CF_IPCOUNTRY')
        or request.META.get('HTTP_X_VERCEL_IP_COUNTRY')
        or request.META.get('HTTP_CLOUDFRONT_VIEWER_COUNTRY')
        or ''
    ).strip()

    country_code = country[:10] if country else ''
    city = (
        request.META.get('HTTP_CF_IPCITY')
        or request.META.get('HTTP_X_VERCEL_IP_CITY')
        or ''
    ).strip()

    region = (
        request.META.get('HTTP_CF_REGION')
        or request.META.get('HTTP_X_VERCEL_IP_COUNTRY_REGION')
        or ''
    ).strip()

    timezone = (
        request.META.get('HTTP_CF_TIMEZONE')
        or request.META.get('HTTP_X_VERCEL_IP_TIMEZONE')
        or client_data.get('timezone')
        or ''
    ).strip()

    latitude = None
    longitude = None

    lat_hdr = request.META.get('HTTP_CF_IPLATITUDE') or request.META.get('HTTP_X_VERCEL_IP_LATITUDE') or client_data.get('latitude')
    lon_hdr = request.META.get('HTTP_CF_IPLONGITUDE') or request.META.get('HTTP_X_VERCEL_IP_LONGITUDE') or client_data.get('longitude')

    try:
        if lat_hdr:
            latitude = float(lat_hdr)
        if lon_hdr:
            longitude = float(lon_hdr)
    except (ValueError, TypeError):
        pass

    isp = request.META.get('HTTP_CF_RAY', '')
    if isp:
        isp = f"Cloudflare ({request.META.get('HTTP_CF_IPCOUNTRY', 'Edge')})"

    # 2. If already resolved by Edge headers, return immediately
    if country and city and latitude is not None and longitude is not None:
        return {
            "country": country,
            "country_code": country_code,
            "region": region,
            "city": city,
            "latitude": latitude,
            "longitude": longitude,
            "timezone": timezone,
            "isp": isp or "Cloud Edge Network"
        }

    # 3. Check Localhost / Private IP
    if is_private_ip(ip_address):
        return {
            "country": "المملكة العربية السعودية (تطوير محلي)",
            "country_code": "SA",
            "region": "منطقة الرياض",
            "city": "الرياض",
            "latitude": 24.7136,
            "longitude": 46.6753,
            "timezone": timezone or "Asia/Riyadh",
            "isp": "Localhost Development Core"
        }

    # 4. Check In-Memory Cache for Public IP
    if ip_address in GEO_IP_CACHE:
        cached = GEO_IP_CACHE[ip_address]
        return {
            "country": country or cached.get("country"),
            "country_code": country_code or cached.get("country_code"),
            "region": region or cached.get("region"),
            "city": city or cached.get("city"),
            "latitude": latitude if latitude is not None else cached.get("latitude"),
            "longitude": longitude if longitude is not None else cached.get("longitude"),
            "timezone": timezone or cached.get("timezone"),
            "isp": isp or cached.get("isp")
        }

    # 5. Fallback to Fast IP Geolocation Lookup API
    try:
        api_url = f"http://ip-api.com/json/{ip_address}?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,org"
        req = urllib.request.Request(
            api_url,
            headers={'User-Agent': 'Quantum-Core-Portfolio/2.6'}
        )
        with urllib.request.urlopen(req, timeout=1.8) as resp:
            if resp.status == 200:
                geo_data = json.loads(resp.read().decode('utf-8'))
                if geo_data.get('status') == 'success':
                    result = {
                        "country": geo_data.get('country') or country or 'Unknown',
                        "country_code": geo_data.get('countryCode') or country_code or '',
                        "region": geo_data.get('regionName') or region or '',
                        "city": geo_data.get('city') or city or '',
                        "latitude": float(geo_data.get('lat')) if geo_data.get('lat') is not None else latitude,
                        "longitude": float(geo_data.get('lon')) if geo_data.get('lon') is not None else longitude,
                        "timezone": geo_data.get('timezone') or timezone or '',
                        "isp": geo_data.get('isp') or geo_data.get('org') or isp or ''
                    }
                    GEO_IP_CACHE[ip_address] = result
                    return result
    except Exception:
        pass

    # Safe default fallback
    return {
        "country": country or "Unknown",
        "country_code": country_code or "",
        "region": region or "",
        "city": city or "",
        "latitude": latitude,
        "longitude": longitude,
        "timezone": timezone,
        "isp": isp or "Direct ISP"
    }


def get_client_ip(request):
    """
    Extracts the client's real public IP address from standard and cloud proxy headers.
    """
    cf_ip = request.META.get('HTTP_CF_CONNECTING_IP')
    if cf_ip:
        return cf_ip.strip()

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()

    return request.META.get('REMOTE_ADDR', '')


def mask_ip(ip_str):
    """
    Anonymizes IP address for public analytics privacy.
    """
    if not ip_str:
        return None
    parts = ip_str.split('.')
    if len(parts) == 4:
        return f"{parts[0]}.{parts[1]}.***.***"
    return "anon-ip"


def parse_device_info(ua_string):
    """
    Parses user-agent string into categorized Device Type, OS, and Browser.
    """
    ua = (ua_string or '').lower()
    
    # 1. Device Type
    device_type = "Desktop"
    if 'tablet' in ua or 'ipad' in ua or ('android' in ua and 'mobile' not in ua):
        device_type = "Tablet"
    elif 'mobile' in ua or 'iphone' in ua or 'ipod' in ua or 'android' in ua:
        device_type = "Mobile"

    # 2. Operating System
    os_name = "Other"
    if 'windows' in ua:
        os_name = "Windows"
    elif 'iphone' in ua or 'ipad' in ua or 'ipod' in ua:
        os_name = "iOS"
    elif 'macintosh' in ua or 'mac os' in ua:
        os_name = "macOS"
    elif 'android' in ua:
        os_name = "Android"
    elif 'linux' in ua:
        os_name = "Linux"

    # 3. Browser
    browser_name = "Other"
    if 'edg/' in ua or 'edge' in ua:
        browser_name = "Microsoft Edge"
    elif 'chrome' in ua and 'safari' in ua and 'crios' not in ua and 'edg' not in ua:
        browser_name = "Chrome"
    elif 'crios' in ua:
        browser_name = "Chrome (iOS)"
    elif 'fxios' in ua or 'firefox' in ua:
        browser_name = "Firefox"
    elif 'safari' in ua and 'chrome' not in ua:
        browser_name = "Safari"
    elif 'opera' in ua or 'opr/' in ua:
        browser_name = "Opera"

    return device_type, os_name, browser_name


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([VisitTrackingThrottle])
def track_visit(request):
    """
    Endpoint to asynchronously log visitor traffic, device fingerprints, and client metadata
    with precise geographical location and coordinates.
    """
    data = request.data or {}
    device_id = str(data.get('device_id', '')).strip()
    if not device_id:
        device_id = f"anon-{request.session.session_key or 'guest'}"

    user_agent = request.META.get('HTTP_USER_AGENT', '')
    ip_address = get_client_ip(request)
    device_type, os_name, browser_name = parse_device_info(user_agent)

    # Resolve precise geolocation
    geo = resolve_ip_location(ip_address, request, data)

    log = VisitorLog.objects.create(
        ip_address=ip_address or None,
        device_id=device_id[:120],
        user_agent=user_agent,
        device_type=device_type,
        browser=browser_name,
        os=os_name,
        language=str(data.get('language', 'en'))[:10],
        screen_resolution=str(data.get('screen_resolution', ''))[:50],
        referrer=str(data.get('referrer', ''))[:500] if data.get('referrer') else None,
        path_visited=str(data.get('path_visited', '/'))[:200],
        country=geo.get('country')[:100] if geo.get('country') else None,
        country_code=geo.get('country_code')[:10] if geo.get('country_code') else None,
        region=geo.get('region')[:100] if geo.get('region') else None,
        city=geo.get('city')[:100] if geo.get('city') else None,
        latitude=geo.get('latitude'),
        longitude=geo.get('longitude'),
        timezone=geo.get('timezone')[:60] if geo.get('timezone') else None,
        isp=geo.get('isp')[:150] if geo.get('isp') else None
    )

    return Response({
        "success": True,
        "status": "visit_recorded",
        "log_id": log.id,
        "device_type": device_type,
        "os": os_name,
        "browser": browser_name,
        "location": {
            "city": log.city,
            "region": log.region,
            "country": log.country,
            "country_code": log.country_code,
            "latitude": log.latitude,
            "longitude": log.longitude,
            "timezone": log.timezone,
            "isp": log.isp
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_analytics_stats(request):
    """
    Returns aggregated analytics summary for visitor traffic with privacy protection.
    """
    from django.db.models import Count

    total_hits = VisitorLog.objects.count()
    unique_devices = VisitorLog.objects.values('device_id').distinct().count()

    device_counts = dict(VisitorLog.objects.values('device_type').annotate(count=Count('id')).values_list('device_type', 'count'))
    os_counts = dict(VisitorLog.objects.values('os').annotate(count=Count('id')).values_list('os', 'count'))
    browser_counts = dict(VisitorLog.objects.values('browser').annotate(count=Count('id')).values_list('browser', 'count'))
    language_counts = dict(VisitorLog.objects.values('language').annotate(count=Count('id')).values_list('language', 'count'))
    country_counts = dict(VisitorLog.objects.exclude(country__isnull=True).values('country').annotate(count=Count('id')).order_by('-count')[:8].values_list('country', 'count'))
    city_counts = dict(VisitorLog.objects.exclude(city__isnull=True).values('city').annotate(count=Count('id')).order_by('-count')[:8].values_list('city', 'count'))

    # Anonymize IP in public recent visit logs
    recent_logs = list(VisitorLog.objects.order_by('-created_at')[:10].values(
        'id', 'device_type', 'os', 'browser', 'language', 'screen_resolution',
        'ip_address', 'country', 'country_code', 'region', 'city', 'latitude', 'longitude', 'isp', 'created_at'
    ))

    # Mask IPs unless the user is an authenticated staff member
    if not (request.user and request.user.is_authenticated and request.user.is_staff):
        for entry in recent_logs:
            entry['ip_address'] = mask_ip(entry.get('ip_address'))

    return Response({
        "total_hits": total_hits,
        "unique_devices": unique_devices,
        "device_breakdown": device_counts,
        "os_breakdown": os_counts,
        "browser_breakdown": browser_counts,
        "language_breakdown": language_counts,
        "country_breakdown": country_counts,
        "city_breakdown": city_counts,
        "recent_visits": recent_logs
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root_status(request):
    """
    Root landing response with system status and direct navigation links.
    """
    return Response({
        "status": "online",
        "system": "Yousif Tariq Portfolio API Core // v2.6",
        "endpoints": {
            "admin_panel": request.build_absolute_uri('/admin/'),
            "portfolio_data": request.build_absolute_uri('/api/portfolio-data/'),
            "contact_dispatch": request.build_absolute_uri('/api/contact/'),
            "track_visit": request.build_absolute_uri('/api/track-visit/'),
            "analytics_stats": request.build_absolute_uri('/api/analytics-stats/')
        }
    })

