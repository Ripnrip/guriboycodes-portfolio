import { Octokit } from "@octokit/rest";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), "../../../.env") });

const projects = [
  { id: 1, title: "Flow", repo: "Ripnrip/Flow", description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple", tech: "Swift/SwiftUI" },
  { id: 2, title: "Ethereal Dimension", repo: "Ripnrip/EtherealDimension", description: "AI storytelling platform — creative flagship project", tech: "React/Next.js/Three.js" },
  { id: 3, title: "Zai Vision Suite", repo: "Ripnrip/zai-vision-suite", description: "Multi-platform AI vision suite utilizing GLM-4.6V", tech: "Python/AI/ML" },
  { id: 4, title: "AI IDE Setup & Workflows", repo: "Ripnrip/ai-ide-setup", description: "Optimized development environment configurations for AI pairs", tech: "Bash/MCP" },
  { id: 5, title: "Rosicrucian Knowledge Explorer", repo: "noeticactivity/Rosicrucian-Knowledge-Explorer", description: "RAG search engine exploring esoteric knowledge", tech: "Python/RAG/OpenAI" },
  { id: 6, title: "Agentic News Transformer", repo: "Ripnrip/Agentic-News-Transformer", description: "Agentic AI news ecosystem built with Python", tech: "Python/AI Agents/LLMs" },
  { id: 7, title: "Gurduwara Langar Game", repo: "Ripnrip/GurduwaraLangarGame", description: "Gamified Sikh heritage application for community impact", tech: "React Native/Culture" },
  { id: 8, title: "Ethereal Search Showcase", repo: "Ripnrip/EtherealSearch-Showcase", description: "Next-gen AI search experience visualization", tech: "React/Next.js/AI Search" },
  { id: 9, title: "Artful Archives", repo: "Ripnrip/Artful-Archives", description: "Creative digital preservation platform", tech: "React/Vercel" },
  { id: 10, title: "Ethereal Explorer", repo: "Ripnrip/Ethereal-Explorer", description: "Immersive spatial computing experience on the web", tech: "React/WebGL/Three.js" },
  { id: 11, title: "Rosicrucian Parenting", repo: "noeticactivity/Rosicrucian-Parenting", description: "Full-stack parenting platform with iOS & Android apps", tech: "Flutter/Dart" },
  { id: 12, title: "Rosicrucian Vowel Sounds", repo: "noeticactivity/Rosicrucian-Vowel-Sounds", description: "Cross-platform Flutter app on App Store & Play Store", tech: "Flutter/Dart/Audio" },
  { id: 13, title: "Hylios — Ethereal Dimension", repo: "Ripnrip/Hylios", description: "Published iOS game within the Ethereal Dimension universe", tech: "Swift/SpriteKit" },
  { id: 14, title: "Barricades — Austin Project", repo: "Ripnrip/Barricades-Austin", description: "Interactive narrative experience within Ethereal Dimension", tech: "React/Next.js/Animation" },
  { id: 15, title: "Cycles of Fate", repo: "Ripnrip/Cycles-of-Fate", description: "Dynamic web experience exploring fate and destiny", tech: "React/Next.js/Animation" },
  { id: 16, title: "Geometric Graph Design", repo: "Ripnrip/Geometric-Graph-Design", description: "Stunning generative geometric visualizations", tech: "React/Canvas/Math" },
  { id: 17, title: "Voice Practice Hub", repo: "Ripnrip/Voice-Practice-Hub", description: "Audio-powered voice training and practice platform", tech: "React/Web Audio/Next.js" },
  { id: 18, title: "Audio Dialogues", repo: "Ripnrip/Audio-Dialogues", description: "Interactive audio conversation experience", tech: "React/Audio API/AI" },
  { id: 19, title: "My4Blocks", repo: "Ripnrip/My4Blocks", description: "Block-based interactive web experience", tech: "React/Modular Design" },
  { id: 20, title: "Blog Layouts for Artful Archives", repo: "Ripnrip/Blog-Layouts", description: "Design system and layout concepts for creative blogging", tech: "React/CSS/Typography" }
];

async function updateReadmes() {
  const templatePath = path.join(process.cwd(), "templates", "README.ghibli.md");
  const template = await fs.readFile(templatePath, "utf-8");

  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  console.log("Starting README updates...");

  for (const project of projects) {
    const [owner, repo] = project.repo.split("/");
    console.log(`Processing ${project.repo}...`);

    try {
      // 1. Generate content from template
      let content = template
        .replace(/\[Project Name\]/g, project.title)
        .replace(/\[Short One-Liner Description\]/g, project.description)
        .replace(/\[ID\]/g, project.id)
        .replace(/\[Username\]/g, owner)
        .replace(/\[ProjectName\]/g, repo)
        .replace(/\[RepoName\]/g, repo)
        .replace(/\[Language-Swift\/React\/Flutter-FFB6C1\]/g, project.tech);

      // 2. Get the current README file (for SHA and content comparison)
      let currentFile;
      try {
        currentFile = await octokit.repos.getContent({
          owner,
          repo,
          path: "README.md",
        });
      } catch (e) {
        console.log(`README.md not found for ${project.repo}, creating new one.`);
      }

      const sha = currentFile?.data?.sha;
      const currentContent = currentFile ? Buffer.from(currentFile.data.content, "base64").toString() : "";

      if (currentContent === content) {
        console.log(`README already up to date for ${project.repo}. Skipping.`);
        continue;
      }

      // 3. Update or create the README
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: "README.md",
        message: "🎨 Update README with Ghibli-themed professional showcase",
        content: Buffer.from(content).toString("base64"),
        sha: sha,
      });

      console.log(`Successfully updated ${project.repo}`);
    } catch (error) {
      console.error(`Error updating ${project.repo}:`, error.message);
    }
  }

  console.log("Finished all README updates.");
}

updateReadmes().catch(console.error);
