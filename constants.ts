
import { Experience, Education, Skill, Service, Tool, CurrencyRate } from './types';

export const PERSONAL_INFO = {
  name: "Rajesh Kumar Sah",
  title: "Procurement and Data Management Professional",
  email: "sahrajesh4546@gmail.com",
  phone: "+977-9815855166",
  location: "Imadole, Lalitpur, Nepal",
  summary: "Result-oriented Procurement and Data Management professional with an MBA in Human Resources (CGPA 3.46, completed July 2025) and a Bachelor’s degree in Information Management. Brings over four years of progressive experience across national and international organizations, specializing in MIS reporting, procurement support, contract coordination, vendor and stakeholder management, and ERP-based operational systems. Skilled in transforming complex data into actionable insights, optimizing administrative and procurement workflows, and supporting high-value organizational processes with accuracy, integrity, and strategic focus. Committed to driving operational excellence, digital transformation, and innovation through analytical thinking and a strong understanding of business systems."
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "MIS Officer",
    company: "S.B.L Professionals Pvt. Ltd.",
    period: "Nov 2024 – Present",
    description: [
      "Prepare daily performance and system reports for executive decision-making.",
      "Maintain databases, troubleshooting system/server issues, and document technical reports.",
      "Assist in ensuring procurement records are accurately maintained."
    ]
  },
  {
    id: 2,
    role: "Business Growth Associate",
    company: "Worldlink Communications Ltd.",
    period: "Feb 2024 – Nov 2024",
    description: [
      "Managed client communications, created technical solution proposals, and generated quotations.",
      "Developed strategies for enterprise sales and sustained client relationships.",
      "Collaborated with cross-functional teams and ensured timely payment and documentation cycles."
    ]
  },
  {
    id: 3,
    role: "MIS Sales Consultant",
    company: "Unilever Nepal",
    period: "Dec 2022 – Dec 2023",
    description: [
      "Created daily and monthly sales reports using Excel and internal systems.",
      "Supported the procurement department with purchase order tracking and contract follow-ups.",
      "Prepared visual reports and presentations for management."
    ]
  },
  {
    id: 4,
    role: "Data & Information Intern",
    company: "World Health Organization (WHO)",
    period: "Dec 2021 – Nov 2022",
    description: [
      "Managed large-scale national health datasets, including GIS-based visual mapping.",
      "Developed dashboards and presentations used in government and global meetings.",
      "Supported logistical coordination for research and project reporting."
    ]
  },
  {
    id: 5,
    role: "Finance Assistant",
    company: "Big Mart",
    period: "2019 – 2020",
    description: [
      "Maintained vendor ledgers and bank reconciliations.",
      "Entered purchase bills and supported internal audit and system uploads."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Master of Business Administration (MBA) – Human Resources",
    institution: "DAV Business School, Kathmandu",
    period: "Completed: July 2025",
    details: "CGPA: 3.46"
  },
  {
    id: 2,
    degree: "Bachelor's in Information Management (BIM)",
    institution: "Nagarjuna College of Information Technology",
    period: "Completed: July 2020",
    details: "GPA: 2.81"
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Technical Skills",
    items: ["Microsoft Excel (Advanced)", "ERP & Web-Based Management Tools", "Database Management", "Report Generation", "GIS Mapping & Data Visualization", "Basic Graphic Design Tools"]
  },
  {
    category: "Core Competencies",
    items: ["Vendor Coordination", "Data Reporting & MIS", "Purchase Order & Contract Support", "Administrative & Financial Assistance", "Risk Management & Documentation"]
  },
  {
    category: "Languages",
    items: ["Maithili (Native)", "Nepali (Fluent)", "English (Fluent)", "Hindi (Proficient)"]
  },
  {
    category: "Interests",
    items: ["Data Analysis & Research", "YouTube Video Creation & Editing", "Volunteer & Community Engagement", "Digital Tools & Systems"]
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
  // 🤖 AI Tools (New)
  { id: "ai-chat", name: "AI Assistant", description: "Chat with Gemini Pro.", category: "AI Tools", icon: "MessageSquare", componentType: "ai-chat", featureId: "chat-bot" },
  { id: "ai-fast", name: "Fast AI Chat", description: "Instant answers with Flash Lite.", category: "AI Tools", icon: "Zap", componentType: "ai-text", featureId: "fast" },
  { id: "ai-think", name: "Deep Thinking", description: "Complex reasoning with Gemini 3.", category: "AI Tools", icon: "BrainCircuit", componentType: "ai-text", featureId: "think" },
  { id: "ai-gen-img", name: "Pro Image Gen", description: "Generate 1K/2K/4K images.", category: "AI Tools", icon: "ImagePlus", componentType: "ai-image-gen", featureId: "gen-img" },
  { id: "ai-edit-img", name: "Magic Editor", description: "Edit images with text prompts.", category: "AI Tools", icon: "Wand2", componentType: "ai-image-edit", featureId: "edit-img" },
  { id: "ai-analyze", name: "Image Analyzer", description: "Understand & analyze photos.", category: "AI Tools", icon: "ScanEye", componentType: "ai-analyze", featureId: "analyze" },
  { id: "ai-video", name: "Veo Animator", description: "Turn photos into video.", category: "AI Tools", icon: "Film", componentType: "ai-video", featureId: "veo" },

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
