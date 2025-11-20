import { Experience, Education, Skill, Service, Tool, CurrencyRate } from './types';

export const PERSONAL_INFO = {
  name: "Rajesh Kumar Sah",
  title: "Data Reporting and Visualization Specialist",
  email: "sahrajesh4546@gmail.com",
  phone: "+977-9815855166",
  location: "Imadole, Lalitpur",
  summary: "I am an MBA and BIM Graduate with work experience in Data Analytics. I have worked with WHO and Unilever Nepal. I am skilled in managing complex datasets, collaborating with cross-functional teams, and driving organizational success through effective people management practices. Committed to continuous learning and making a positive impact in diverse work environments."
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "MIS Officer",
    company: "S.B.L Professionals Pvt. Ltd.",
    period: "November 2024 - Present",
    description: [
      "Preparing daily Reports.",
      "Making PPTs.",
      "Maintaining Database and Troubleshooting server related issues."
    ]
  },
  {
    id: 2,
    role: "Business Growth Associate",
    company: "Worldlink Communications Ltd.",
    period: "February 2024 - November 2024",
    description: [
      "Handle inquiries from enterprise customers and provide appropriate product offerings.",
      "Establish customer mapping and devise strategies for visiting and successfully closing sales.",
      "Formulate and implement activities related to enterprise sales.",
      "Provide weekly, monthly, and quarterly sales activity reports to a supervisor.",
      "Collaborate with cross-functional teams to resolve customer issues."
    ]
  },
  {
    id: 3,
    role: "MIS Sales Consultant",
    company: "Unilever Nepal",
    period: "2022 - 2023",
    description: [
      "Preparing Primary and Secondary sales report from data extracted from database on daily basis using excel.",
      "Preparing Presentation for Meetings.",
      "Generating Purchase order and Agreements."
    ]
  },
  {
    id: 4,
    role: "Data and Information Management Intern",
    company: "World Health Organization",
    period: "2021 - 2022",
    description: [
      "Data and Information processing using Excel.",
      "Preparing PPTs.",
      "GIS Mapping.",
      "Working on Big Data (National Health Related Data)."
    ]
  },
  {
    id: 5,
    role: "Assistant (Finance)",
    company: "Big Mart",
    period: "2019 - 2020",
    description: [
      "Making Purchase Bills entries in Excel and Upload to the system.",
      "Ledger Reconciliation with Vendors.",
      "Bank Reconciliation."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Master of Business Administration (MBA)",
    institution: "DAV Business School",
    period: "Completed July 2025",
    details: "Graduated with CGPA of 3.24"
  },
  {
    id: 2,
    degree: "Bachelor in Information Management",
    institution: "Nagarjuna College of Information Technology",
    period: "2016 - 2020",
    details: "Graduated with GPA of 2.81"
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Technical & Data",
    items: ["Advanced Excel", "Data Visualization", "GIS Mapping", "Big Data Processing", "MS Office Suite"]
  },
  {
    category: "Creative & Design",
    items: ["Graphic Designing", "Social Media Content", "Presentation Design", "Video Making"]
  },
  {
    category: "Soft Skills",
    items: ["Creative Problem-Solving", "Effective Time Management", "Critical Thinking", "Active Listening", "Cross-functional Collaboration", "Efficiency Under Pressure"]
  },
  {
    category: "Interests",
    items: ["Generating Insights from Raw Data", "Making YouTube videos", "Volunteer Work", "Technology Trends"]
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Modern AI-Powered Websites",
    description: "I build modern, static, and fully functional websites leveraging AI tools to deliver high-quality results efficiently.",
    price: "Starting at 10,000",
    iconType: "web",
    features: [
      "Static & Fast Loading Pages",
      "Modern UI/UX Design",
      "Fully Responsive (Mobile Friendly)",
      "Cost-Effective Solution"
    ]
  },
  {
    id: 2,
    title: "Data Digitization & Analytics",
    description: "Comprehensive data services to transform physical records into digital insights and analyze them for better decision making.",
    iconType: "data",
    features: [
      "Data Digitization Services",
      "Data Cleaning & Formatting",
      "In-depth Data Analysis",
      "Visual Reporting"
    ]
  },
  {
    id: 3,
    title: "Online Form Filling",
    description: "Expert assistance with online government applications and Lok Sewa forms, ensuring accuracy and timely submission.",
    price: "Nominal Service Charge",
    iconType: "form",
    features: [
      "Lok Sewa Aayog Forms",
      "Passport & National ID",
      "University Entrance Forms",
      "Error-Free Submission"
    ]
  },
  {
    id: 4,
    title: "Graphic Design Services",
    description: "Creative graphic design solutions to boost your brand's visual identity across social media and marketing channels.",
    price: "Starting at 500",
    iconType: "design",
    features: [
      "Logo & Brand Identity",
      "Social Media Posts",
      "Banners & Flyers",
      "YouTube Thumbnails"
    ]
  },
  {
    id: 5,
    title: "High-End PPT Presentations",
    description: "I create professional, visually stunning, and high-impact PowerPoint presentations tailored for meetings, reports, and pitches.",
    price: "Starting at 1,000",
    iconType: "presentation",
    features: [
      "Professional Slide Design",
      "Infographics & Charts",
      "Animations & Transitions",
      "Corporate Branding"
    ]
  },
  {
    id: 6,
    title: "Premium Software Solutions",
    description: "Get fully activated versions of essential software and operating systems installed for your daily productivity needs.",
    price: "500 Only",
    iconType: "software",
    features: [
      "Microsoft Office",
      "Windows 10-11",
      "PDF Editor",
      "And Many More"
    ]
  }
];

