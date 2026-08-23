import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from portfolio_app.models import (
    HeroProfile,
    SkillCategory,
    SkillItem,
    ProjectItem,
    ExperienceItem,
    SiteSettings
)

User = get_user_model()

def seed():
    # 1. Create Superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("[OK] Superuser created: admin / admin123")

    # 2. Hero Profile
    if not HeroProfile.objects.exists():
        HeroProfile.objects.create(
            name_ar="يوسف طارق",
            name_en="Yousif Tariq",
            role_ar="مهندس أنظمة وبرمجيات متقدمة",
            role_en="Lead Systems & Software Engineer",
            badge_ar="مهندس أنظمة وبرمجيات • Systems & Software Engineer",
            badge_en="Systems & Software Engineer",
            bio_ar="مهندس برمجيات ونظم شغوف بهندسة البنى التحتية المتينة وتطوير حلول برمجية متكاملة تمزج بين الأداء الخارق وجمال التجربة الرقمية.",
            bio_en="A passionate systems & software engineer dedicated to building resilient distributed infrastructures and scalable software solutions.",
            cta_primary_ar="ابدأ الغوص في المعمارية",
            cta_primary_en="Explore Architecture Dive",
            cta_secondary_ar="إرسال إشارة اتصال",
            cta_secondary_en="Transmit Signal",
            stat_1_val="+5",
            stat_1_lbl_ar="سنوات الخبرة في الهندسة",
            stat_1_lbl_en="Years Engineering Experience",
            stat_2_val="+28",
            stat_2_lbl_ar="أنظمة ومشاريع منجزة",
            stat_2_lbl_en="Production Systems Built",
            stat_3_val="< 5ms",
            stat_3_lbl_ar="كفاءة وزمن استجابة أقل من",
            stat_3_lbl_en="Core Latency Target",
            stat_4_val="99.9%",
            stat_4_lbl_ar="جاهزية واستقرار النظم",
            stat_4_lbl_en="System Availability",
            is_active=True
        )
        print("[OK] Hero Profile created")

    # 3. Site Settings
    if not SiteSettings.objects.exists():
        SiteSettings.objects.create(
            title="إعدادات المنظومة والموقع",
            email="yousif.tariq@engineer.dev",
            location_ar="الرياض • متاح للعمل عن بعد وحول العالم",
            location_en="Riyadh • Available for Global & Remote Challenges",
            status_ar="متاح حالياً للمشاريع والتحديات الهندسية المتقدمة 🟢",
            status_en="Currently Available for Advanced Systems & Architecture Roles 🟢",
            terminal_title="yousif@quantum-core:~$ connect --secure"
        )
        print("[OK] Site Settings created")

    # 4. Skill Categories & Items
    categories_data = [
        {
            "id": "systems",
            "name_ar": "هندسة النظم والأداء (Low-Level & OS)",
            "name_en": "Low-Level & OS Engineering",
            "order": 1,
            "skills": [
                {"name": "C / C++ (Modern 17/20)", "level": 92, "desc_ar": "إدارة الذاكرة المتقدمة، البرمجة متعددة الخيوط (Multithreading)", "desc_en": "Manual memory safety, high-throughput multithreading"},
                {"name": "Rust & Memory Safety", "level": 88, "desc_ar": "بناء خدمات أنظمة فائقة السرعة والأمان التزامني", "desc_en": "Building concurrent, memory-safe system daemons"},
                {"name": "Linux Internals & POSIX", "level": 90, "desc_ar": "تحسين أداء النواة، مقابس الشبكة، Shell Scripting", "desc_en": "Kernel tuning, raw sockets, IPC, and system call optimization"},
                {"name": "System Architecture & Algorithms", "level": 95, "desc_ar": "تصميم المعماريات المعقدة وتحليل الخوارزميات وتراكيب البيانات", "desc_en": "Large-scale system design and data structures"}
            ]
        },
        {
            "id": "distributed",
            "name_ar": "النظم الموزعة والسحابة (Distributed & Cloud)",
            "name_en": "Distributed Systems & Cloud",
            "order": 2,
            "skills": [
                {"name": "Docker & Kubernetes (K8s)", "level": 90, "desc_ar": "تنسيق الحاويات، النشر التلقائي، والإدارة السحابية", "desc_en": "Container orchestration, automated deployments & cloud-native infra"},
                {"name": "Microservices & gRPC / Kafka", "level": 87, "desc_ar": "معالجة الرسائل اللحظية وأنظمة الاتصال منخفضة التأخير", "desc_en": "Real-time event streaming and sub-millisecond RPC communication"},
                {"name": "Cloud Platforms (AWS / GCP)", "level": 85, "desc_ar": "Serverless، بنى التخزين، وشبكات توزيع المحتوى", "desc_en": "Serverless architectures, VPC networking & global CDN backbones"},
                {"name": "CI/CD & DevOps (GitHub Actions)", "level": 92, "desc_ar": "أتمتة الاختبارات والنشر المستمر للبنى التحتية كشيفرة", "desc_en": "Infrastructure as Code (Terraform), continuous integration pipelines"}
            ]
        },
        {
            "id": "software",
            "name_ar": "تطوير البرمجيات والتطبيقات (Backend & Fullstack)",
            "name_en": "Software & Backend Architecture",
            "order": 3,
            "skills": [
                {"name": "Python (FastAPI / Django / AsyncIO)", "level": 94, "desc_ar": "تطوير واجهات RESTful و WebSockets عالية الكفاءة", "desc_en": "High-throughput asynchronous RESTful & WebSocket backends"},
                {"name": "Node.js / TypeScript", "level": 90, "desc_ar": "بناء خوادم برمجية سريعة وقابلة للتوسع اللحظي", "desc_en": "Event-driven runtime servers with real-time scalability"},
                {"name": "React & Modern Web Ecosystem", "level": 88, "desc_ar": "بناء واجهات تفاعلية ثلاثية الأبعاد ذات استجابة فورية", "desc_en": "High-performance reactive user interfaces and dashboards"},
                {"name": "Three.js & WebGL Visuals", "level": 85, "desc_ar": "تطوير التجارب البصرية الغامرة والرسوم التفاعلية", "desc_en": "Immersive 3D interactive graphics, shaders and depth mapping"}
            ]
        },
        {
            "id": "data",
            "name_ar": "قواعد البيانات والأمان (Databases & Security)",
            "name_en": "Databases & Security Architecture",
            "order": 4,
            "skills": [
                {"name": "PostgreSQL & Complex SQL", "level": 92, "desc_ar": "فهرسة متقدمة، استعلامات معقدة، وضبط الأداء", "desc_en": "Advanced indexing, query execution planning, and sharding"},
                {"name": "Redis & In-Memory Caching", "level": 94, "desc_ar": "التخزين المؤقت فائق السرعة، Distributed Locks", "desc_en": "Ultra-fast distributed caching, pub/sub, and distributed locking"},
                {"name": "MongoDB & NoSQL Engines", "level": 86, "desc_ar": "نماذج الوثائق وتخزين البيانات غير المهيكلة", "desc_en": "Flexible schema design, aggregation pipelines, and replication"},
                {"name": "Security & Zero-Trust Architecture", "level": 89, "desc_ar": "التشفير، JWT، OAuth2، وتأمين نقاط النهاية", "desc_en": "End-to-end encryption, OAuth2, JWT, and API hardening"}
            ]
        }
    ]

    for cdata in categories_data:
        cat_obj, _ = SkillCategory.objects.get_or_create(
            category_id=cdata["id"],
            defaults={
                "name_ar": cdata["name_ar"],
                "name_en": cdata["name_en"],
                "order": cdata["order"]
            }
        )
        for sidx, sdata in enumerate(cdata["skills"]):
            SkillItem.objects.get_or_create(
                category=cat_obj,
                name=sdata["name"],
                defaults={
                    "level": sdata["level"],
                    "desc_ar": sdata["desc_ar"],
                    "desc_en": sdata["desc_en"],
                    "order": sidx + 1
                }
            )
    print("[OK] Skill Categories and Items seeded")

    # 5. Projects
    projects_data = [
        {
            "title": "Nexus Distributed Consensus Engine",
            "category": "Distributed Systems",
            "desc_ar": "محرك نظم موزعة مبني بلغة C++ و Rust يطبق خوارزمية التوافق Raft لمعالجة المعاملات المالية الحساسة بأزمنة تأخير تقل عن 2 ميلي ثانية.",
            "desc_en": "A high-speed distributed state machine engine written in C++ and Rust implementing the Raft consensus protocol for zero-data-loss transactions.",
            "stat_throughput": "1.2M ops/sec",
            "stat_latency": "< 1.8ms",
            "stat_availability": "99.999%",
            "tags": "C++20, Rust, Raft Consensus, gRPC, Distributed KV",
            "features_ar": "تكرار الحالة الموزعة (State Machine Replication)\nانتخاب القائد التلقائي وفشل العقد الآمن\nاختبارات التنافسية وضغط عالي",
            "features_en": "Replicated log state machine with deterministic replay\nAutomatic leader election and graceful partitioned recovery\nRigorous fault injection tests",
            "order": 1
        },
        {
            "title": "Aegis Real-Time Telemetry & APM",
            "category": "Cloud & Observability",
            "desc_ar": "منصة مراقبة سحابية هجينة تجمع مقاييس الأداء والسجلات من آلاف الحاويات لحظياً وتوفر تنبيهات ذكية باستخدام الذكاء الاصطناعي.",
            "desc_en": "Enterprise hybrid telemetry platform collecting real-time container metrics and distributed traces with AI-powered root-cause analysis.",
            "stat_throughput": "500GB/Day",
            "stat_latency": "Instant",
            "stat_availability": "365 Days",
            "tags": "Python, FastAPI, Go, Kafka, ClickHouse, React",
            "features_ar": "محرك تدفق بيانات باستخدام Apache Kafka\nتخزين تحليلي فائق الكفاءة باستخدام ClickHouse\nواجهة بصرية ثلاثية الأبعاد لتشخيص الأعطال",
            "features_en": "High-volume event ingestion stream backed by Kafka\nColumnar OLAP query optimization with ClickHouse\nInteractive 3D dependency graph visualizer",
            "order": 2
        },
        {
            "title": "MicroNet Hypervisor & Network Stack",
            "category": "Low-Level & OS",
            "desc_ar": "طبقة محاكاة خفيفة ونواة شبكية مخصصة لمعالجة الحزم الشبكية على مستوى العتاد بدون الاعتماد على مقابس النواة التقليدية (Kernel Bypass).",
            "desc_en": "Lightweight userspace packet processor and hypervisor kernel bypass utilizing raw hardware queues for wire-rate networking.",
            "stat_throughput": "10 Gbps Line Rate",
            "stat_latency": "0.00% Loss",
            "stat_availability": "< 16MB RAM",
            "tags": "C, DPDK, x86_64 Assembly, eBPF, Linux Kernel",
            "features_ar": "معالجة حزم الشبكة بتقنية Zero-Copy\nحقن مراقبة الحزم بواسطة eBPF\nاستهلاك ذاكرة متناهي الصغر",
            "features_en": "Zero-copy DMA hardware packet processing\neBPF tracepoint instrumentation hooks\nMicro-footprint memory overhead",
            "order": 3
        },
        {
            "title": "Quantum 3D Portfolio & Gateway",
            "category": "Interactive Web & 3D",
            "desc_ar": "منصة ويب ثلاثية الأبعاد غامرة تجمع بين محرك Three.js وخادم واجهة خلفية متكامل لتقديم تجربة غوص بصري استثنائية.",
            "desc_en": "An immersive 3D spatial web platform combining Three.js depth-mapping shaders with a high-performance backend architecture.",
            "stat_throughput": "60 FPS",
            "stat_latency": "Instant",
            "stat_availability": "5 Realms",
            "tags": "React, Three.js, WebGL, Lenis, Django / Python Backend",
            "features_ar": "خرائط العمق والتكبير السينمائي للطبقات\nمحاكي صوتي Web Audio تفاعلي\nتواصل مباشر مشفر مع الـ API",
            "features_en": "Cinematic camera zoom and depth parallax mapping\nIntegrated Web Audio synth soundscape\nReal-time encrypted dispatch channel",
            "order": 4
        }
    ]

    for pdata in projects_data:
        ProjectItem.objects.get_or_create(
            title=pdata["title"],
            defaults=pdata
        )
    print("[OK] Projects seeded")

    # 6. Experiences
    experiences_data = [
        {
            "role_ar": "Senior Systems & Software Architect",
            "role_en": "Senior Systems & Software Architect",
            "company": "Enterprise Cloud & Cyber Solutions",
            "period_ar": "2024 - الآن",
            "period_en": "2024 - Present",
            "desc_ar": "قيادة وتصميم المعماريات الموزعة للأنظمة السحابية المعقدة، تحسين خطوط الأنابيب البرمجية، وخفض زمن التأخير بنسبة 40% عبر إعادة هيكلة النوى البرمجية.",
            "desc_en": "Architecting resilient distributed microservices, mentoring core engineering teams, and reducing core latency by 40% via low-level kernel optimizations.",
            "skills": "System Architecture, Kubernetes, High-Performance C++, Microservices",
            "order": 1
        },
        {
            "role_ar": "Backend & Systems Infrastructure Engineer",
            "role_en": "Backend & Systems Infrastructure Engineer",
            "company": "Scalable Tech Labs",
            "period_ar": "2022 - 2024",
            "period_en": "2022 - 2024",
            "desc_ar": "تطوير واجهات برمجة التطبيقات عالية الأداء، أتمتة البنى التحتية السحابية باستخدام Terraform، وبناء محركات التدفق اللحظي للبيانات.",
            "desc_en": "Engineered scalable asynchronous backends, automated cloud provisioning with Terraform, and established real-time Kafka event streaming.",
            "skills": "Python FastAPI, Docker, Kafka, PostgreSQL, Redis",
            "order": 2
        },
        {
            "role_ar": "Software Engineer & Core Developer",
            "role_en": "Software Engineer & Core Developer",
            "company": "NextGen Software Systems",
            "period_ar": "2020 - 2022",
            "period_en": "2020 - 2022",
            "desc_ar": "برمجة وتطوير الأنظمة الأساسية، تحسين خوارزميات البحث وتخزين البيانات، والتعاون مع فرق التطوير لتقديم منتجات تقنية متكاملة.",
            "desc_en": "Developed core application services, optimized query retrieval performance, and established continuous delivery testing pipelines.",
            "skills": "C++, Linux, Algorithms, REST APIs, Git/CI-CD",
            "order": 3
        }
    ]

    for expdata in experiences_data:
        ExperienceItem.objects.get_or_create(
            role_ar=expdata["role_ar"],
            company=expdata["company"],
            defaults=expdata
        )
    print("[OK] Experience Timeline seeded")
    print("==================================================")
    print("[SUCCESS] Django Admin database initialized successfully!")
    print("==================================================")

if __name__ == '__main__':
    seed()
