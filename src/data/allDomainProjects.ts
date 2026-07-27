import { Project, ProjectDocumentation } from "../types";
import { PROJECTS_DATA } from "./projects";
import { DOMAINS_DATA } from "./domains";

// Catalog of 20 distinct projects for each domain
const DOMAIN_PROJECT_CATALOG: Record<string, Array<{
  id: string;
  name: string;
  shortDescription: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "existing" | "trending" | "recent" | "recommended";
  tags: string[];
  rating: number;
  author: string;
  updatedAt: string;
  techFrontend?: string[];
  techBackend?: string[];
  techAi?: string[];
  techDb?: string[];
}>> = {
  ai: [
    {
      id: "ai-1",
      name: "AI Startup Mentor & Incubator Assistant",
      shortDescription: "An AI-powered advisory ecosystem providing real-time startup valuation, pitch deck feedback, go-to-market strategies, and competitor analysis.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["Generative AI", "Gemini API", "React", "Express", "Node.js", "MongoDB"],
      rating: 4.9,
      author: "AI Hub Team",
      updatedAt: "2026-07-20"
    },
    {
      id: "ai-2",
      name: "Autonomous LLM Code Reviewer & Security Auditor",
      shortDescription: "An AI code reviewer that analyzes pull requests, flags OWASP security flaws, suggests refactoring patches, and enforces style guidelines.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["LLM", "AST Parsing", "React", "Node.js", "Gemini 3.6"],
      rating: 4.92,
      author: "DevSec AI Lab",
      updatedAt: "2026-07-22"
    },
    {
      id: "ai-3",
      name: "Multi-Modal Vision Document Parser & Summarizer",
      shortDescription: "Extracts key data from PDF invoices, medical receipts, and handwritten documents using multi-modal AI vision models.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Multi-Modal AI", "OCR", "React", "Python FastAPI"],
      rating: 4.85,
      author: "Vision AI Research",
      updatedAt: "2026-07-21"
    },
    {
      id: "ai-4",
      name: "Real-Time Conversational AI Voice Tutor",
      shortDescription: "An interactive voice agent providing personalized spoken language practice, pronunciation correction, and grammar feedback.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["Speech AI", "WebRTC", "Gemini Live API", "React"],
      rating: 4.88,
      author: "EduTech AI",
      updatedAt: "2026-07-19"
    },
    {
      id: "ai-5",
      name: "Legal Contract Analysis & Risk Scoring Engine",
      shortDescription: "Scans corporate legal contracts, identifies high-risk indemnity clauses, and generates simplified compliance summaries.",
      difficulty: "Advanced",
      category: "existing",
      tags: ["Legal AI", "NLP", "React", "Express", "MongoDB"],
      rating: 4.8,
      author: "LexAI Systems",
      updatedAt: "2026-07-18"
    },
    {
      id: "ai-6",
      name: "AI Medical Prescription & Interaction Checker",
      shortDescription: "Analyzes prescription combinations to detect harmful drug-drug interactions and dosage anomalies using medical AI.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Healthcare AI", "Python", "React", "Gemini API"],
      rating: 4.91,
      author: "MedAI Labs",
      updatedAt: "2026-07-23"
    },
    {
      id: "ai-7",
      name: "Personalized AI Essay Grader & Feedback System",
      shortDescription: "Automates academic paper evaluation with detailed feedback on thesis clarity, argumentative structure, and grammar.",
      difficulty: "Intermediate",
      category: "recent",
      tags: ["NLP", "Education", "React", "Express"],
      rating: 4.79,
      author: "EduGrade Systems",
      updatedAt: "2026-07-15"
    },
    {
      id: "ai-8",
      name: "Generative AI Graphic & Banner Designer",
      shortDescription: "Creates custom marketing banners, visual graphics, and social media posts from natural language text prompts.",
      difficulty: "Intermediate",
      category: "trending",
      tags: ["Image Gen AI", "Canvas API", "React", "Node.js"],
      rating: 4.86,
      author: "DesignGen AI",
      updatedAt: "2026-07-24"
    },
    {
      id: "ai-9",
      name: "AI Financial News Sentiment & Market Predictor",
      shortDescription: "Gathers live financial news feeds, calculates market sentiment scores, and flags market-moving stock catalysts.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["FinTech", "Sentiment Analysis", "Python", "React"],
      rating: 4.87,
      author: "QuantAI Research",
      updatedAt: "2026-07-20"
    },
    {
      id: "ai-10",
      name: "Smart AI HR Recruiter & Resume Matcher",
      shortDescription: "Matches applicant resumes against job descriptions, calculates skill fit scores, and generates candidate interview questions.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["HR Tech", "NLP", "React", "Express"],
      rating: 4.75,
      author: "TalentAI",
      updatedAt: "2026-07-16"
    },
    {
      id: "ai-11",
      name: "AI Code Translator & Framework Converter",
      shortDescription: "Automatically translates source code between programming languages (e.g., Python to TypeScript, Java to Go).",
      difficulty: "Intermediate",
      category: "recent",
      tags: ["Code AI", "AST", "React", "Node.js"],
      rating: 4.83,
      author: "CodeShift Lab",
      updatedAt: "2026-07-17"
    },
    {
      id: "ai-12",
      name: "AI Audio Transcription & Action Item Generator",
      shortDescription: "Transcribes meeting recordings, extracts key action items, and emails structured meeting summaries to participants.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Speech-to-Text", "Whisper AI", "React", "Express"],
      rating: 4.82,
      author: "Productivity AI",
      updatedAt: "2026-07-22"
    },
    {
      id: "ai-13",
      name: "AI Customer Support Ticket Router & Auto-Responder",
      shortDescription: "Categorizes inbound customer support tickets, predicts urgency, and drafts automated context-aware responses.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["Customer Support", "NLP", "React", "MongoDB"],
      rating: 4.76,
      author: "SupportGenie",
      updatedAt: "2026-07-14"
    },
    {
      id: "ai-14",
      name: "AI Patent Similarity & Prior Art Search System",
      shortDescription: "Searches international patent databases using semantic vector search to identify prior art for new inventions.",
      difficulty: "Advanced",
      category: "recent",
      tags: ["Patent AI", "Vector Search", "Python", "React"],
      rating: 4.88,
      author: "IP Insights Lab",
      updatedAt: "2026-07-19"
    },
    {
      id: "ai-15",
      name: "AI Mental Health Support Companion & Journal",
      shortDescription: "Offers empathetic reflective conversations, daily mood tracking, and cognitive behavioral therapy (CBT) prompts.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Health AI", "React", "Express", "Encrypted Store"],
      rating: 4.9,
      author: "MindCare AI",
      updatedAt: "2026-07-21"
    },
    {
      id: "ai-16",
      name: "AI Real Estate Valuation & Neighborhood Analyzer",
      shortDescription: "Evaluates property values by combining satellite imagery analysis, local amenity density, and historic sales trends.",
      difficulty: "Intermediate",
      category: "trending",
      tags: ["PropTech", "Regression ML", "React", "Mapbox"],
      rating: 4.81,
      author: "EstateAI",
      updatedAt: "2026-07-15"
    },
    {
      id: "ai-17",
      name: "AI Music Composition & Sound Generator",
      shortDescription: "Generates royalty-free background soundtracks and sound effects customized for video games and podcasts.",
      difficulty: "Advanced",
      category: "recent",
      tags: ["Audio AI", "WebAudio API", "React", "Python"],
      rating: 4.84,
      author: "SoundCraft Studio",
      updatedAt: "2026-07-18"
    },
    {
      id: "ai-18",
      name: "AI Cybersecurity Threat Hunter & Anomaly Finder",
      shortDescription: "Analyzes system log streams in real-time to detect zero-day cyber attack behavior and unauthorized lateral movement.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["Cyber AI", "Anomaly Detection", "React", "Python"],
      rating: 4.93,
      author: "ShieldAI Systems",
      updatedAt: "2026-07-23"
    },
    {
      id: "ai-19",
      name: "AI E-Commerce Product Description Generator",
      shortDescription: "Creates SEO-optimized, engaging product descriptions and multi-platform promotional copy from feature lists.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["Copywriting AI", "React", "Express"],
      rating: 4.74,
      author: "CopyBot",
      updatedAt: "2026-07-12"
    },
    {
      id: "ai-20",
      name: "AI Video Subtitle & Language Translation Pipeline",
      shortDescription: "Generates multi-lingual closed captions and translated voiceovers for uploaded video content.",
      difficulty: "Advanced",
      category: "recommended",
      tags: ["Video AI", "FFmpeg", "React", "Gemini API"],
      rating: 4.89,
      author: "MediaTrans AI",
      updatedAt: "2026-07-20"
    }
  ],

  ml: [
    {
      id: "ml-1",
      name: "Deep Learning Medical X-Ray Anomaly Detector",
      shortDescription: "A convolutional neural network (CNN) trained to identify pulmonary nodules, pneumonia, and thoracic abnormalities in chest radiographs.",
      difficulty: "Advanced",
      category: "recommended",
      tags: ["Computer Vision", "TensorFlow", "React", "FastAPI"],
      rating: 4.93,
      author: "HealthTech ML",
      updatedAt: "2026-07-22"
    },
    {
      id: "ml-2",
      name: "Real-Time Facial Emotion Recognition & Attentiveness Monitor",
      shortDescription: "Tracks facial keypoints in webcam streams to classify emotions and calculate student attentiveness in virtual classrooms.",
      difficulty: "Intermediate",
      category: "trending",
      tags: ["OpenCV", "PyTorch", "React", "Webcam API"],
      rating: 4.86,
      author: "VisionLab Scholar",
      updatedAt: "2026-07-21"
    },
    {
      id: "ml-3",
      name: "Customer Churn Prediction & Retention Analytics Engine",
      shortDescription: "Predicts subscription customer churn risk using XGBoost regression and recommends targeted retention incentive offers.",
      difficulty: "Intermediate",
      category: "existing",
      tags: ["Scikit-Learn", "XGBoost", "React", "Express"],
      rating: 4.8,
      author: "DataAnalytics Lab",
      updatedAt: "2026-07-18"
    },
    {
      id: "ml-4",
      name: "Natural Language Processing Sentiment Classifier",
      shortDescription: "Classifies customer feedback and social media mentions into positive, negative, and neutral sentiment categories.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["NLP", "NLTK", "React", "Python"],
      rating: 4.75,
      author: "TextML Research",
      updatedAt: "2026-07-15"
    },
    {
      id: "ml-5",
      name: "Automated Fraud Detection Engine for Banking Transactions",
      shortDescription: "Detects fraudulent credit card activity in high-volume transaction streams using Isolation Forests and Neural Networks.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["FinTech ML", "Anomaly Detection", "React", "FastAPI"],
      rating: 4.92,
      author: "FinSec Machine Learning",
      updatedAt: "2026-07-23"
    },
    {
      id: "ml-6",
      name: "Credit Risk Assessment & Loan Default Predictor",
      shortDescription: "Evaluates loan applicant creditworthiness using machine learning models trained on historical financial repayment records.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Credit ML", "Pandas", "React", "Express"],
      rating: 4.82,
      author: "RiskAnalytics",
      updatedAt: "2026-07-19"
    },
    {
      id: "ml-7",
      name: "Predictive Maintenance System for Industrial Machinery",
      shortDescription: "Monitors sensor vibration and heat telemetry to forecast mechanical failures prior to costly factory breakdowns.",
      difficulty: "Advanced",
      category: "recent",
      tags: ["Predictive Maintenance", "IoT ML", "React", "Python"],
      rating: 4.89,
      author: "SmartFactory ML",
      updatedAt: "2026-07-20"
    },
    {
      id: "ml-8",
      name: "E-Commerce Collaborative Filtering Recommendation System",
      shortDescription: "Recommends relevant products to buyers based on user similarity matrices and matrix factorization algorithms.",
      difficulty: "Intermediate",
      category: "existing",
      tags: ["Recommender", "Matrix Factorization", "React", "Node.js"],
      rating: 4.81,
      author: "ShopML Team",
      updatedAt: "2026-07-16"
    },
    {
      id: "ml-9",
      name: "Automated Stock Price Forecasting & Trend Analysis",
      shortDescription: "Utilizes Long Short-Term Memory (LSTM) recurrent neural networks to predict equity price movements.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["LSTM", "Time Series", "PyTorch", "React"],
      rating: 4.87,
      author: "QuantModel Labs",
      updatedAt: "2026-07-24"
    },
    {
      id: "ml-10",
      name: "Handwritten Digit & Optical Character Recognition (OCR) Engine",
      shortDescription: "Extracts text from scanned paper documents and handwritten notes using deep convolutional networks.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["OCR", "MNIST", "React", "Python"],
      rating: 4.73,
      author: "Core ML Lab",
      updatedAt: "2026-07-12"
    },
    {
      id: "ml-11",
      name: "Real-Time Speech Recognition & Voice Command Classifier",
      shortDescription: "Converts spoken audio streams into structured text and identifies custom voice trigger commands.",
      difficulty: "Intermediate",
      category: "recent",
      tags: ["Speech ML", "Audio Spectrogram", "React", "FastAPI"],
      rating: 4.84,
      author: "VoiceML Systems",
      updatedAt: "2026-07-17"
    },
    {
      id: "ml-12",
      name: "Anomaly Detection in High-Dimensional Network Traffic",
      shortDescription: "Identifies distributed denial-of-service (DDoS) traffic spikes using autoencoders and clustering models.",
      difficulty: "Advanced",
      category: "recommended",
      tags: ["NetSec ML", "Autoencoders", "React", "Python"],
      rating: 4.88,
      author: "SecData AI",
      updatedAt: "2026-07-21"
    },
    {
      id: "ml-13",
      name: "House Price Prediction using Multi-Feature Regression",
      shortDescription: "Predicts residential real estate market values using location metrics, square footage, and neighborhood demographics.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["Regression", "Scikit-Learn", "React", "Express"],
      rating: 4.72,
      author: "DataML Basics",
      updatedAt: "2026-07-10"
    },
    {
      id: "ml-14",
      name: "Traffic Sign Recognition & Classification for Autonomous Driving",
      shortDescription: "Classifies road traffic signs in real-time video frames using lightweight MobileNet vision models.",
      difficulty: "Intermediate",
      category: "recent",
      tags: ["MobileNet", "Computer Vision", "React", "Python"],
      rating: 4.85,
      author: "AutoVision Lab",
      updatedAt: "2026-07-19"
    },
    {
      id: "ml-15",
      name: "Spam Email Filter using Naive Bayes & SVM",
      shortDescription: "Filters unwanted marketing spam and phishing messages using TF-IDF feature extraction and Support Vector Machines.",
      difficulty: "Beginner",
      category: "existing",
      tags: ["SVM", "TF-IDF", "React", "Node.js"],
      rating: 4.7,
      author: "TextFilter Systems",
      updatedAt: "2026-07-11"
    },
    {
      id: "ml-16",
      name: "Customer Segmentation & Persona Clustering System",
      shortDescription: "Groups shoppers into distinct purchasing personas using K-Means clustering and demographic profiling.",
      difficulty: "Intermediate",
      category: "recommended",
      tags: ["Clustering", "K-Means", "React", "Pandas"],
      rating: 4.79,
      author: "MarketSegment AI",
      updatedAt: "2026-07-16"
    },
    {
      id: "ml-17",
      name: "Plant Disease Identification using Convolutional Neural Networks",
      shortDescription: "Identifies leaf diseases across 20 agricultural crop species from camera photos with over 96% accuracy.",
      difficulty: "Intermediate",
      category: "trending",
      tags: ["Agri ML", "CNN", "React", "FastAPI"],
      rating: 4.9,
      author: "AgriTech ML",
      updatedAt: "2026-07-22"
    },
    {
      id: "ml-18",
      name: "Generative Adversarial Network (GAN) for Image Super-Resolution",
      shortDescription: "Upscales low-resolution photos into crisp, detailed high-definition images using Deep GAN architectures.",
      difficulty: "Advanced",
      category: "trending",
      tags: ["GAN", "Super Resolution", "PyTorch", "React"],
      rating: 4.91,
      author: "DeepMedia Lab",
      updatedAt: "2026-07-24"
    },
    {
      id: "ml-19",
      name: "Time-Series Weather Forecasting Engine",
      shortDescription: "Forecasts local temperature, rainfall, and humidity over 7-day windows using Prophet and ARIMA models.",
      difficulty: "Intermediate",
      category: "recent",
      tags: ["Prophet", "Time Series", "React", "Python"],
      rating: 4.78,
      author: "MeteoData AI",
      updatedAt: "2026-07-15"
    },
    {
      id: "ml-20",
      name: "Drug Toxicity Prediction Model using Molecular Graph Features",
      shortDescription: "Evaluates pharmaceutical chemical toxicity using Graph Neural Networks (GNN) on molecular structure representations.",
      difficulty: "Advanced",
      category: "recommended",
      tags: ["GNN", "Bioinformatics", "Python", "React"],
      rating: 4.94,
      author: "BioML Discovery",
      updatedAt: "2026-07-23"
    }
  ]
};