export const CURRENCY_RATES: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', rate: 1, flag: '🇺🇸' },
  { code: 'NPR', name: 'Nepalese Rupee', rate: 134.5, flag: '🇳🇵' },
  { code: 'INR', name: 'Indian Rupee', rate: 84.0, flag: '🇮🇳' },
  { code: 'EUR', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.52, flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦' },
  { code: 'JPY', name: 'Japanese Yen', rate: 151.0, flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', rate: 7.23, flag: '🇨🇳' },
  { code: 'AED', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪' },
  { code: 'QAR', name: 'Qatari Riyal', rate: 3.64, flag: '🇶🇦' },
  { code: 'SAR', name: 'Saudi Riyal', rate: 3.75, flag: '🇸🇦' },
  { code: 'MYR', name: 'Malaysian Ringgit', rate: 4.73, flag: '🇲🇾' },
  { code: 'KRW', name: 'South Korean Won', rate: 1350.0, flag: '🇰🇷' },
];

export const TOOLS: Tool[] = [
  // 🔥 AI Tools (Gemini Powered)
  { id: "ai-chat", name: "Gemini Chat", description: "Gemini 3 Pro Chat.", category: "AI Tools", icon: "MessageSquare", componentType: "ai-text", featureId: "chat" },
  { id: "ai-search", name: "Search Genius", description: "Grounded by Google Search.", category: "AI Tools", icon: "Globe", componentType: "ai-text", featureId: "search" },
  { id: "ai-maps", name: "Maps Explorer", description: "Grounded by Google Maps.", category: "AI Tools", icon: "MapPin", componentType: "ai-text", featureId: "maps" },
  { id: "ai-think", name: "Deep Thinker", description: "Gemini 3 Pro Thinking Mode.", category: "AI Tools", icon: "BrainCircuit", componentType: "ai-text", featureId: "think" },
  { id: "ai-fast", name: "Fast Responder", description: "Low-latency Flash Lite.", category: "AI Tools", icon: "Zap", componentType: "ai-text", featureId: "fast" },
  
  { id: "ai-img-gen", name: "Image Generator", description: "Imagen 4 with Aspect Ratio.", category: "AI Tools", icon: "ImageIcon", componentType: "ai-image", featureId: "img-gen" },
  { id: "ai-img-edit", name: "Image Editor", description: "Edit with Nano Banana.", category: "AI Tools", icon: "Edit", componentType: "ai-image", featureId: "img-edit" },
  { id: "ai-img-scan", name: "Image Analyst", description: "Analyze with Gemini 3.", category: "AI Tools", icon: "ScanEye", componentType: "ai-image", featureId: "img-scan" },

  { id: "ai-vid-gen", name: "Video Creator", description: "Veo 3 Video Generation.", category: "AI Tools", icon: "Video", componentType: "ai-video", featureId: "vid-gen" },
  { id: "ai-vid-scan", name: "Video Analyst", description: "Video Understanding.", category: "AI Tools", icon: "Film", componentType: "ai-video", featureId: "vid-scan" },

  { id: "ai-aud-live", name: "Live Conversation", description: "Real-time Voice Chat.", category: "AI Tools", icon: "Mic2", componentType: "ai-audio", featureId: "live" },
  { id: "ai-aud-trans", name: "Audio Transcriber", description: "Speech to Text.", category: "AI Tools", icon: "FileAudio", componentType: "ai-audio", featureId: "transcribe" },
  { id: "ai-aud-tts", name: "Text to Speech", description: "Gemini TTS.", category: "AI Tools", icon: "Speaker", componentType: "ai-audio", featureId: "tts" },

  // 🔢 Calculators (Advanced)
  { id: "calc-sci", name: "Scientific Graphic Calc", description: "Advanced math & graphing.", category: "Calculators", icon: "Calculator", componentType: "calculator", featureId: "scientific" },
  { id: "calc-curr", name: "Currency Converter", description: "Real-time Multi-currency.", category: "Calculators", icon: "DollarSign", componentType: "calculator", featureId: "currency" },
  { id: "calc-area", name: "Land Converter", description: "Bigha, Kattha, Ropani, Aana.", category: "Calculators", icon: "Map", componentType: "calculator", featureId: "area" },
  { id: "calc-emi", name: "EMI Calculator", description: "Loan & Interest Planner.", category: "Calculators", icon: "Activity", componentType: "calculator", featureId: "emi" },
  { id: "calc-age", name: "Age Calculator", description: "Exact age calculation.", category: "Calculators", icon: "Calendar", componentType: "calculator", featureId: "age" },

  // 🎨 Image / Media Tools
  { id: "img-bg", name: "Background Remover", description: "Remove image backgrounds.", category: "Image Tools", icon: "Layers", componentType: "image", featureId: "bg-remove" },
  { id: "img-resize", name: "Image Resizer", description: "Resize dimensions/scale.", category: "Image Tools", icon: "Maximize", componentType: "image", featureId: "resizer" },
  { id: "img-compress", name: "Image Compressor", description: "Reduce file size.", category: "Image Tools", icon: "Minimize", componentType: "image", featureId: "compressor" },
  { id: "img-color", name: "Color Picker", description: "Extract HEX/RGB colors.", category: "Image Tools", icon: "Palette", componentType: "image", featureId: "color" },
  { id: "qr-gen", name: "QR Generator", description: "Create custom QR codes.", category: "Image Tools", icon: "QrCode", componentType: "image", featureId: "qr" },
  { id: "yt-thumb", name: "YT Thumbnails", description: "Download High-Res thumbs.", category: "Image Tools", icon: "Download", componentType: "image", featureId: "yt-thumb" },
  { id: "yt-mp3", name: "YT to MP3", description: "Convert video to audio.", category: "Image Tools", icon: "Music", componentType: "image", featureId: "yt-mp3" },

  // 📄 PDF / Document Tools
  { id: "pdf-word", name: "PDF to Word", description: "Convert PDF documents.", category: "Utilities", icon: "FileText", componentType: "utility", featureId: "pdf-word" },
  { id: "word-pdf", name: "Word to PDF", description: "Convert Docs to PDF.", category: "Utilities", icon: "File", componentType: "utility", featureId: "word-pdf" },
  { id: "pdf-compress", name: "PDF Compressor", description: "Reduce PDF file size.", category: "Utilities", icon: "Minimize", componentType: "utility", featureId: "pdf-compress" },
  { id: "pdf-merge", name: "PDF Merger", description: "Combine multiple PDFs.", category: "Utilities", icon: "Files", componentType: "utility", featureId: "pdf-merge" },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for Rajesh Kumar Sah's portfolio website.
Here is Rajesh's professional background:

Name: ${PERSONAL_INFO.name}
Title: ${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Summary: ${PERSONAL_INFO.summary}

Freelance Services Offered:
${SERVICES.map(s => `- ${s.title}: ${s.description}. Features: ${s.features.join(', ')}.${s.price ? ` Price: ${s.price}` : ''}`).join('\n')}

Work Experience:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description.join(' ')}`).join('\n')}

Education:
${EDUCATION.map(e => `- ${e.degree} from ${e.institution} (${e.period}). ${e.details || ''}`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}

Your goal is to answer questions from recruiters or visitors about Rajesh's experience, skills, services, and background professionally.
Be concise, polite, and highlight his data analytics strengths.
`;