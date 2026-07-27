# 🚀 AI Project Hub

An advanced **AI-Powered Engineering & Computer Science Documentation & Research Platform** built with **React**, **TypeScript**, **Node.js**, **Express**, and **Google Gemini AI**.

AI Project Hub provides scholars, students, and software engineers with full 12-to-15 page publication-ready technical documentations, interactive system architectures, domain taxonomies, and an integrated **Google Gemini AI Assistant** for document analysis and simplified technical explanations.

---

## 🌟 Key Features

### 1. 📂 20+ Engineering & Tech Domains
- Explore real-world project blueprints across **Artificial Intelligence**, **Machine Learning**, **Cyber Security**, **Cloud Computing**, **IoT**, **Blockchain**, **FinTech**, **HealthTech**, **DevOps**, **AR/VR**, and more.
- Filter by domain categories: *Existing Systems*, *Trending Tech*, *Recently Added*, and *Recommended Blueprints*.

### 2. 📄 12-to-15 Page Full Technical Documentations
- Comprehensive academic and enterprise report blueprints formatted with structured **In-Built Side Headings** (H2, H3, H4).
- Includes **Executive Summary**, **Problem Statement**, **System Architecture Flow**, **Technology Stack Tier**, **Functional Modules**, **Comparative Metrics**, **Feasibility Analysis**, and **Reference Specifications**.
- **Copy Section Buttons**: Instantly copy any section formatted in clean Markdown ready to paste into Google Docs or Word.

### 3. 🤖 Google Gemini AI Assistant & Simplifier
- Powered by **Google GenAI SDK (`@google/genai`)** with intelligent multi-model fallback (`gemini-3.6-flash`, `gemini-3.5-flash`, `gemini-flash-latest`, `gemini-2.5-pro`).
- **Document Analysis & Q&A**: Answers complex architectural questions directly based on the active project context.
- **Simplified Explanations**: Converts dense technical jargon into beginner-friendly breakdowns using simple analogies, 3-step processes, and key takeaways.
- **Section Expansion**: Generates long-form technical deep-dives and publication-ready subheadings.

### 4. 🔒 Database Authentication System
- **Unique Email Enforcement**: Checks persistent database to prevent duplicate user registrations.
- **SHA-256 Encryption**: Password hashing using Node `crypto` with salt before database storage.
- **Interactive Popup Modals**:
  - ⚠️ *Unregistered Email Warning*: Prompts with **"No account found with this email address."** and provides a **[Register Now]** button.
  - 🛡️ *Duplicate Email Warning*: Prompts with **"This email is already registered. Please log in to continue."** and provides a **[Go to Login]** button.
- **Google OAuth 2.0**: Single-click authentication option.
- **Direct Dashboard Redirect**: Automatically logs in and redirects users directly to the Dashboard upon successful registration or login.

### 5. 👤 User Profile Details Modal
- Clickable top navbar profile trigger displaying user details:
  - Avatar & Full Name
  - `@username` handle
  - Verified Scholar Account badge
  - Registered Email Address
  - Authentication Method (`Google OAuth` or `Hashed Email Session`)
  - Unique Account ID & Access Privileges

### 6. 🎨 Tailored Design System
Designed using a curated color palette:
- **Primary Sidebar / Header**: `#2A374E`
- **Sidebar Hover**: `#38475F`
- **Background**: `#F1F2F5`
- **Cards**: `#FFFFFF`
- **Primary Blue**: `#1F98DC`
- **Secondary Blue**: `#63A0D9`
- **Light Blue**: `#B8C9DD`
- **Primary Text**: `#12171F`
- **Secondary Text**: `#6A7788`
- **Border**: `#E5E7EB`
- **Success**: `#22C55E`
- **Danger**: `#EF4444`

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19
- **Language**: TypeScript (`.tsx`)
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens
- **Icons**: Lucide React
- **Markdown Processing**: React Markdown

### **Backend**
- **Server**: Node.js + Express.js
- **Runtime Compiler**: `tsx` (TypeScript Execution)
- **Security & Hashing**: Node `crypto` (SHA-256)
- **Database**: Persistent JSON File Database (`data_users.json`)

### **Artificial Intelligence Engine**
- **SDK**: `@google/genai` (Official Google Gen AI SDK)
- **Primary Models**: `gemini-3.6-flash`, `gemini-3.5-flash`, `gemini-flash-latest`, `gemini-2.5-pro`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or bun package manager

### 1. Clone the Repository
```bash
git clone https://github.com/Chandrika8977987772/AI_PROJECT_HUB-.git
cd AI_PROJECT_HUB-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
APP_URL="http://localhost:3000"
```
*(You can get a free API key from [Google AI Studio](https://aistudio.google.com/))*

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📡 API Endpoints Reference

### **Authentication APIs**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Registers a new user with unique email check and SHA-256 password hashing. |
| `/api/auth/login` | `POST` | Validates credentials against stored database users. |
| `/api/auth/google` | `POST` | Single-Click Google OAuth authentication. |

### **AI Assistant APIs**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/chat` | `POST` | AI Chatbot endpoint for project analysis and simple explanations. |
| `/api/expand-doc` | `POST` | Generates long-form technical expansions with in-built side headings. |
| `/api/generate-full-doc` | `POST` | Synthesizes full 12-section technical documentation for exporting. |

---

## 📁 Folder Structure

```
ai-project-hub/
├── data_users.json          # Persistent user database
├── server.ts                # Express backend & Gemini API endpoints
├── index.html               # Main HTML entry point
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── src/
│   ├── App.tsx              # Main React Application & Protected Router
│   ├── index.css            # Tailwind v4 theme tokens & color system
│   ├── main.tsx             # React DOM root entry
│   ├── types.ts             # TypeScript interface definitions
│   ├── components/
│   │   ├── AiChatbot.tsx    # Interactive Gemini AI Chatbot Drawer
│   │   ├── Dashboard.tsx    # Domain selection grid & statistics
│   │   ├── DocReaderModal.tsx # Full 15-page documentation viewer
│   │   ├── DomainPage.tsx   # Domain project list & category filter
│   │   ├── LoginPage.tsx    # Authentication forms, popups & Google OAuth
│   │   ├── Navbar.tsx       # Top navbar & User Profile Details modal
│   │   └── ProjectDetailsPage.tsx # Detailed project view & architecture
│   └── data/
│       ├── domains.ts       # 20 Engineering domain definitions
│       ├── projects.ts      # Sample detailed project datasets
│       └── allDomainProjects.ts # Comprehensive domain project repository
```

---

## 📄 License
This project is open-source and available under the **MIT License**.

Developed for **AI Project Hub** research and academic documentation platform.
