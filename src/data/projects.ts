import { Project } from "../types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "ai-startup-mentor",
    domainId: "ai",
    name: "AI Startup Mentor & Incubator Assistant",
    shortDescription: "An AI-powered advisory ecosystem providing real-time startup valuation, pitch deck feedback, go-to-market strategies, and automated competitor analysis.",
    difficulty: "Advanced",
    category: "trending",
    tags: ["Generative AI", "Gemini API", "React", "Express", "Node.js", "MongoDB"],
    rating: 4.9,
    author: "AI Hub Team",
    updatedAt: "2026-07-20",
    documentation: {
      overview: "The AI Startup Mentor & Incubator Assistant is an enterprise-grade artificial intelligence platform designed to support early-stage entrepreneurs, incubators, and student startup founders. By synthesizing generative LLMs with financial modeling heuristics, market intelligence web search grounding, and competitive research, the system functions as a 24/7 Virtual Chief Strategy Officer (CSO). Founders can input business concepts, draft pitch decks, target market sizes (TAM/SAM/SOM), and unit economics to receive instant, multi-perspective strategic feedback.",
      problemStatement: "Over 90% of early-stage startups fail within their first three years due to lack of market need, unviable unit economics, ineffective go-to-market strategy, or inadequate mentor guidance. Human incubators and venture advisors are prohibitively expensive or inaccessible to student founders and solo entrepreneurs. Existing static business plan templates fail to adapt to dynamic market realities and lack actionable, customized feedback.",
      objective: "To democratize high-tier startup advisory by providing an intelligent, interactive, and data-backed AI ecosystem that guides founders through concept validation, lean business modeling, pitch deck optimization, competitive intelligence gathering, and investor readiness scoring.",
      existingSystem: "Traditional startup guidance relies on static PDF templates, fragmented online blogs, intermittent incubation cohort office hours, or expensive freelance consultants ($150–$500/hour). Existing automated software provides generic fill-in-the-blank forms without dynamic critical analysis, financial projection validation, or customized risk mitigation strategies.",
      proposedSystem: "The proposed AI Startup Mentor leverages advanced Gemini models to ingest startup parameters and perform deep holistic evaluation across 12 strategic dimensions. The platform incorporates multi-agent reasoning to critique value propositions, challenge pricing assumptions, generate competitive landscape matrices, simulate investor Q&A interviews, and construct ready-to-present pitch deck outlines with high-fidelity financial projections.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS v4", "Lucide React Icons", "Motion (Framer Motion)"],
        backend: ["Node.js", "Express.js", "TypeScript", "RESTful API Architecture"],
        aiServices: ["Google Gemini 3.6 Flash", "Google Search Grounding", "@google/genai SDK"],
        database: ["MongoDB / Mongoose Schema", "IndexedDB Client Local Persistence"],
        authentication: ["JWT Authentication", "Google OAuth 2.0 Integration"],
        deployment: ["Docker Containerization", "Google Cloud Run Platform"]
      },
      architecture: "The architecture follows a decoupled Client-Server Micro-Monolith design. The React single-page frontend communicates with an Express.js API gateway via JSON over HTTPS. Server-side API endpoints proxy requests to the Google Gemini API with system instructions, grounding contexts, and safety guards. Business data and generated startup roadmaps are persisted in MongoDB with JWT session controls.",
      architectureDiagramDesc: "Frontend React UI <---> HTTPS REST API (Express Server) <---> Gemini 3.6 Flash Engine <---> MongoDB Data Store & Google Search Grounding.",
      workflow: "1. User registers/logs in and creates a new Startup Workspace.\n2. User fills out the multi-step Business Canvas Questionnaire (Idea, Target Audience, Revenue Model, Tech Stack, Traction).\n3. Express backend compiles the inputs into an enriched prompt context.\n4. Gemini 3.6 Flash generates a comprehensive evaluation across Market Feasibility, Unit Economics, Competitive Threats, and Go-To-Market Execution.\n5. User explores interactive recommendations, runs Investor Q&A Simulations, and copies structured pitch deck documentation sections.",
      workflowSteps: [
        "User Registration & Profile Setup",
        "Business Concept & Canvas Data Input",
        "AI Diagnostic Ingestion & Prompt Synthesis",
        "Multi-Dimensional Startup Scoring & Risk Evaluation",
        "Interactive Investor Q&A Simulation & Document Export"
      ],
      modules: [
        {
          id: "m1",
          name: "Idea Validator & TAM Estimator",
          description: "Analyzes value proposition uniqueness and estimates Total Addressable Market size using search-grounded market metrics.",
          keyFunctions: ["Market size calculation", "Niche evaluation", "Uniqueness index scoring"]
        },
        {
          id: "m2",
          name: "Financial Model & Pitch Deck Builder",
          description: "Generates 3-year revenue projections, burn rate estimates, CAC/LTV calculations, and 10-slide pitch outlines.",
          keyFunctions: ["Unit economics forecasting", "Slide outline generator", "Financial risk flags"]
        },
        {
          id: "m3",
          name: "Competitor Intelligence Matrix",
          description: "Searches the web to construct SWOT analyses and matrix comparisons against existing industry players.",
          keyFunctions: ["SWOT generator", "Direct competitor listing", "Moat analysis"]
        },
        {
          id: "m4",
          name: "Interactive AI Pitch Simulator",
          description: "Simulates aggressive venture capitalist grilling with real-time speech/text feedback on founder answers.",
          keyFunctions: ["VC Q&A generation", "Confidence scoring", "Objection handling coaching"]
        }
      ],
      features: [
        "Real-Time Concept Feasibility Scoring (0-100 scale)",
        "Automated 10-Slide Investor Pitch Deck Blueprint",
        "Interactive VC Mock Interview Chat Simulator",
        "Search-Grounded Competitor & Market Size Analysis",
        "One-Click Copying of Executive Summaries and Financial Forecasts",
        "Complete 12-15 Page Formal Business Plan Exporter"
      ],
      advantages: [
        "Instant strategic feedback available 24/7 at a fraction of human consulting cost.",
        "Deeply customized analysis tailored specifically to the user's target domain.",
        "Reduces time-to-market for early-stage founders from months to days.",
        "Provides objective, data-backed criticism before approaching real investors."
      ],
      limitations: [
        "Financial projections are based on probabilistic AI models and require human accounting audit.",
        "Requires active internet connection to access real-time web search grounding.",
        "Cannot replace human relationship-building required for equity closing."
      ],
      futureScope: [
        "Integration with Stripe Billing for live subscription payment processing.",
        "Direct legal entity formation document auto-generation.",
        "Investor Matching Engine connecting founders with active seed funds.",
        "Multi-language support for international startup ecosystems."
      ],
      conclusion: "The AI Startup Mentor & Incubator Assistant fills a critical gap in early-stage founder education. By combining generative AI, real-time web research, and structured startup frameworks, it empowers the next generation of innovators to turn visionary ideas into sustainable, venture-ready businesses.",
      systemRequirements: {
        hardware: ["Dual-Core Processor (2.0 GHz+)", "4 GB RAM minimum", "100 MB available disk storage"],
        software: ["Node.js v18.0+", "Modern web browser (Chrome, Firefox, Safari, Edge)", "Docker Engine v24.0+ (optional)"]
      }
    }
  },
  {
    id: "medical-diagnostic-ai",
    domainId: "healthcare",
    name: "AI Radiology & Medical Diagnostics Portal",
    shortDescription: "A HIPAA-compliant deep learning platform for detecting pulmonary anomalies in X-rays, medical document summarization, and patient report creation.",
    difficulty: "Advanced",
    category: "recommended",
    tags: ["Computer Vision", "Healthcare AI", "Python", "React", "FastAPI", "TensorFlow"],
    rating: 4.95,
    author: "HealthTech Lab",
    updatedAt: "2026-07-22",
    documentation: {
      overview: "The AI Radiology & Medical Diagnostics Portal is a state-of-the-art clinical support platform designed to assist radiologists, clinicians, and medical researchers in analyzing thoracic radiographs, detecting abnormalities (pneumonia, nodules, effusion), and generating structured DICOM diagnostic summaries.",
      problemStatement: "Global healthcare systems face a severe shortage of certified radiologists, leading to diagnostic delays, physician burnout, and increased misdiagnosis rates. Radiologists often spend hours transcribing routine scan reports rather than focusing on urgent critical care cases.",
      objective: "To create an intelligent medical diagnostic assist platform that speeds up chest X-ray screening by 70%, identifies potential pathology regions with high confidence, and auto-generates preliminary medical reports in standard medical terminology.",
      existingSystem: "Conventional radiology workflows rely on manual visual inspection of DICOM images on PACS stations, manual dictated transcription, and legacy RIS databases. High workload volumes cause turnaround delays of 24–48 hours for non-emergency scans.",
      proposedSystem: "An integrated computer vision and natural language AI pipeline that pre-screens chest radiographs upon upload, highlights suspect bounding boxes via Grad-CAM heatmaps, classifies findings, and presents a structured diagnostic report for physician sign-off.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS", "Lucide React", "Canvas DICOM Renderer"],
        backend: ["Python FastAPI", "Express.js Proxy", "PyTorch / TensorFlow"],
        aiServices: ["DenseNet121 Medical Classifier", "Gemini 3.6 Flash for Clinical Summary"],
        database: ["PostgreSQL for Clinical Logs", "MongoDB for Unstructured Reports"],
        authentication: ["OAuth2 / JWT with RBAC", "HIPAA Compliance Encryption"],
        deployment: ["AWS HealthLake", "Docker & Kubernetes"]
      },
      architecture: "Client DICOM Viewer <-> Secure HTTPS Express Gateway <-> Python FastAPI Deep Learning Service <-> Gemini Clinical Report Synthesizer <-> Encrypted Database Store.",
      architectureDiagramDesc: "PACS/DICOM Ingestion -> Convolutional Neural Net Classifier -> Heatmap Overlay Generator -> LLM Report Synthesizer -> Clinician Review Dashboard.",
      workflow: "1. Clinician uploads medical chest X-ray image (DICOM / PNG).\n2. PyTorch ResNet/DenseNet model performs multi-label disease classification.\n3. Grad-CAM generates spatial visual heatmaps.\n4. Gemini LLM ingests quantitative metrics to produce formal SOAP/SBAR medical notes.\n5. Doctor reviews, edits, and signs off on final report.",
      workflowSteps: [
        "Patient Scan DICOM Upload",
        "Deep Learning Feature Extraction & Anomaly Detection",
        "Grad-CAM Heatmap Localization",
        "Automated Structured Report Generation",
        "Physician Verification & Sign-Off"
      ],
      modules: [
        {
          id: "m1",
          name: "Radiograph Pre-processing & Viewer",
          description: "Handles DICOM windowing, contrast adjustment, zoom, and spatial calibration.",
          keyFunctions: ["DICOM parsing", "Contrast windowing", "Metadata extraction"]
        },
        {
          id: "m2",
          name: "Pathology Detection Engine",
          description: "Classifies 14 chest conditions including Pneumothorax, Cardiomegaly, and Atelectasis.",
          keyFunctions: ["Multi-label probability scoring", "Heatmap rendering", "Threshold alert"]
        },
        {
          id: "m3",
          name: "Clinical Report Generator",
          description: "Synthesizes quantitative vision findings into structured medical English narratives.",
          keyFunctions: ["SOAP format formatting", "ICD-10 suggestion", "Printable PDF export"]
        }
      ],
      features: [
        "Multi-Condition Pathology Risk Probability Cards",
        "Interactive Grad-CAM Visual Heatmap Overlays",
        "Automated Clinical SOAP Note Generation",
        "One-Click Copy for Patient Chart Integration",
        "DICOM & High-Res Image Compression Support"
      ],
      advantages: [
        "Dramatically reduces turnaround time for emergency radiograph screening.",
        "Serves as a second reader to reduce human oversight and cognitive fatigue.",
        "Standardizes medical record formats across hospital departments."
      ],
      limitations: [
        "Requires final clinical validation by a licensed physician before medical treatment.",
        "Model performance can vary on rare pediatric or atypical body habitus scans."
      ],
      futureScope: [
        "Expansion to 3D CT and MRI volumetric brain scan analysis.",
        "Integration with EHR platforms (Epic, Cerner) via HL7 FHIR protocols.",
        "Real-time voice-driven clinical dictation integration."
      ],
      conclusion: "The AI Radiology & Medical Diagnostics Portal represents a transformative step toward AI-assisted clinical care, improving diagnostic accuracy and operational efficiency for modern medical institutions.",
      systemRequirements: {
        hardware: ["NVIDIA GPU with 8GB VRAM (Server)", "16 GB RAM", "Core i7 CPU"],
        software: ["Python 3.10+", "PyTorch 2.0+", "FastAPI", "React 19 runtime"]
      }
    }
  },
  {
    id: "smart-city-traffic-iot",
    domainId: "smartcity",
    name: "IoT Smart City Traffic & Mobility Management System",
    shortDescription: "An intelligent urban mobility control center utilizing IoT sensor networks, camera telemetry, and predictive traffic signal optimization.",
    difficulty: "Intermediate",
    category: "recent",
    tags: ["IoT", "Smart City", "MQTT", "React", "Python", "Node.js", "Express"],
    rating: 4.82,
    author: "Urban Mobility Lab",
    updatedAt: "2026-07-18",
    documentation: {
      overview: "The IoT Smart City Traffic System connects edge camera nodes and inductive loop sensors across city intersections to dynamically optimize traffic light timing, prioritize emergency vehicles, and reduce urban gridlock.",
      problemStatement: "Fixed-timer traffic signals cause unnecessary congestion, increased fuel consumption, elevated carbon emissions, and delayed emergency response vehicles (ambulances, fire engines) in urban centers.",
      objective: "To deploy an adaptive, sensor-driven traffic control system that dynamically adjusts signal green-time based on real-time vehicle density, reducing average commuter delays by up to 35%.",
      existingSystem: "Conventional pre-timed traffic lights switch intervals based on static time-of-day schedules without accounting for sudden accidents, lane blockages, or rush-hour surges.",
      proposedSystem: "A distributed IoT architecture where smart cameras run YOLO edge detection to count vehicles per lane and stream MQTT telemetry to a central coordinator. Reinforcement learning algorithms adjust signal durations in real time.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS", "Recharts Graphs", "Lucide Icons"],
        backend: ["Node.js / Express.js", "Python MQTT Broker (Mosquitto)"],
        aiServices: ["YOLOv8 Edge Detection", "Gemini 3.6 Flash for Traffic Incident Summaries"],
        database: ["TimescaleDB for Time-Series Sensors", "MongoDB for City Map Nodes"],
        authentication: ["JWT with Role-Based Access Control"],
        deployment: ["AWS IoT Core", "Docker Containers"]
      },
      architecture: "Edge Camera Sensors -> MQTT Broker -> Ingestion Microservice -> Real-Time Signal Optimizer -> Operator React Dashboard.",
      architectureDiagramDesc: "Sensors stream MQTT vehicle counts -> Central Controller recalculates green phases -> Traffic Light Controllers update -> Live Dashboard visualizes grid congestion.",
      workflow: "1. Camera sensors continuously count queued vehicles in intersection approach lanes.\n2. MQTT packets containing lane density values are published every 5 seconds.\n3. The signal optimization algorithm computes optimal green split times.\n4. Emergency vehicle sirens or GPS signals trigger instant green wave override.",
      workflowSteps: [
        "Edge Sensor Vehicle Telemetry Capture",
        "MQTT Protocol Telemetry Transmission",
        "Congestion Index Calculation & Adaptive Signal Scheduling",
        "Emergency Priority Override Execution",
        "City Mobility Analytics Reporting"
      ],
      modules: [
        {
          id: "m1",
          name: "Edge Camera Telemetry Collector",
          description: "Receives raw vehicle count feeds and queue lengths from intersection sensors.",
          keyFunctions: ["MQTT ingestion", "Data validation", "Sensor health check"]
        },
        {
          id: "m2",
          name: "Adaptive Signal Timing Engine",
          description: "Calculates dynamic green light durations based on real-time lane load balances.",
          keyFunctions: ["Phase allocation", "Green wave coordination", "Congestion penalty minimization"]
        },
        {
          id: "m3",
          name: "Emergency Priority Corridor",
          description: "Overrides signal schedules when emergency vehicle beacons are detected.",
          keyFunctions: ["GPS corridor clearance", "Audio siren detection", "Safety delay buffer"]
        }
      ],
      features: [
        "Interactive Real-Time City Traffic Congestion Heatmap",
        "Automated Signal Phase Adjustment Suggestions",
        "Emergency Vehicle Corridor Priority Mode",
        "Emissions & Idle Time Reduction Metrics",
        "Exportable Urban Planning Analytics Reports"
      ],
      advantages: [
        "Significantly decreases urban vehicle idle time and greenhouse gas emissions.",
        "Reduces emergency vehicle response transit times by up to 40%.",
        "Scalable to thousands of intersections via lightweight MQTT messaging."
      ],
      limitations: [
        "Requires reliable hardware deployment and maintenance at physical intersections.",
        "Camera sensors can experience degraded visibility during heavy fog or blizzards."
      ],
      futureScope: [
        "V2X (Vehicle-to-Everything) communication integration for autonomous cars.",
        "AI predictive congestion modeling for multi-day weather and event surges."
      ],
      conclusion: "This Smart City Traffic System provides municipal authorities with a modern, data-driven approach to urban mobility, reducing congestion and saving lives through intelligent signal automation.",
      systemRequirements: {
        hardware: ["Raspberry Pi / Jetson Nano Edge Nodes", "Central Server with 8 Core CPU", "16 GB RAM"],
        software: ["Node.js 18+", "Mosquitto MQTT Broker", "TimescaleDB", "React 19"]
      }
    }
  },
  {
    id: "blockchain-supply-chain",
    domainId: "blockchain",
    name: "Decentralized Pharmaceutical Supply Chain Tracker",
    shortDescription: "A Web3 blockchain platform for verifying drug authenticity, tracking cold-chain temperature metrics, and preventing counterfeit pharmaceuticals.",
    difficulty: "Advanced",
    category: "existing",
    tags: ["Blockchain", "Solidity", "Web3", "Ethereum", "React", "Node.js"],
    rating: 4.78,
    author: "PharmaChain Team",
    updatedAt: "2026-07-15",
    documentation: {
      overview: "The Decentralized Pharmaceutical Supply Chain Tracker leverages Ethereum smart contracts and IoT temperature sensors to provide immutable end-to-end auditability for prescription medications from factory manufacturing to patient dispensing.",
      problemStatement: "Counterfeit drugs cause over 1 million deaths annually and cost the global pharmaceutical industry $200 billion. Legacy supply chains use vulnerable centralized databases prone to record tampering and lack temperature tracking for sensitive vaccines.",
      objective: "To create a transparent, tamper-proof supply chain network where every drug batch is assigned a cryptographically signed NFT/QR code tracking manufacture dates, transit custody, and temperature compliance.",
      existingSystem: "Paper invoices and centralized database logs that can be falsified by bad actors in distributor networks without triggering audit alerts.",
      proposedSystem: "Smart contracts deployed on an Ethereum-compatible network that record custody transfers and automated IoT cold-chain temperature violations directly on-chain.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS", "Ethers.js / Web3.js", "Lucide Icons"],
        backend: ["Node.js", "Express.js REST Gateway", "IPFS Storage"],
        aiServices: ["Gemini 3.6 Flash for Anomaly Audit Summaries"],
        database: ["Ethereum Smart Contracts", "IPFS Metadata Storage"],
        authentication: ["MetaMask / Web3 Wallet Signature", "JWT Enterprise Keys"],
        deployment: ["Polygon / Hardhat Local Testnet", "Docker"]
      },
      architecture: "Smart Contracts (Solidity) <-> IPFS Decentralized Storage <-> Node.js Express Gateway <-> Web3 React Portal.",
      architectureDiagramDesc: "Manufacturer mints batch token -> Carrier scans custody transfer -> IoT sensor logs temperature -> Pharmacist verifies authenticity via QR code scan.",
      workflow: "1. Manufacturer mints batch tracking token on-chain.\n2. Logistics carrier accepts custody via cryptographic wallet signature.\n3. IoT cold-chain sensor streams temperature readings to IPFS and logs anomalies on-chain.\n4. Pharmacy scans barcode to verify origin and chain of custody.",
      workflowSteps: [
        "Batch Token Minting at Manufacturing Plant",
        "Logistics Handshake & Wallet Digital Signatures",
        "IoT Cold-Chain Telemetry Auditing",
        "Pharmacy Verification & QR Code Provenance Check",
        "Patient Consumer Scan for Drug Authenticity"
      ],
      modules: [
        {
          id: "m1",
          name: "Manufacturer Token Minting",
          description: "Generates unique cryptographic batch tokens with embedded serial numbers and manufacturing metadata.",
          keyFunctions: ["ERC-1155 Token Minting", "IPFS Metadata Pinning", "Batch QR Generator"]
        },
        {
          id: "m2",
          name: "Cold-Chain Telemetry Guard",
          description: "Monitors IoT temperature data and flags threshold violations on the smart contract.",
          keyFunctions: ["Temperature threshold check", "Automated quarantine trigger", "Incident log"]
        },
        {
          id: "m3",
          name: "Consumer Authenticity Verification",
          description: "Allows end-users to scan medicine QR codes on mobile browsers to verify legitimacy.",
          keyFunctions: ["QR code decoding", "On-chain record lookup", "Authenticity badge display"]
        }
      ],
      features: [
        "Immutable Provenance History Timeline",
        "Cryptographic Wallet Signature Verification",
        "IoT Cold-Chain Temperature Spike Alerts",
        "Instant Fraud / Counterfeit Batch Quarantine Trigger",
        "Printable QR Code Drug Labels"
      ],
      advantages: [
        "Eliminates counterfeit drugs from entering verified pharmacy networks.",
        "Ensures temperature-sensitive vaccines maintain potency throughout transit.",
        "Provides regulatory agencies with zero-trust audit trails."
      ],
      limitations: [
        "Blockchain transaction gas fees during peak Ethereum network congestion.",
        "Requires hardware QR scanners and smartphone adoption across rural distributors."
      ],
      futureScope: [
        "Integration with Zero-Knowledge proofs (zk-SNARKs) to protect trade secrets.",
        "Cross-chain interoperability between Polygon, Ethereum, and Hyperledger Fabric."
      ],
      conclusion: "PharmaChain provides a robust Web3 solution that safeguards public health by ensuring drug authenticity from raw chemical synthesis to consumer purchase.",
      systemRequirements: {
        hardware: ["Standard Server / Cloud VM", "4 GB RAM"],
        software: ["Node.js 18+", "MetaMask Extension", "Hardhat Framework", "Solidity ^0.8.20"]
      }
    }
  },
  {
    id: "cyber-threat-detector",
    domainId: "security",
    name: "AI Cyber Threat Detector & Vulnerability Scanner",
    shortDescription: "An automated web security auditing engine that identifies SQL injections, XSS vulnerabilities, open ports, and zero-day threat patterns.",
    difficulty: "Advanced",
    category: "trending",
    tags: ["Cyber Security", "Python", "React", "Express", "Security AI", "Nmap"],
    rating: 4.88,
    author: "ShieldSec Engineering",
    updatedAt: "2026-07-24",
    documentation: {
      overview: "The AI Cyber Threat Detector is a full-spectrum web application security scanner designed to discover security flaws, audit endpoint headers, analyze source code for OWASP Top 10 vulnerabilities, and generate executive remediation reports.",
      problemStatement: "Cyberattacks cost global enterprises over $8 trillion annually. Software teams deploy code rapidly without dedicated security code reviews, exposing web applications to data leaks, SQL injections, and broken authentication vectors.",
      objective: "To provide developers and DevOps engineers with an automated, easy-to-use security scanner that identifies security vulnerabilities prior to production deployment.",
      existingSystem: "Manual penetration testing services that are expensive, slow, and executed infrequently (once or twice per year), leaving applications vulnerable between audit cycles.",
      proposedSystem: "An automated security analysis suite combining synthetic payload fuzzing, port scanning, header inspection, and AI code review to detect security risks in seconds.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS v4", "Lucide Icons", "Recharts"],
        backend: ["Express.js Node Backend", "Python Security Scripts"],
        aiServices: ["Gemini 3.6 Flash for Vulnerability Remediation Advice"],
        database: ["MongoDB for Security Audit Reports"],
        authentication: ["JWT with Encrypted Key Management"],
        deployment: ["Docker Container with Isolated Sandbox Execution"]
      },
      architecture: "React Security Dashboard <-> Express API Service <-> Python Security Fuzzer Sandbox <-> Gemini AI Remediation Advisor.",
      architectureDiagramDesc: "User inputs Target URL -> Sandbox launches HTTP header checks & SQLi payload tests -> AI analyzes code snippets -> Comprehensive OWASP report generated.",
      workflow: "1. User inputs web domain or uploads source code.\n2. Security engine runs automated OWASP checks (XSS, SQLi, CSRF, Header analysis).\n3. Vulnerability findings are scored using CVSS 3.1 metrics.\n4. Gemini AI generates custom code fix recommendations for each flaw.",
      workflowSteps: [
        "Target URL / Repository Ingestion",
        "Automated Vulnerability Payload Fuzzing",
        "CVSS Severity Calculation & Flaw Mapping",
        "AI Remediation Code Patch Generation",
        "Security Audit Documentation Export"
      ],
      modules: [
        {
          id: "m1",
          name: "HTTP Header & SSL/TLS Inspector",
          description: "Audits Security Headers (CORS, CSP, HSTS) and SSL certificate expiration status.",
          keyFunctions: ["Header verification", "TLS cipher suite audit", "CORS policy checker"]
        },
        {
          id: "m2",
          name: "Payload Fuzzer & Vulnerability Engine",
          description: "Tests input endpoints against OWASP SQL injection, XSS, and path traversal vectors.",
          keyFunctions: ["XSS injection test", "SQLi detector", "Open port scanner"]
        },
        {
          id: "m3",
          name: "AI Remediation Patch Advisor",
          description: "Generates secure code replacements and patch instructions for detected vulnerabilities.",
          keyFunctions: ["Code fix generator", "Remediation step-by-step", "CVSS breakdown"]
        }
      ],
      features: [
        "Automated OWASP Top 10 Vulnerability Scanning",
        "CVSS v3.1 Impact Severity Matrix Scoring",
        "AI-Generated Code Fixes in Node.js, Python, & Java",
        "Exportable PDF Security Compliance Audits",
        "One-Click Copy for Patch Snippets"
      ],
      advantages: [
        "Integrates seamlessly into pre-deployment testing workflows.",
        "Reduces reliance on expensive external security consultants.",
        "Provides plain-English explanations for complex zero-day exploit mechanics."
      ],
      limitations: [
        "Must be executed only on authorized domains owned by the user.",
        "Deep custom business logic flaws may require human penetration testing."
      ],
      futureScope: [
        "GitHub Actions CI/CD plugin for automated pull request scanning.",
        "Real-time Web Application Firewall (WAF) rule auto-generation."
      ],
      conclusion: "ShieldSec provides an accessible, AI-augmented security scanner that empowers software teams to write secure code and protect user data against modern cyber threats.",
      systemRequirements: {
        hardware: ["4-Core CPU", "8 GB RAM", "Fast Network Interface"],
        software: ["Node.js 18+", "Python 3.10+", "Nmap (optional)", "Docker"]
      }
    }
  },
  {
    id: "e-commerce-ai-recommendations",
    domainId: "ecommerce",
    name: "AI E-Commerce Personalization & Visual Search Engine",
    shortDescription: "An intelligent multi-tenant e-commerce platform with AI visual product search, personalized recommendations, and dynamic pricing algorithms.",
    difficulty: "Intermediate",
    category: "recommended",
    tags: ["E-Commerce", "React", "Node.js", "Express", "Stripe", "Vector Search"],
    rating: 4.85,
    author: "ShopTech AI",
    updatedAt: "2026-07-21",
    documentation: {
      overview: "This platform transforms standard e-commerce store fronts into hyper-personalized shopping destinations featuring visual snap-and-search capabilities, collaborative filtering recommendations, and dynamic basket discount nudges.",
      problemStatement: "E-commerce conversion rates average less than 2.5% due to generic product search engines, irrelevance of recommended items, and high cart abandonment rates.",
      objective: "To boost e-commerce conversion rates and average order values by delivering instant visual product matching and individualized product recommendation carousels.",
      existingSystem: "Keyword-only search engines that fail when buyers use alternative vocabulary or upload product photos from mobile devices.",
      proposedSystem: "An integrated e-commerce application powered by visual embeddings and Gemini multi-modal processing that allows customers to search products by uploading photos.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS", "Motion", "Lucide Icons"],
        backend: ["Node.js", "Express.js REST APIs"],
        aiServices: ["Gemini 3.6 Flash Multi-Modal Vision", "Vector Embeddings"],
        database: ["MongoDB for Product Catalogs", "Redis for Session Caching"],
        authentication: ["JWT Auth", "Google OAuth"],
        deployment: ["Docker Container", "Stripe Payment Gateway API"]
      },
      architecture: "React Shop Front <-> Express API Gateway <-> Stripe Payments / Gemini Multi-Modal Vision <-> MongoDB Catalog Store.",
      architectureDiagramDesc: "User uploads photo -> Gemini extracts product attributes -> Vector match fetches similar catalog items -> Instant shop layout renders with Stripe Checkout.",
      workflow: "1. Customer browses catalog or uploads product photo.\n2. Gemini vision engine extracts style, color, category, and material features.\n3. Vector engine returns top matched catalog items.\n4. Customer adds items to cart and checks out via Stripe API.",
      workflowSteps: [
        "Product Catalog Ingestion & Embedding Generation",
        "User Photo Upload / Search Query Processing",
        "Multi-Modal Attribute Extraction & Catalog Matching",
        "Personalized Recommendation Carousel Rendering",
        "Secure Stripe Payment & Order Confirmation"
      ],
      modules: [
        {
          id: "m1",
          name: "Visual Snap & Search Engine",
          description: "Allows shoppers to upload photos of outfits or items to find similar inventory.",
          keyFunctions: ["Image upload handler", "Feature vectorization", "Catalog similarity search"]
        },
        {
          id: "m2",
          name: "Personalized Recommendation Carousel",
          description: "Calculates cross-sell and up-sell suggestions based on user browsing history.",
          keyFunctions: ["Collaborative filtering", "Trending item booster", "Cart cross-sell"]
        },
        {
          id: "m3",
          name: "Checkout & Order Fulfillment",
          description: "Handles cart management, coupon validation, and Stripe payment authorization.",
          keyFunctions: ["Cart state sync", "Stripe intent creation", "Invoice emailer"]
        }
      ],
      features: [
        "AI Image Snap-and-Search for Clothing & Accessories",
        "Personalized 'Recommended for You' Carousels",
        "Integrated Stripe One-Click Checkout Flow",
        "Dynamic Cart Discount Progress Tracker",
        "Exportable Sales & Inventory Analytics"
      ],
      advantages: [
        "Dramatically improves search experience for mobile shoppers.",
        "Increases cross-sell revenue through intelligent item grouping.",
        "Easy integration with existing product catalog databases."
      ],
      limitations: [
        "Visual search accuracy depends on product catalog image quality.",
        "Requires Stripe credentials for live card processing."
      ],
      futureScope: [
        "AR Virtual Try-On using WebXR camera overlays.",
        "Automated dynamic pricing based on inventory velocity and competitor prices."
      ],
      conclusion: "ShopTech AI equips online retailers with modern enterprise AI features, turning passive browsers into loyal customers.",
      systemRequirements: {
        hardware: ["Dual-Core Server", "4 GB RAM"],
        software: ["Node.js 18+", "MongoDB", "Stripe API Key", "React 19"]
      }
    }
  },
  {
    id: "agri-tech-crop-health",
    domainId: "agriculture",
    name: "AI Agriculture Crop Health & Soil Analytics Hub",
    shortDescription: "An AgriTech solution utilizing drone imagery analysis, soil sensor telemetry, crop disease identification, and automated yield estimation.",
    difficulty: "Intermediate",
    category: "recent",
    tags: ["Agriculture", "Computer Vision", "IoT", "React", "Python", "FastAPI"],
    rating: 4.89,
    author: "AgriVision Labs",
    updatedAt: "2026-07-19",
    documentation: {
      overview: "AgriVision Hub is a smart agricultural management system helping farmers and agronomists diagnose leaf diseases from smartphone photos, analyze soil moisture levels from field sensors, and optimize fertilizer application schedules.",
      problemStatement: "Crop diseases and unmanaged soil degradation cause up to 40% annual agricultural yield losses worldwide. Smallholder farmers lack immediate access to expert agronomists to diagnose plant blights before infection spreads.",
      objective: "To provide an instant crop disease diagnostic tool and soil health advisor that runs on basic mobile web browsers, ensuring early treatment and higher crop yields.",
      existingSystem: "Manual field inspection by agronomists that takes days or weeks to schedule, leading to irreversible crop damage during critical growth stages.",
      proposedSystem: "A mobile-friendly web app where farmers upload leaf photos to detect diseases (e.g., early blight, rust, mildew) instantly and receive tailored eco-friendly treatment plans.",
      technologiesUsed: {
        frontend: ["React 19", "Tailwind CSS", "Lucide Icons", "Offline PWA Cache"],
        backend: ["Express.js Proxy Gateway", "Python FastAPI ML Pipeline"],
        aiServices: ["ResNet Crop Classifier", "Gemini 3.6 Flash Agronomy Advisor"],
        database: ["MongoDB for Field Telemetry", "Soil Sensor Logs"],
        authentication: ["JWT Authentication"],
        deployment: ["Docker Container", "Cloud Run"]
      },
      architecture: "Mobile React PWA <-> Express API Service <-> Python Machine Learning Classifier <-> Gemini Agronomy Engine.",
      architectureDiagramDesc: "Farmer uploads crop leaf photo -> ML model classifies plant disease -> Agronomy engine suggests pesticide treatment -> Localized weather advice delivered.",
      workflow: "1. Farmer takes photo of infected crop leaf using mobile camera.\n2. Image is processed by the plant disease classifier.\n3. Disease type, severity, and treatment plan are displayed.\n4. Sensor data logs soil NPK and moisture levels to generate irrigation schedules.",
      workflowSteps: [
        "Crop Leaf Image Capture & Processing",
        "Deep Learning Pathogen Identification",
        "Soil Moisture & NPK Sensor Data Ingestion",
        "Custom Organic/Chemical Treatment Plan Generation",
        "Irrigation & Harvest Timing Guidance Delivery"
      ],
      modules: [
        {
          id: "m1",
          name: "Leaf Disease Diagnostic Engine",
          description: "Classifies 38 plant disease types across 14 crop species (tomato, corn, wheat, rice, etc.).",
          keyFunctions: ["Image pre-processing", "Pathogen classification", "Confidence score calculation"]
        },
        {
          id: "m2",
          name: "Soil Health & Irrigation Advisor",
          description: "Parses soil moisture, pH, and nitrogen-phosphorus-potassium (NPK) sensor data.",
          keyFunctions: ["Moisture threshold alarm", "Fertilizer prescription", "Watering schedule"]
        },
        {
          id: "m3",
          name: "Agronomy Remediation Guide",
          description: "Provides step-by-step organic and chemical treatment instructions in simple language.",
          keyFunctions: ["Dosage calculator", "Safety precautions", "PDF guide generator"]
        }
      ],
      features: [
        "Instant Leaf Disease Diagnostic Analysis",
        "Soil Moisture & NPK Telemetry Dashboard",
        "Localized Weather & Irrigation Forecast Alerts",
        "Step-by-Step Treatment & Fertilizer Calculation",
        "One-Click Copy for Treatment Prescriptions"
      ],
      advantages: [
        "Empowers farmers to catch crop diseases days before widespread field destruction.",
        "Optimizes fertilizer usage, lowering costs and reducing environmental runoff.",
        "Works smoothly across low-bandwidth mobile connections."
      ],
      limitations: [
        "Requires clear lighting on leaf photographs for optimal machine learning accuracy.",
        "Requires access to mobile internet or cached PWA state."
      ],
      futureScope: [
        "Drone multispectral imagery integration for automated large-acreage field scanning.",
        "Voice-guided vernacular language support for non-literate farming communities."
      ],
      conclusion: "AgriVision Hub brings modern artificial intelligence to field agriculture, safeguarding food security and increasing farm profitability.",
      systemRequirements: {
        hardware: ["Standard Cloud VM (2 vCPU)", "4 GB RAM"],
        software: ["Node.js 18+", "Python 3.10+", "TensorFlow/PyTorch", "React 19"]
      }
    }
  }
];

export { getProjectsForDomain } from "./allDomainProjects";