// Generic generator for other domains if catalog entries are dynamically built
export function getProjectsForDomain(domainId: string): Project[] {
  // Check if we have explicit catalog entries for this domain
  const catalog = DOMAIN_PROJECT_CATALOG[domainId] || [];
  
  // Find domain info
  const domainInfo = DOMAINS_DATA.find((d) => d.id === domainId) || {
    id: domainId,
    name: domainId.toUpperCase(),
    totalProjects: 20
  };

  const projects: Project[] = [];

  // Add existing hardcoded featured projects from PROJECTS_DATA
  const featured = PROJECTS_DATA.filter((p) => p.domainId === domainId);
  featured.forEach((p) => projects.push(p));

  // If catalog entries exist, merge non-duplicates
  catalog.forEach((catItem) => {
    if (!projects.some((p) => p.id === catItem.id || p.name === catItem.name)) {
      projects.push(buildProjectFromCatalogItem(domainId, domainInfo.name, catItem));
    }
  });

  // Ensure minimum 20 projects per domain by synthesizing realistic projects if under 20
  let idx = projects.length + 1;
  while (projects.length < 20) {
    projects.push(generateSynthesizedProject(domainId, domainInfo.name, idx));
    idx++;
  }

  return projects;
}

function buildProjectFromCatalogItem(
  domainId: string,
  domainName: string,
  item: {
    id: string;
    name: string;
    shortDescription: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    category: "existing" | "trending" | "recent" | "recommended";
    tags: string[];
    rating: number;
    author: string;
    updatedAt: string;
  }
): Project {
  return {
    id: item.id,
    domainId,
    name: item.name,
    shortDescription: item.shortDescription,
    difficulty: item.difficulty,
    category: item.category,
    tags: item.tags,
    rating: item.rating,
    author: item.author,
    updatedAt: item.updatedAt,
    documentation: {
      overview: `The ${item.name} is a modern ${domainName} solution engineered for real-world deployment, academic research, and system optimization. It provides a complete end-to-end framework combining interactive front-end dashboards, scalable backend API microservices, and robust data storage layers.`,
      problemStatement: `Current setups in ${domainName} suffer from inefficient manual processing, lack of real-time monitoring, high operational costs, and poor cross-platform integration.`,
      objective: `To design, implement, and validate a production-ready ${domainName} platform that automates core operational workflows, delivers actionable analytics, and enhances decision-making accuracy.`,
      existingSystem: `Traditional ${domainName} workflows rely on legacy desktop software, non-standardized spreadsheet tracking, manual intervention, and siloed data stores with high human error rates.`,
      proposedSystem: `An integrated full-stack architecture featuring web-based telemetry, automated AI diagnostics, secure role-based authentication, and instant PDF audit documentation export.`,
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS v4", "Lucide React Icons", "Motion Animation"],
        backend: ["Node.js", "Express.js REST API", "TypeScript"],
        aiServices: ["Google Gemini 3.6 Flash Engine", "Domain AI Pipeline"],
        database: ["MongoDB / PostgreSQL Schema", "IndexedDB Cache"],
        authentication: ["JWT Session Auth", "OAuth 2.0 Integration"],
        deployment: ["Docker Containerization", "Google Cloud Run / AWS"]
      },
      architecture: `Client React App <---> Express API Gateway <---> AI & Analytical Core Services <---> Database Store.`,
      architectureDiagramDesc: `User Interface -> API Gateway Middleware -> Domain Service Layer -> Persistent Storage & Audit Log.`,
      workflow: `1. User authenticates into the secure dashboard.\n2. System ingests domain data or sensor inputs.\n3. Processing engine runs automated analysis and AI scoring.\n4. Visual charts and structured documentation are updated in real-time.\n5. User can export reports or interact via AI Chatbot guidance.`,
      workflowSteps: [
        "User Access & Authorization",
        "Data Ingestion & Pre-processing",
        "Automated Core Analysis & AI Scoring",
        "Interactive Visualization & Analytics Rendering",
        "Documentation & Audit Export"
      ],
      modules: [
        {
          id: "m1",
          name: "Dashboard & Analytics Core",
          description: `Provides real-time visualization of key ${domainName} metrics, status indicators, and activity logs.`,
          keyFunctions: ["Live metrics visualization", "Status alerts", "Filterable reporting"]
        },
        {
          id: "m2",
          name: "Automated Processing Engine",
          description: `Executes core computational algorithms and domain logic in the background.`,
          keyFunctions: ["Data transformation", "Rule evaluation", "Anomaly flagging"]
        },
        {
          id: "m3",
          name: "Documentation & Report Exporter",
          description: `Compiles data into formal academic and enterprise project reports with one-click PDF generation.`,
          keyFunctions: ["PDF generation", "Markdown text copying", "Print layout styling"]
        }
      ],
      features: [
        `Interactive ${domainName} Operations Dashboard`,
        "Automated 15-Section Academic Documentation Generator",
        "Real-Time Gemini AI Chatbot Support & QA",
        "Exportable PDF Reports & Copyable Markdown Snippets",
        "Responsive Mobile & Desktop Layout"
      ],
      advantages: [
        `Dramatically improves efficiency and accuracy in ${domainName} tasks.`,
        "Reduces operational overhead and time-to-insight from hours to seconds.",
        "Modular architecture allows seamless expansion for enterprise scale."
      ],
      limitations: [
        "Requires active network connectivity for cloud AI processing.",
        "Hardware sensor integration requires specific hardware interface drivers."
      ],
      futureScope: [
        "Integration with native mobile apps (iOS & Android).",
        "Advanced predictive analytics using localized edge AI models."
      ],
      conclusion: `The ${item.name} offers a reliable, modern, and highly effective framework for advancing research and practical applications in ${domainName}.`,
      systemRequirements: {
        hardware: ["Dual-Core CPU (2.0 GHz+)", "4 GB RAM minimum", "100 MB disk space"],
        software: ["Node.js v18.0+", "Modern Browser (Chrome, Firefox, Safari, Edge)", "Docker Engine v24.0+"]
      }
    }
  };
}

