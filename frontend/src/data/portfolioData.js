export const portfolioData = {
  ar: {
    hero: {
      badge: "مهندس أنظمة وبرمجيات • Systems & Software Engineer",
      name: "يوسف طارق",
      role: "مهندس أنظمة وبرمجيات متقدمة",
      tagline: "تصميم وبناء المعماريات الموزعة، الأنظمة فائقة الأداء، والبرمجيات السحابية الحديثة",
      bio: "مهندس برمجيات ونظم شغوف بهندسة البنى التحتية المتينة وتطوير حلول برمجية متكاملة تمزج بين الأداء الخارق على مستوى النواة (Kernel/Low-Level) وجمال التجربة الرقمية التفاعلية.",
      ctaPrimary: "ابدأ الغوص في المعمارية",
      ctaSecondary: "إرسال إشارة اتصال",
      stats: [
        { label: "سنوات الخبرة في الهندسة", value: "+5" },
        { label: "أنظمة ومشاريع منجزة", value: "+28" },
        { label: "كفاءة وزمن استجابة أقل من", value: "5ms" },
        { label: "جاهزية واستقرار النظم", value: "99.9%" }
      ]
    },
    skills: {
      title: "مصفوفة التقنيات وهندسة النظم",
      subtitle: "بناء الحلول من طبقات النظام الأساسية وحتى قمة السحابة",
      categories: [
        {
          id: "systems",
          name: "هندسة النظم والأداء (Low-Level & OS)",
          skills: [
            { name: "C / C++ (Modern 17/20)", level: 92, desc: "إدارة الذاكرة المتقدمة، البرمجة متعددة الخيوط (Multithreading)" },
            { name: "Rust & Memory Safety", level: 88, desc: "بناء خدمات أنظمة فائقة السرعة والأمان التزامني" },
            { name: "Linux Internals & POSIX", level: 90, desc: "تحسين أداء النواة، مقابس الشبكة، Shell Scripting" },
            { name: "System Architecture & Algorithms", level: 95, desc: "تصميم المعماريات المعقدة وتحليل الخوارزميات وتراكيب البيانات" }
          ]
        },
        {
          id: "distributed",
          name: "النظم الموزعة والسحابة (Distributed & Cloud)",
          skills: [
            { name: "Docker & Kubernetes (K8s)", level: 90, desc: "تنسيق الحاويات، النشر التلقائي، والإدارة السحابية" },
            { name: "Microservices & gRPC / Kafka", level: 87, desc: "معالجة الرسائل اللحظية وأنظمة الاتصال منخفضة التأخير" },
            { name: "Cloud Platforms (AWS / GCP / Azure)", level: 85, desc: "Serverless، بنى التخزين، وشبكات توزيع المحتوى" },
            { name: "CI/CD & DevOps (GitHub Actions)", level: 92, desc: "أتمتة الاختبارات والنشر المستمر للبنى التحتية كشيفرة" }
          ]
        },
        {
          id: "software",
          name: "تطوير البرمجيات والتطبيقات (Backend & Fullstack)",
          skills: [
            { name: "Python (FastAPI / Django / AsyncIO)", level: 94, desc: "تطوير واجهات RESTful و WebSockets عالية الكفاءة" },
            { name: "Node.js / TypeScript", level: 90, desc: "بناء خوادم برمجية سريعة وقابلة للتوسع اللحظي" },
            { name: "React & Modern Web Ecosystem", level: 88, desc: "بناء واجهات تفاعلية ثلاثية الأبعاد ذات استجابة فورية" },
            { name: "Three.js & WebGL Visuals", level: 85, desc: "تطوير التجارب البصرية الغامرة والرسوم التفاعلية" }
          ]
        },
        {
          id: "data",
          name: "قواعد البيانات والأمان (Databases & Security)",
          skills: [
            { name: "PostgreSQL & Complex SQL", level: 92, desc: "فهرسة متقدمة، استعلامات معقدة، وضبط الأداء" },
            { name: "Redis & In-Memory Caching", level: 94, desc: "التخزين المؤقت فائق السرعة، Distributed Locks" },
            { name: "MongoDB & NoSQL Engines", level: 86, desc: "نماذج الوثائق وتخزين البيانات غير المهيكلة" },
            { name: "Security & Zero-Trust Architecture", level: 89, desc: "التشفير، JWT، OAuth2، وتأمين نقاط النهاية" }
          ]
        }
      ]
    },
    projects: {
      title: "معرض الأنظمة والمشاريع البارزة",
      subtitle: "استكشف نماذج حقيقية من الأنظمة البرمجية والمعمارية المتطورة",
      items: [
        {
          id: "nexus-engine",
          title: "Nexus Distributed Consensus Engine",
          category: "Distributed Systems",
          desc: "محرك نظم موزعة مبني بلغة C++ و Rust يطبق خوارزمية التوافق Raft لمعالجة المعاملات المالية الحساسة بأزمنة تأخير تقل عن 2 ميلي ثانية.",
          tags: ["C++20", "Rust", "Raft Consensus", "gRPC", "Distributed KV"],
          stats: { throughput: "1.2M ops/sec", latency: "< 1.8ms", availability: "99.999%" },
          features: ["تكرار الحالة الموزعة (State Machine Replication)", "انتخاب القائد التلقائي وفشل العقد الآمن", "اختبارات التنافسية وضغط عالي"]
        },
        {
          id: "aegis-telemetry",
          title: "Aegis Real-Time Telemetry & APM",
          category: "Cloud & Observability",
          desc: "منصة مراقبة سحابية هجينة تجمع مقاييس الأداء والسجلات من آلاف الحاويات لحظياً وتوفر تنبيهات ذكية باستخدام الذكاء الاصطناعي.",
          tags: ["Python", "FastAPI", "Go", "Kafka", "ClickHouse", "React"],
          stats: { dataVolume: "500GB/Day", alertSpeed: "Instant", retention: "365 Days" },
          features: ["محرك تدفق بيانات باستخدام Apache Kafka", "تخزين تحليلي فائق الكفاءة باستخدام ClickHouse", "واجهة بصرية ثلاثية الأبعاد لتشخيص الأعطال"]
        },
        {
          id: "micronet-os",
          title: "MicroNet Hypervisor & Network Stack",
          category: "Low-Level & OS",
          desc: "طبقة محاكاة خفيفة ونواة شبكية مخصصة لمعالجة الحزم الشبكية على مستوى العتاد بدون الاعتماد على مقابس النواة التقليدية (Kernel Bypass).",
          tags: ["C", "DPDK", "x86_64 Assembly", "eBPF", "Linux Kernel"],
          stats: { packetLoss: "0.00%", speed: "10 Gbps Line Rate", memoryFootprint: "< 16MB" },
          features: ["معالجة حزم الشبكة بتقنية Zero-Copy", "حقن مراقبة الحزم بواسطة eBPF", "استهلاك ذاكرة متناهي الصغر"]
        },
        {
          id: "quantum-cv-platform",
          title: "Quantum 3D Portfolio & Gateway",
          category: "Interactive Web & 3D",
          desc: "منصة ويب ثلاثية الأبعاد غامرة تجمع بين محرك Three.js وخادم واجهة خلفية متكامل لتقديم تجربة غوص بصري استثنائية.",
          tags: ["React", "Three.js", "WebGL", "Lenis", "Python / Node Backend"],
          stats: { frameRate: "60 FPS", interactiveLayers: "5 Realms", latency: "Instant" },
          features: ["خرائط العمق والتكبير السينمائي للطبقات", "محاكي صوتي Web Audio تفاعلي", "تواصل مباشر مشفر مع الـ API"]
        }
      ]
    },
    experience: {
      title: "مسار الخبرة والقيادة الهندسية",
      subtitle: "محطات التميز في بناء وتطوير الأنظمة المعقدة",
      timeline: [
        {
          period: "2024 - الآن",
          role: "Senior Systems & Software Architect",
          company: "Enterprise Cloud & Cyber Solutions",
          desc: "قيادة وتصميم المعماريات الموزعة للأنظمة السحابية المعقدة، تحسين خطوط الأنابيب البرمجية، وخفض زمن التأخير بنسبة 40% عبر إعادة هيكلة النوى البرمجية.",
          skills: ["System Architecture", "Kubernetes", "High-Performance C++", "Microservices"]
        },
        {
          period: "2022 - 2024",
          role: "Backend & Systems Infrastructure Engineer",
          company: "Scalable Tech Labs",
          desc: "تطوير واجهات برمجة التطبيقات عالية الأداء، أتمتة البنى التحتية السحابية باستخدام Terraform، وبناء محركات التدفق اللحظي للبيانات.",
          skills: ["Python FastAPI", "Docker", "Kafka", "PostgreSQL", "Redis"]
        },
        {
          period: "2020 - 2022",
          role: "Software Engineer & Core Developer",
          company: "NextGen Software Systems",
          desc: "برمجة وتطوير الأنظمة الأساسية، تحسين خوارزميات البحث وتخزين البيانات، والتعاون مع فرق التطوير لتقديم منتجات تقنية متكاملة.",
          skills: ["C++", "Linux", "Algorithms", "REST APIs", "Git/CI-CD"]
        }
      ]
    },
    contact: {
      title: "مركز إرسال الإشارة والتواصل",
      subtitle: "جاهز دائماً لمناقشة المشاريع الهندسية، الاستشارات التقنية، والفرص الواعدة",
      terminalTitle: "yousif@quantum-core:~$ connect --secure",
      formName: "الاسم الكريم",
      formEmail: "البريد الإلكتروني",
      formSubject: "موضوع الرسالة",
      formMessage: "نص الرسالة أو تفاصيل المشروع",
      submitBtn: "إرسال الإشارة الفورية ⚡",
      sending: "جاري تشفير وإرسال الإشارة...",
      success: "تم استلام رسالتك وتوصيلها بنجاح إلى مركز القيادة! سأتواصل معك قريباً.",
      email: "yousif.tariq@engineer.dev",
      location: "الرياض • متاح للعمل عن بعد وحول العالم",
      status: "متاح حالياً للمشاريع والتحديات الهندسية المتقدمة 🟢"
    }
  },
  en: {
    hero: {
      badge: "Systems & Software Engineer",
      name: "Yousif Tariq",
      role: "Lead Systems & Software Engineer",
      tagline: "Architecting High-Performance Distributed Systems & Scalable Software",
      bio: "A passionate systems & software engineer dedicated to building resilient distributed infrastructures and end-to-end software solutions that merge low-level performance with breathtaking digital experiences.",
      ctaPrimary: "Explore Architecture Dive",
      ctaSecondary: "Transmit Signal",
      stats: [
        { label: "Years Engineering Experience", value: "+5" },
        { label: "Production Systems Built", value: "+28" },
        { label: "Core Latency Target", value: "< 5ms" },
        { label: "System Availability", value: "99.9%" }
      ]
    },
    skills: {
      title: "Core Technology & Systems Matrix",
      subtitle: "Engineering solutions from bare-metal kernel layers to the cloud summit",
      categories: [
        {
          id: "systems",
          name: "Low-Level & OS Engineering",
          skills: [
            { name: "C / C++ (Modern 17/20)", level: 92, desc: "Manual memory safety, high-throughput multithreading & lock-free queues" },
            { name: "Rust & Memory Safety", level: 88, desc: "Building concurrent, blazing-fast and memory-safe system daemons" },
            { name: "Linux Internals & POSIX", level: 90, desc: "Kernel tuning, raw sockets, IPC, and system call optimization" },
            { name: "System Architecture & Algorithms", level: 95, desc: "Large-scale system design, data structures, and asymptotic complexity" }
          ]
        },
        {
          id: "distributed",
          name: "Distributed Systems & Cloud",
          skills: [
            { name: "Docker & Kubernetes (K8s)", level: 90, desc: "Container orchestration, automated deployments & cloud-native infra" },
            { name: "Microservices & gRPC / Kafka", level: 87, desc: "Real-time event streaming and sub-millisecond RPC communication" },
            { name: "Cloud Platforms (AWS / GCP / Azure)", level: 85, desc: "Serverless architectures, VPC networking & global CDN backbones" },
            { name: "CI/CD & DevOps Automation", level: 92, desc: "Infrastructure as Code (Terraform), continuous integration pipelines" }
          ]
        },
        {
          id: "software",
          name: "Software & Backend Architecture",
          skills: [
            { name: "Python (FastAPI / Django / AsyncIO)", level: 94, desc: "High-throughput asynchronous RESTful & WebSocket backends" },
            { name: "Node.js / TypeScript", level: 90, desc: "Event-driven runtime servers with real-time scalability" },
            { name: "React & Modern Web Ecosystem", level: 88, desc: "High-performance reactive user interfaces and dashboards" },
            { name: "Three.js & WebGL Visuals", level: 85, desc: "Immersive 3D interactive graphics, shaders and depth mapping" }
          ]
        },
        {
          id: "data",
          name: "Databases & Security Architecture",
          skills: [
            { name: "PostgreSQL & High-Performance SQL", level: 92, desc: "Advanced indexing, query execution planning, and sharding" },
            { name: "Redis & In-Memory Stores", level: 94, desc: "Ultra-fast distributed caching, pub/sub, and distributed locking" },
            { name: "MongoDB & Document Engines", level: 86, desc: "Flexible schema design, aggregation pipelines, and replication" },
            { name: "Zero-Trust Security & Cryptography", level: 89, desc: "End-to-end encryption, OAuth2, JWT, and API hardening" }
          ]
        }
      ]
    },
    projects: {
      title: "Featured Systems & Multiverse",
      subtitle: "Explore high-impact production systems and engineering milestones",
      items: [
        {
          id: "nexus-engine",
          title: "Nexus Distributed Consensus Engine",
          category: "Distributed Systems",
          desc: "A high-speed distributed state machine engine written in C++ and Rust implementing the Raft consensus protocol for zero-data-loss transactions.",
          tags: ["C++20", "Rust", "Raft Consensus", "gRPC", "Distributed KV"],
          stats: { throughput: "1.2M ops/sec", latency: "< 1.8ms", availability: "99.999%" },
          features: ["Replicated log state machine with deterministic replay", "Automatic leader election and graceful partitioned recovery", "Rigorous Jepsen-style fault injection tests"]
        },
        {
          id: "aegis-telemetry",
          title: "Aegis Real-Time Telemetry & APM",
          category: "Cloud & Observability",
          desc: "Enterprise hybrid telemetry platform collecting real-time container metrics and distributed traces with AI-powered root-cause analysis.",
          tags: ["Python", "FastAPI", "Go", "Kafka", "ClickHouse", "React"],
          stats: { dataVolume: "500GB/Day", alertSpeed: "Instant", retention: "365 Days" },
          features: ["High-volume event ingestion stream backed by Kafka", "Columnar OLAP query optimization with ClickHouse", "Interactive 3D dependency graph visualizer"]
        },
        {
          id: "micronet-os",
          title: "MicroNet Hypervisor & Network Stack",
          category: "Low-Level & OS",
          desc: "Lightweight userspace packet processor and hypervisor kernel bypass utilizing raw hardware queues for wire-rate networking.",
          tags: ["C", "DPDK", "x86_64 Assembly", "eBPF", "Linux Kernel"],
          stats: { packetLoss: "0.00%", speed: "10 Gbps Line Rate", memoryFootprint: "< 16MB" },
          features: ["Zero-copy DMA hardware packet processing", "eBPF tracepoint instrumentation hooks", "Micro-footprint memory overhead"]
        },
        {
          id: "quantum-cv-platform",
          title: "Quantum 3D Portfolio & Gateway",
          category: "Interactive Web & 3D",
          desc: "An immersive 3D spatial web platform combining Three.js depth-mapping shaders with a high-performance backend architecture.",
          tags: ["React", "Three.js", "WebGL", "Lenis", "Python / Node Backend"],
          stats: { frameRate: "60 FPS", interactiveLayers: "5 Realms", latency: "Instant" },
          features: ["Cinematic camera zoom and depth parallax mapping", "Integrated Web Audio synth soundscape", "Real-time encrypted dispatch channel"]
        }
      ]
    },
    experience: {
      title: "Engineering Journey & Milestones",
      subtitle: "Proven track record of architecting and shipping mission-critical software",
      timeline: [
        {
          period: "2024 - Present",
          role: "Senior Systems & Software Architect",
          company: "Enterprise Cloud & Cyber Solutions",
          desc: "Architecting resilient distributed microservices, mentoring core engineering teams, and reducing core latency by 40% via low-level kernel optimizations.",
          skills: ["System Architecture", "Kubernetes", "High-Performance C++", "Microservices"]
        },
        {
          period: "2022 - 2024",
          role: "Backend & Systems Infrastructure Engineer",
          company: "Scalable Tech Labs",
          desc: "Engineered scalable asynchronous backends, automated cloud provisioning with Terraform, and established real-time Kafka event streaming.",
          skills: ["Python FastAPI", "Docker", "Kafka", "PostgreSQL", "Redis"]
        },
        {
          period: "2020 - 2022",
          role: "Software Engineer & Core Developer",
          company: "NextGen Software Systems",
          desc: "Developed core application services, optimized query retrieval performance, and established continuous delivery testing pipelines.",
          skills: ["C++", "Linux", "Algorithms", "REST APIs", "Git/CI-CD"]
        }
      ]
    },
    contact: {
      title: "Signal Nexus & Transmission Center",
      subtitle: "Open for high-impact engineering collaborations, architectural consulting, and visionary endeavors",
      terminalTitle: "yousif@quantum-core:~$ connect --secure",
      formName: "Your Full Name",
      formEmail: "Your Email Address",
      formSubject: "Transmission Subject",
      formMessage: "Message / Project Architecture Details",
      submitBtn: "Transmit Secure Signal ⚡",
      sending: "Encrypting and dispatching signal...",
      success: "Signal dispatched and safely received at core command! I will reply shortly.",
      email: "yousif.tariq@engineer.dev",
      location: "Riyadh • Available for Global & Remote Challenges",
      status: "Currently Available for Advanced Systems & Architecture Roles 🟢"
    }
  }
};
