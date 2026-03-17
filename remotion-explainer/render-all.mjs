import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs/promises";

const projects = [
  { id: 1, title: "Flow", description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple", tech: "Swift/SwiftUI" },
  { id: 2, title: "Ethereal Dimension", description: "AI storytelling platform — creative flagship project", tech: "React/Next.js/Three.js" },
  { id: 3, title: "Zai Vision Suite", description: "Multi-platform AI vision suite utilizing GLM-4.6V", tech: "Python/AI/ML" },
  { id: 4, title: "AI IDE Setup & Workflows", description: "Optimized development environment configurations for AI pairs", tech: "Bash/MCP" },
  { id: 5, title: "Rosicrucian Knowledge Explorer", description: "RAG search engine exploring esoteric knowledge", tech: "Python/RAG/OpenAI" },
  { id: 6, title: "Agentic News Transformer", description: "Agentic AI news ecosystem built with Python", tech: "Python/AI Agents/LLMs" },
  { id: 7, title: "Gurduwara Langar Game", description: "Gamified Sikh heritage application for community impact", tech: "React Native/Culture" },
  { id: 8, title: "Ethereal Search Showcase", description: "Next-gen AI search experience visualization", tech: "React/Next.js/AI Search" },
  { id: 9, title: "Artful Archives", description: "Creative digital preservation platform", tech: "React/Vercel" },
  { id: 10, title: "Ethereal Explorer", description: "Immersive spatial computing experience on the web", tech: "React/WebGL/Three.js" },
  { id: 11, title: "Rosicrucian Parenting", description: "Full-stack parenting platform with iOS & Android apps", tech: "Flutter/Dart" },
  { id: 12, title: "Rosicrucian Vowel Sounds", description: "Cross-platform Flutter app on App Store & Play Store", tech: "Flutter/Dart/Audio" },
  { id: 13, title: "Hylios — Ethereal Dimension", description: "Published iOS game within the Ethereal Dimension universe", tech: "Swift/SpriteKit" },
  { id: 14, title: "Barricades — Austin Project", description: "Interactive narrative experience within Ethereal Dimension", tech: "React/Next.js/Animation" },
  { id: 15, title: "Cycles of Fate", description: "Dynamic web experience exploring fate and destiny", tech: "React/Next.js/Animation" },
  { id: 16, title: "Geometric Graph Design", description: "Stunning generative geometric visualizations", tech: "React/Canvas/Math" },
  { id: 17, title: "Voice Practice Hub", description: "Audio-powered voice training and practice platform", tech: "React/Web Audio/Next.js" },
  { id: 18, title: "Audio Dialogues", description: "Interactive audio conversation experience", tech: "React/Audio API/AI" },
  { id: 19, title: "My4Blocks", description: "Block-based interactive web experience", tech: "React/Modular Design" },
  { id: 20, title: "Blog Layouts for Artful Archives", description: "Design system and layout concepts for creative blogging", tech: "React/CSS/Typography" }
];

async function start() {
  const entry = path.resolve("./src/index.ts");
  const outputDir = path.resolve("../public/videos");
  await fs.mkdir(outputDir, { recursive: true });

  console.log("Bundling project...");
  const bundleLocation = await bundle({
    entryPoint: entry,
  });

  const comps = await getCompositions(bundleLocation);
  const composition = comps.find((c) => c.id === "Explainer");

  if (!composition) {
    throw new Error("No composition with ID 'Explainer' found");
  }

  console.log("Starting batch render...");

  for (const project of projects) {
    const outputLocation = path.join(outputDir, `project-${project.id}.mp4`);
    
    // Check if image exists
    const imagePath = path.resolve(`../public/projects/project-${project.id}.png`);
    try {
      await fs.access(imagePath);
    } catch {
      console.warn(`Image not found for ${project.title}, skipping render.`);
      continue;
    }

    console.log(`Rendering ${project.title}...`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: {
        ...project,
        imagePath: `file://${imagePath}` // Use local file URL
      },
      onProgress: ({ progress }) => {
        process.stdout.write(`\rProgress: ${Math.round(progress * 100)}%`);
      }
    });
    console.log(`\nFinished ${project.title}`);
  }

  console.log("All renders completed!");
}

start().catch(console.error);
