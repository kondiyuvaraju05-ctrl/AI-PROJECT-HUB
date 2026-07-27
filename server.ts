import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import crypto from "crypto";
import fs from "fs";

dotenv.config();

// Persistent Database for Registered Users
interface StoredUser {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar: string;
  provider: "email" | "google";
  createdAt: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "data_users.json");

const loadUsersFromFile = (): Map<string, StoredUser> => {
  const map = new Map<string, StoredUser>();
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      const list: StoredUser[] = JSON.parse(data);
      list.forEach((u) => map.set(u.email.toLowerCase(), u));
    }
  } catch (err) {
    console.error("Error loading users database:", err);
  }
  return map;
};

const saveUsersToFile = (map: Map<string, StoredUser>) => {
  try {
    const list = Array.from(map.values());
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving users database:", err);
  }
};

const usersDb: Map<string, StoredUser> = loadUsersFromFile();

// Helper to hash passwords securely
const hashPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password + "_ai_hub_salt").digest("hex");
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client lazily/safely
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // User Registration Endpoint
  app.post("/api/auth/register", (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email Address and Password are required." });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters long." });
        return;
      }

      const lowerEmail = email.toLowerCase().trim();
      
      // Check whether email already exists in database
      if (usersDb.has(lowerEmail)) {
        res.status(400).json({
          error: "This email is already registered. Please log in to continue.",
          alreadyRegistered: true,
        });
        return;
      }

      const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const displayName = username && username.trim() 
        ? username.trim() 
        : lowerEmail.split("@")[0].charAt(0).toUpperCase() + lowerEmail.split("@")[0].slice(1);

      const newUser: StoredUser = {
        id: userId,
        name: displayName,
        username: username?.trim() || lowerEmail.split("@")[0],
        email: lowerEmail,
        passwordHash: hashPassword(password),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`,
        provider: "email",
        createdAt: new Date().toISOString(),
      };

      usersDb.set(lowerEmail, newUser);
      saveUsersToFile(usersDb);

      res.status(201).json({
        message: "Registration successful.",
        token: `jwt_sim_${userId}`,
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          provider: newUser.provider,
        },
      });
    } catch (err: any) {
      console.error("Registration Error:", err);
      res.status(500).json({ error: "Server error during registration." });
    }
  });

  // User Login Endpoint
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, username, password } = req.body;

      const lowerEmail = (email || username || "").toLowerCase().trim();
      if (!lowerEmail || !password) {
        res.status(400).json({ error: "Please enter both Email Address and Password." });
        return;
      }

      let existingUser: StoredUser | undefined;
      for (const u of usersDb.values()) {
        if (u.email === lowerEmail || u.username.toLowerCase() === lowerEmail) {
          existingUser = u;
          break;
        }
      }

      // 1. Check whether entered email exists in database
      if (!existingUser) {
        res.status(404).json({
          error: "No account found with this email address.",
          message: "Please register first to create an account.",
          emailNotFound: true,
        });
        return;
      }

      // 2. If email exists, verify password
      const inputHash = hashPassword(password);
      if (existingUser.passwordHash !== inputHash) {
        res.status(401).json({
          error: "Invalid email address or password.",
          message: "Invalid email address or password.",
          incorrectPassword: true,
        });
        return;
      }

      // 3. If correct: Log user in successfully -> Redirect to Dashboard
      res.json({
        message: "Login successful!",
        token: `jwt_sim_${existingUser.id}`,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          username: existingUser.username,
          email: existingUser.email,
          avatar: existingUser.avatar,
          provider: existingUser.provider,
        },
      });
    } catch (err: any) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "Server error during login." });
    }
  });

  // Google OAuth Authentication Endpoint
  app.post("/api/auth/google", (req, res) => {
    try {
      const { email, name, avatar } = req.body;

      const googleEmail = (email || "user@google.com").toLowerCase().trim();
      const displayName = name || googleEmail.split("@")[0].charAt(0).toUpperCase() + googleEmail.split("@")[0].slice(1);

      let existingUser = usersDb.get(googleEmail);
      if (!existingUser) {
        existingUser = {
          id: `google_${Date.now()}`,
          name: displayName,
          username: googleEmail.split("@")[0],
          email: googleEmail,
          passwordHash: "oauth_google_protected",
          avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`,
          provider: "google",
          createdAt: new Date().toISOString(),
        };
        usersDb.set(googleEmail, existingUser);
        saveUsersToFile(usersDb);
      }

      res.json({
        message: "Google authentication successful!",
        token: `jwt_sim_${existingUser.id}`,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          username: existingUser.username,
          email: existingUser.email,
          avatar: existingUser.avatar,
          provider: "google",
        },
      });
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      res.status(500).json({ error: "Server error during Google sign-in." });
    }
  });

  // Helper to safely execute Gemini requests with fallback models
  const generateWithFallback = async (prompt: string, systemInstruction?: string, preferredModel?: string) => {
    const ai = getGenAI();
    const modelCandidates = [
      preferredModel,
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
      "gemini-2.0-flash",
      "gemini-2.5-pro",
    ].filter(Boolean) as string[];

    // Remove duplicates while preserving order
    const uniqueModels = Array.from(new Set(modelCandidates));

    let lastError: any = null;
    for (const model of uniqueModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: systemInstruction ? { systemInstruction, temperature: 0.7 } : { temperature: 0.7 },
        });
        if (response && response.text) {
          return { text: response.text, modelUsed: model };
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed, trying next candidate. Error:`, err?.message || err);
        lastError = err;
      }
    }
    throw lastError || new Error("All Gemini model candidates failed.");
  };

  // AI Chatbot endpoint for project documentation guidance
  app.post("/api/chat", async (req, res) => {
    try {
      const { project, query, history, selectedSection, model } = req.body;

      if (!query && (!history || history.length === 0)) {
        res.status(400).json({ error: "Query or message history is required." });
        return;
      }

      // Construct system instruction with project context
      const projectTitle = project?.name || "Selected AI Project";
      const projectDomain = project?.domain || "General Domain";
      const projectOverview = project?.overview || "";
      const projectProblem = project?.problemStatement || "";
      const projectObjective = project?.objective || "";
      const projectArchitecture = project?.architecture || "";
      const projectWorkflow = project?.workflow || "";
      const projectTechStack = Array.isArray(project?.technologies) 
        ? project.technologies.join(", ") 
        : (project?.technologies || "");
      const projectModules = Array.isArray(project?.modules)
        ? project.modules.map((m: any) => `- ${m.name}: ${m.description}`).join("\n")
        : (project?.modules || "");
      const projectAdvantages = Array.isArray(project?.advantages) 
        ? project.advantages.join("\n- ")
        : (project?.advantages || "");
      const projectLimitations = Array.isArray(project?.limitations)
        ? project.limitations.join("\n- ")
        : (project?.limitations || "");
      const projectFutureScope = Array.isArray(project?.futureScope)
        ? project.futureScope.join("\n- ")
        : (project?.futureScope || "");

      const systemInstruction = `
You are the AI Documentation Assistant & Simplifier powered by Google Gemini. Your goal is to analyze project documentation, explain complex concepts in simple and clear terms, and structure technical reports cleanly.

=== CURRENT PROJECT CONTEXT ===
Project Name: ${projectTitle}
Domain: ${projectDomain}
Overview: ${projectOverview}
Problem Statement: ${projectProblem}
Objective: ${projectObjective}
Tech Stack: ${projectTechStack}
Architecture: ${projectArchitecture}
Workflow: ${projectWorkflow}
Modules:
${projectModules}
Advantages:
- ${projectAdvantages}
Limitations:
- ${projectLimitations}
Future Scope:
- ${projectFutureScope}
${selectedSection ? `\nThe user is currently inspecting/editing the section: "${selectedSection}".` : ""}

=== CORE INSTRUCTIONS ===
1. Analyze the project documentation thoroughly and answer user questions directly based on this context.
2. If asked to EXPLAIN or SIMPLIFY a section or concept:
   - Break down complex technical jargon into simple, beginner-friendly explanations with real-world analogies.
   - Use clear bullet points and bold highlights for key ideas.
3. If asked to EXPAND or PUBLISH documentation:
   - Use structured in-built side headings (e.g. "### 1. Architectural Component Breakdown", "### 2. Implementation Flow").
4. Always respond in structured Markdown.
`.trim();

      // Format contents for generateContent
      let promptText = "";
      if (history && Array.isArray(history) && history.length > 0) {
        promptText = history
          .map((m: { sender: string; text: string }) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
          .join("\n\n");
        if (query) {
          promptText += `\n\nUser: ${query}`;
        }
      } else {
        promptText = query;
      }

      const result = await generateWithFallback(promptText, systemInstruction, model);
      res.json({ text: result.text, modelUsed: result.modelUsed });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err);
      res.status(500).json({ 
        error: "Failed to generate AI response.", 
        details: err?.message || "Unknown error" 
      });
    }
  });

  // Dedicated AI Expansion Endpoint with Inbuilt Side Headings (Gemini 2.5 Pro)
  app.post("/api/expand-doc", async (req, res) => {
    try {
      const { project, sectionTitle, currentContent, action } = req.body;

      if (!sectionTitle) {
        res.status(400).json({ error: "Section title is required." });
        return;
      }

      const ai = getGenAI();

      const prompt = `
You are Google Gemini 2.5 Pro ⭐, specialized in long document processing and deep technical expansions.

TASK: ${action === "technical_deep_dive" ? "Generate a comprehensive technical deep-dive" : action === "format_google_docs" ? "Format and structure for Google Docs publication" : "Expand and enrich the existing section with detailed technical explanations and in-built side headings"}

PROJECT TITLE: ${project?.name || "Academic Engineering Project"}
SECTION TO EXPAND: "${sectionTitle}"
EXISTING SECTION CONTENT:
${currentContent || "None provided."}

INSTRUCTIONS FOR GENERATING OUTPUT:
1. Provide a comprehensive, long-form technical expansion of this section.
2. Structure the expanded output with elegant IN-BUILT SIDE HEADINGS (e.g., "### 1. Architectural Component Breakdown", "### 2. Low-Latency Data Pipeline", "### 3. Error Handling & Resilience").
3. Include relevant pseudo-code, API contracts, flow logic, or database schema snippets where relevant.
4. Ensure the output is formatted in clean Markdown so it can be seamlessly copied into Google Docs or added directly to the project report.
`.trim();

      const result = await generateWithFallback(prompt);
      res.json({ expandedText: result.text, model: `Google Gemini (${result.modelUsed})` });
    } catch (err: any) {
      console.error("Expand Doc API Error:", err);
      res.status(500).json({ error: "Failed to expand documentation section.", details: err?.message || "Unknown error" });
    }
  });

  // Full Project Document Creation Endpoint powered by Gemini 2.5 Pro ⭐
  app.post("/api/generate-full-doc", async (req, res) => {
    try {
      const { project } = req.body;
      if (!project || !project.name) {
        res.status(400).json({ error: "Project details are required." });
        return;
      }

      const prompt = `
You are Google Gemini ⭐, specialized in long-document synthesis, technical writing, and structuring documentation with clear in-built side headings for academic and enterprise project reports.

TASK: Generate a complete, exhaustive, publication-grade Academic & Enterprise Technical Project Documentation for the project: "${project.name}".

PROJECT CONTEXT:
- Domain: ${project.domainId || "Computer Science / AI"}
- Summary: ${project.shortDescription || ""}
- Overview: ${project.documentation?.overview || ""}
- Problem Statement: ${project.documentation?.problemStatement || ""}
- Objectives: ${project.documentation?.objective || ""}
- Existing System: ${project.documentation?.existingSystem || ""}
- Proposed System: ${project.documentation?.proposedSystem || ""}
- Tech Stack: ${JSON.stringify(project.documentation?.technologiesUsed || {})}
- Architecture: ${project.documentation?.architecture || ""}
- Modules: ${JSON.stringify(project.documentation?.modules || [])}

REQUIREMENTS FOR THE GENERATED DOCUMENT:
1. Create a full 12-section technical document formatted with clean Markdown and IN-BUILT SIDE HEADINGS (H2, H3, H4).
2. The document MUST include structured chapters with in-built subheadings for easy reading and Google Docs export.
3. Ensure deep technical depth, code snippets/pseudo-code, and simple explanations suitable for non-technical readers as well.
`.trim();

      const result = await generateWithFallback(prompt);
      res.json({ fullDocumentation: result.text, model: `Google Gemini (${result.modelUsed})` });
    } catch (err: any) {
      console.error("Generate Full Doc API Error:", err);
      res.status(500).json({ error: "Failed to generate complete project document.", details: err?.message || "Unknown error" });
    }
  });

  // Vite development middleware or static production handler
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Project Hub server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