function generateSynthesizedProject(domainId: string, domainName: string, index: number): Project {
  const titlesByDomain: Record<string, string[]> = {
    web: [
      "Real-Time Collaborative Document Editor", "Full-Stack E-Commerce Microservices Engine", "Interactive Developer Portfolio Generator",
      "Enterprise Kanban Task Workspace", "Real-Time WebRTC Video Lounge", "Online Browser Code Playground", "SaaS Billing & Subscription Portal",
      "Multi-Vendor Event Ticketing System", "Real-Time Web Analytics Dashboard", "Headless CMS & Content API", "Online Examination & Quiz Portal",
      "Community Forum & Discussion Hub", "Recipe Sharing & Meal Planning Platform", "Real-Time Live Bidding Engine", "Virtual Learning Management System",
      "Job Portal & Resume Screener", "Freelance Marketplace & Escrow Portal", "Crowdfunding & Backer Campaign Platform", "Property Rental Management Web App",
      "Audio Streaming & Playlist Player"
    ],
    mobile: [
      "React Native AI Personal Fitness Coach", "Cross-Platform Expense & Budget Manager", "Offline-First Mobile Notes Knowledge Graph",
      "Real-Time Fleet & Vehicle GPS Tracker", "Mobile Food Delivery Driver Tracking App", "Smartphone Smart Home Remote Controller",
      "Mobile Language Learning Audio App", "Telemedicine Doctor Appointment Booking App", "Mobile QR & Product Barcode Inspector",
      "Mobile Meditation & Habit Streak Tracker", "Mobile Campus Map & Event Guide App", "Peer-to-Peer Digital Wallet Payment App",
      "AR Mobile Furniture Designer", "Keyless Car Rental Unlock Mobile App", "Emergency SOS Panic Broadcast System", "Mobile Garden Care & Plant Reminder App",
      "Pet Adoption Directory App", "Live Transit Bus Tracking Application", "Podcast Downloader & Player App", "Smart Inventory Warehouse Mobile Scanner"
    ],
    cloud: [
      "Multi-Region Serverless REST API Gateway", "Kubernetes Auto-Scaling Cluster Orchestrator", "Automated CI/CD Pipeline Deployment Tool",
      "Distributed Storage with Multi-Tier Cache", "Cloud Infrastructure Cost Optimization Scanner", "Zero-Downtime Blue-Green Deployment System",
      "Multi-Cloud Disaster Recovery Pipeline", "Serverless Video Transcoding Service", "Centralized Cloud Log Aggregator & Alerting",
      "Service Mesh Istio Traffic Manager", "Edge Cloud CDN Cache Management System", "Terraform Infrastructure-as-Code Inspector",
      "Serverless Event-Driven Image Pipeline", "Cloud IAM Security Policy Auditor", "Containerized Load Balancer Probe Dashboard",
      "Cloud Database Migration & Sync Utility", "Serverless Webhook Relay & Queue Processor", "Cloud Compliance Security Scanner",
      "Multi-Tenant Database Proxy Gateway", "In-Memory Cache Cluster Management Tool"
    ],
    security: [
      "AI Cyber Threat Detector & Vulnerability Engine", "Automated WAF & Rate Limiting Security Gateway", "Network Intrusion Detection System (NIDS)",
      "Zero-Trust Multi-Factor Authentication Portal", "End-to-End Encrypted File Vault", "Vulnerability Penetration Testing Suite",
      "Honeypot System for Bot Threat Logging", "Password Manager with Breach Alerts", "Automated Ransomware Behavior Detector",
      "Malware Signature Sandbox Scanner", "Security Event Information Manager (SIEM)", "DNS Spoofing & Poisoning Shield",
      "Cryptographic HSM Key Management Portal", "Rogue Wireless Access Point Detector", "OWASP Security Compliance Auditor",
      "Phishing Email Detection Engine", "Blockchain Identity Attestation System", "Cloud DLP Data Leakage Scanner",
      "DDoS Traffic Scrubbing & Mitigation Gateway", "Static Code Dependency Security Auditor"
    ],
    iot: [
      "IoT Smart City Traffic & Mobility Manager", "Smart Agriculture Soil Telemetry Hub", "Industrial Machinery Vibration & Heat Monitor",
      "Smart Home Automation MQTT Gateway", "IoT Environmental Air Quality Telemetry Node", "Smart Water Leakage & Tank Level Detector",
      "IoT Cold-Chain Vaccine Temperature Monitor", "Smart Parking Guidance System", "IoT Solar Panel Power Output Monitor",
      "Smart Motion-Sensing Street Light Controller", "Wearable Patient Heart Rate & Fall Alert", "Smart Waste Bin Route Optimizer",
      "IoT Livestock Asset Geofencing Collar", "Smart Building HVAC Energy Controller", "IoT Water Quality pH Telemetry Node",
      "Smart Appliance Remote Power Meter", "IoT RFID Warehouse Inventory Tracker", "Smart Fire & Gas Leak Alarm System",
      "IoT Drone Flight Telemetry Monitor", "Smart Greenhouse Automated Microclimate Node"
    ],
    datascience: [
      "Customer Lifetime Value (CLV) Predictor", "Global Disease Outbreak Visualization Engine", "Retail Demand Forecasting & Inventory Optimizer",
      "Social Media Brand Sentiment Dashboard", "Financial Transaction Fraud Anomaly Inspector", "Real Estate Price Geospatial Analytics Engine",
      "E-Commerce Product Basket Association Miner", "Carbon Footprint & Climate Change Visualizer", "Public Transit Commuter Density Optimizer",
      "Sports Performance Scouting Analytics Hub", "Movie Box-Office Revenue Prediction Model", "Energy Grid Load Consumption Forecaster",
      "Stock Market Volatility Portfolio Risk Optimizer", "Patient Hospital Readmission Risk Analyzer", "Air Quality Atmospheric Pollution Predictor",
      "User Engagement Churn Funnel Analyzer", "Student Academic Dropout Risk Predictor", "Supply Chain Lead-Time Bottleneck Portal",
      "Job Market Skill Demand & Salary Inspector", "Music Popularity & Audio Feature Classifier"
    ],
    blockchain: [
      "Decentralized Pharmaceutical Supply Chain Tracker", "Ethereum Automated Market Maker (AMM) DEX", "Cross-Border P2P Crypto Remittance Portal",
      "NFT Digital Art Marketplace & Royalties Engine", "Decentralized Academic Credential Verifier", "DAO Governance Voting & Treasury Portal",
      "Blockchain Real Estate Property Tokenization", "Decentralized Insurance Claim Settlement System", "Microfinance Collateralized Lending Protocol",
      "Decentralized Energy Trading Smart Grid", "Zero-Knowledge Identity Verification System", "Decentralized Cloud File Storage Network",
      "Music Royalty Distribution Smart Contract", "Immutable Digital Ballot Voting Engine", "Blockchain Carbon Credit Offset Register",
      "Web3 Decentralized Domain Name Service", "Cross-Chain Asset Bridge Protocol", "Freelance Job Board with Escrow Contracts",
      "Food Safety Supply Chain Provenance Tracker", "Decentralized Gaming Asset Standard Bridge"
    ],
    arvr: [
      "WebXR Virtual Science Laboratory", "AR Furniture Interior Placement Tool", "VR Flight Training Simulator",
      "AR Medical Surgical Planning Assistant", "VR Historic Museum Walkthrough", "AR Smart Infrastructure Field Guide",
      "VR Public Speaking Stage Fear Trainer", "AR Language Translation Sign Scanner", "VR Fire Emergency Evacuation Drill",
      "AR 3D Real Estate Property Explorer", "VR Space Exploration Solar Simulator", "AR Industrial Repair & Assembly Assistant",
      "VR Mindfulness Spatial Meditation Chamber", "AR Indoor Wayfinding Navigation Guide", "VR Physics Mechanics Sandbox",
      "AR E-Commerce Virtual Try-On Studio", "VR Driving Hazard Awareness Trainer", "AR Interactive Children 3D Storybook",
      "VR Collaborative Remote Brainstorming Board", "AR Historical Battle Reconstruction Explorer"
    ],
    robotics: [
      "Autonomous Mobile Robot Indoor Navigation", "Robotic Arm Kinematic Pick-and-Place Simulator", "ROS Drone Obstacle Avoidance Planner",
      "Vision-Guided Conveyor Sorting System", "Inverted Pendulum Self-Balancing Controller", "Autonomous Vacuum Robot Floor Mapper",
      "ROS Humanoid Bipedal Gait Simulator", "Agricultural Weed Removal Robotic Arm", "Pipeline Integrity Crawling Inspection Robot",
      "Swarm Robotics Search & Rescue System", "Haptic Teleoperation Controller for Surgical Robots", "Robotic Lawn Mower Boundary Guard",
      "ROS Autonomous Warehouse Forklift Lifter", "AI Soft Gripper Delicate Object Handler", "Underwater ROV Sonar Navigation Engine",
      "Robotic Wall-Climbing Inspection Crawler", "Quadruped Robot Terrain Adaptation Engine", "Swarm MAV Aerial Formation Controller",
      "Waterway River Cleanup Robotic Boat", "Firefighting Robot with Thermal Camera Guidance"
    ],
    healthcare: [
      "AI Radiology Medical Diagnostic Portal", "Telemedicine Patient Consultation Hub", "EHR System with HL7 FHIR Standards",
      "Prescription Interaction & Allergy Auditor", "Diabetes Blood Glucose Forecasting Model", "Mental Health Mood Analytics Portal",
      "ECG Arrhythmia Deep Learning Classifier", "ICU Bed Allocation Triage Predictor", "Pediatric Growth & Vaccine Tracking System",
      "Hospital Pharmacy Stock & Drug Tracker", "Brain Tumor MRI Image Segmentation Model", "Remote Cardiac Telemetry Monitor",
      "AI Symptom Checker Triage Consultant", "Rehabilitation Physical Therapy Pose Tracker", "Health Insurance Claim Fraud Detector",
      "Cancer Biomarker Survival Rate Analyzer", "Elder Care Emergency Fall Alert System", "Blood Bank Supply Forecaster",
      "Clinical Trial Participant Matcher", "Hospital Sanitation & Noise Dashboard"
    ],
    agriculture: [
      "AI Crop Health & Soil Analytics Hub", "Precision Irrigation Soil Sensor Network", "Satellite-Based Crop Yield Forecast Engine",
      "Greenhouse Climate Automation System", "Agricultural Drone Spraying Route Planner", "Livestock Telemetry & Estrus Detector",
      "Soil NPK Nutrient Deficiency Diagnostic", "Cold Storage Temperature Preservation Tracker", "Solar-Powered Smart Pest Population Sensor",
      "Hydroponics Automated Dosing Controller", "Farmer-to-Market Direct Produce Marketplace", "Fruit Ripeness Computer Vision Classifier",
      "Grain Silo Moisture Early Warning Sensor", "Farm Machinery Fleet Maintenance Tracker", "Organic Agriculture Certification Log",
      "Extreme Weather Alert System for Farmers", "Fish Farm Water Quality Telemetry Node", "Automated Weed Spot-Spraying System",
      "Beehive Health & Acoustic Swarm Predictor", "Forest Fire Early Warning Sensor Node"
    ],
    education: [
      "Adaptive AI Exam Prep & Learning Portal", "Automated Essay Scoring & Feedback Engine", "Virtual Classroom WebRTC Video LMS",
      "Student Skill Roadmap & Gap Analyzer", "Gamified Interactive Science Flashcard Quiz", "Facial Recognition Attendance Management",
      "Plagiarism Detector with Attribution Analysis", "Special Needs Speech & Literacy Assistant", "Campus Event & Student Club Hub",
      "Interactive Code Compiler & Live Tutor", "Alumni Mentorship Matcher Portal", "Student Stress & Wellbeing Tracker",
      "Automated Timetable Schedule Resolver", "School Bus Live GPS Parent Tracking System", "Digital University Library Reservation App",
      "Career Path Guidance & Skill Advisor", "Virtual Science Lab Simulation Engine", "Micro-Credential Digital Badge Issuer",
      "Parent-Teacher Communication Portal", "Peer Tutoring Session Scheduler"
    ],
    finance: [
      "Real-Time Stock Portfolio Optimizer", "Credit Card Fraud Anomaly Detection Engine", "AI Robo-Advisor Investment Platform",
      "Corporate Expense Receipt OCR Scanner", "Credit Scoring Model with Alternative Data", "High-Frequency Algorithmic Trading Simulator",
      "P2P Micro-Lending Risk Portal", "Crypto Defi Yield Aggregator", "Automated Loan Underwriting Portal",
      "Financial News Sentiment Stock Predictor", "Personal Budget Automated Categorizer", "Corporate Tax Deductible Audit Tool",
      "Forex Currency Rate Forecast Model", "Insurance Risk Rating Engine", "Bank ATM Cash Replenishment Optimizer",
      "Anti-Money Laundering (AML) Monitor", "Pension Retirement Savings Calculator", "Commercial Mortgage Approval Portal",
      "Invoice Cash Flow Forecasting Engine", "VC Deal Flow Portfolio Performance Tracker"
    ],
    ecommerce: [
      "AI E-Commerce Visual Search Engine", "Multi-Vendor Marketplace & Escrow Hub", "Dynamic Price Competitor Optimizer",
      "Real-Time Inventory Warehouse Manager", "Cart Abandonment Recovery Nudge System", "Customer Review Fake Review Detector",
      "Visual Outfit Try-On Style Matcher", "Automated Return & Refund Portal", "Cross-Border Tax & Duty Calculator",
      "Live Stream Video Shopping Portal", "Subscription Box Delivery Scheduler", "B2B Wholesale Bulk Purchase Portal",
      "Shipping Carrier Logistics Aggregator", "Loyalty Rewards Digital Stamp System", "Dynamic Promo Code Campaign Manager",
      "Personalized Item Recommendation Engine", "AR 3D Product Inspector", "Affiliate Payout Network Portal",
      "Flash Sale Concurrency Queue Handler", "Gift Card & Voucher Manager"
    ],
    smartcity: [
      "IoT Smart City Traffic Management Center", "Electric Vehicle Charging Station Finder", "Municipal Waste Route Optimizer",
      "Smart Energy Grid Microgrid Balancer", "Urban Air Quality Sensor Network", "Water Distribution Leak Detector",
      "Public Transit Real-Time GPS Telemetry", "Smart Street Light Dimming Controller", "Urban Flood Warning Drainage System",
      "Citizen Grievance Redressal Portal", "Smart Parking Meter Billing Engine", "Disaster Evacuation Shelter Allocator",
      "Public Safety Anomaly Detection Hub", "Municipal Solar Panel Output Dashboard", "Urban Tree Canopy Sensor Network",
      "Water Reservoir Quality Monitor", "Public Library Digital Access Network", "Bridge Structural Integrity Monitor",
      "Pedestrian Foot-Traffic Safety Inspector", "Municipal Construction Permit Tracker"
    ],
    socialmedia: [
      "Real-Time Community Chat Lounge", "AI Content Moderation Toxicity Gateway", "Social Brand Sentiment Feed",
      "Influencer Campaign Engagement Calculator", "Short-Form Video Sharing Platform", "Decentralized Sovereign Social Network",
      "Social Media Viral Trend Predictor", "Creator Tipping & Subscription Engine", "Event Discovery & Meetup Organizer",
      "Anonymous Student Support Forum", "Gamified Social Fitness Challenge App", "Audio Podcast Social Lounge",
      "Social Knowledge Sharing Q&A Portal", "Collaborative Music Listening Room", "Social Travel Itinerary Matcher",
      "Micro-Community Hobby Guild Platform", "Social Book Club Discussion App", "Live Audience Poll Voting Engine",
      "Social Gaming Squad Matchmaker", "Digital Magazine Content Sharing App"
    ],
    gaming: [
      "HTML5 Canvas 2D Space Shooter Engine", "AI Enemy Pathfinding Behavior Simulator", "WebGL 3D Dungeon Crawler",
      "Real-Time Chess Engine with Elo Ranking", "Browser RPG Inventory Game System", "Esports Tournament Bracket Generator",
      "Physics Puzzle Game Engine with Editor", "In-Game Virtual Currency Marketplace", "Real-Time Strategy Command Simulator",
      "Game Anti-Cheat Detection Sandbox", "VR WebXR Archery Simulator", "Musical Rhythm Beat Matcher",
      "Card Battle Deck Builder Engine", "Retro Arcade Emulator Leaderboard", "Idle Tycoon Resource Game Engine",
      "Car Racing Simulator Physics Engine", "Trivia Arcade Tournament Engine", "Multiplayer WebSockets Board Arena",
      "Stealth Action Line-of-Sight AI", "Virtual Pet Evolution Simulator"
    ],
    autonomous: [
      "Autonomous Vehicle Path Planner", "Drone Swarm Mission Coordinator", "LiDAR Point Cloud Segmentation Engine",
      "Autonomous Tractor Field Navigation", "Unmanned Underwater Vehicle Mapper", "Drone Delivery Drop-Zone Validator",
      "Airport Baggage Handler Fleet System", "Sensor Fusion GPS-Denied Navigation", "Warehouse Autonomous Traffic Controller",
      "Automated Marine Harbor Docking System", "Pipeline Inspection Drone Telemetry", "Deep RL Highway Lane-Change Engine",
      "Firefighting Drone Swarm Coordinator", "Solar Ocean Glider Tracking System", "Mining Truck Tele-Operation System",
      "Micro-Drone Thermal Rescue System", "Autonomous Train Emergency Inspector", "Planetary Rover Rock Classifier",
      "Electric Bus Precision Docking System", "Aerial Refueling Simulation Controller"
    ]
  };

  const domainTitles = titlesByDomain[domainId] || [
    `AI ${domainName} Analytics Suite`,
    `Smart ${domainName} Telemetry Hub`,
    `Decentralized ${domainName} Audit Portal`,
    `Automated ${domainName} Workflow Engine`,
    `Real-Time ${domainName} Operations Dashboard`,
    `Cloud-Native ${domainName} Microservice Platform`,
    `Predictive ${domainName} Intelligence Model`,
    `Mobile ${domainName} Companion App`,
    `Enterprise ${domainName} Management Portal`,
    `IoT Sensor Network for ${domainName}`,
    `Cyber Security Inspector for ${domainName}`,
    `Data Visualization Suite for ${domainName}`,
    `Robotic Controller for ${domainName}`,
    `Adaptive Learning Engine for ${domainName}`,
    `Financial Risk Evaluator for ${domainName}`,
    `E-Commerce Personalizer for ${domainName}`,
    `Smart City Infrastructure for ${domainName}`,
    `Community Portal for ${domainName}`,
    `Interactive Simulation Engine for ${domainName}`,
    `Autonomous Navigation Controller for ${domainName}`
  ];

  const name = domainTitles[(index - 1) % domainTitles.length] || `${domainName} Project #${index}`;
  const difficulties: Array<"Beginner" | "Intermediate" | "Advanced"> = ["Beginner", "Intermediate", "Advanced"];
  const categories: Array<"existing" | "trending" | "recent" | "recommended"> = ["trending", "recommended", "recent", "existing"];
  
  const difficulty = difficulties[(index - 1) % difficulties.length];
  const category = categories[(index - 1) % categories.length];

  return {
    id: `${domainId}-synth-${index}`,
    domainId,
    name,
    shortDescription: `A production-ready ${domainName} system designed to solve complex operational challenges, optimize workflows, and provide full 15-section academic documentation.`,
    difficulty,
    category,
    tags: [domainName, "React 19", "Express", "Node.js", "Gemini AI"],
    rating: Number((4.7 + (index % 3) * 0.1).toFixed(2)),
    author: `${domainName} Research Lab`,
    updatedAt: `2026-07-${10 + (index % 15)}`,
    documentation: {
      overview: `The ${name} is an advanced engineering solution built for the ${domainName} domain. It provides scalable system architecture, automated diagnostics, interactive dashboards, and complete documentation for academic project submissions and production deployment.`,
      problemStatement: `Organizations operating within ${domainName} frequently face manual delays, fragmented data logging, high operational costs, and insufficient real-time analytical insights.`,
      objective: `To create an integrated end-to-end ${domainName} platform that streamlines core processes, improves diagnostic accuracy, and enables seamless data sharing and AI-driven decision support.`,
      existingSystem: `Legacy systems in ${domainName} heavily rely on manual record keeping, outdated desktop software, offline spreadsheets, and unintegrated hardware nodes leading to frequent data loss and processing bottlenecks.`,
      proposedSystem: `A modern, responsive full-stack platform featuring live telemetry monitoring, automated Gemini AI analysis, copyable documentation, and exportable PDF audit reports.`,
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS v4", "Lucide React Icons", "Motion"],
        backend: ["Node.js", "Express.js REST APIs", "TypeScript"],
        aiServices: ["Google Gemini 3.6 Flash Engine", "Domain Intelligence"],
        database: ["MongoDB / PostgreSQL", "IndexedDB Client Cache"],
        authentication: ["JWT Token Auth", "Google OAuth 2.0"],
        deployment: ["Docker Containerization", "Google Cloud Run / AWS"]
      },
      architecture: `React Client App <---> Express API Service <---> Gemini AI Engine <---> Database Store.`,
      architectureDiagramDesc: `User Dashboard -> API Router -> Analytical Pipeline -> Persistent Records Store.`,
      workflow: `1. User accesses the workspace and configures input parameters.\n2. Server processes requests and invokes automated AI algorithms.\n3. Output metrics and documentation are dynamically updated.\n4. User can inspect interactive charts, chat with AI, or export complete PDF reports.`,
      workflowSteps: [
        "Workspace Registration & Setup",
        "Data & Parameter Input Processing",
        "AI Diagnostic & Scoring Execution",
        "Analytics & Dashboard Rendering",
        "Documentation & Audit PDF Export"
      ],
      modules: [
        {
          id: "m1",
          name: "Operations Dashboard",
          description: `Renders real-time metrics, status feeds, and domain data for ${domainName}.`,
          keyFunctions: ["Metrics rendering", "Live status checks", "Alert triggers"]
        },
        {
          id: "m2",
          name: "AI Diagnostic Engine",
          description: "Executes automated analysis and generates actionable strategic recommendations.",
          keyFunctions: ["Data evaluation", "AI scoring", "Risk flagging"]
        },
        {
          id: "m3",
          name: "Report & Export Module",
          description: "Formats complete 15-section academic documentations with one-click PDF generation.",
          keyFunctions: ["PDF generation", "Markdown snippet copying", "Print layout"]
        }
      ],
      features: [
        `Real-Time ${domainName} Monitoring & Analytics`,
        "Complete 15-Section Formal Documentation Suite",
        "Interactive Gemini AI Chatbot Assistance",
        "One-Click PDF Report Export & Code Copying",
        "Responsive Desktop & Mobile User Interface"
      ],
      advantages: [
        `Significantly improves operational speed and reliability in ${domainName}.`,
        "Provides structured, academic-grade project documentation.",
        "Scalable modular design easily adapts to custom enterprise requirements."
      ],
      limitations: [
        "Requires active internet connection for cloud AI features.",
        "Specific hardware sensors require appropriate hardware connection modules."
      ],
      futureScope: [
        "Expansion to cross-platform mobile native applications.",
        "Integration with real-time WebSocket telemetry channels."
      ],
      conclusion: `The ${name} establishes a strong foundation for innovative development and research in the ${domainName} domain.`,
      systemRequirements: {
        hardware: ["Dual-Core Processor (2.0 GHz+)", "4 GB RAM", "100 MB available storage"],
        software: ["Node.js v18.0+", "Modern Browser (Chrome, Safari, Firefox)", "Docker (optional)"]
      }
    }
  };
}
