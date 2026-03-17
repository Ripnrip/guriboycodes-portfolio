import Replicate from "replicate";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

// Load environment variables from the root .env
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

// Extracted from Projects.jsx
const projects = [
  { id: 1, title: "Flow", description: "Dynamic Island iOS app — beautiful, recent, uniquely Apple" },
  { id: 2, title: "Ethereal Dimension", description: "AI storytelling platform — creative flagship project" },
  { id: 3, title: "Zai Vision Suite", description: "Multi-platform AI vision suite utilizing GLM-4.6V" },
  { id: 4, title: "AI IDE Setup & Workflows", description: "Optimized development environment configurations for AI pairs" },
  { id: 5, title: "Rosicrucian Knowledge Explorer", description: "RAG search engine exploring esoteric knowledge" },
  { id: 6, title: "Agentic News Transformer", description: "Agentic AI news ecosystem built with Python" },
  { id: 7, title: "Gurduwara Langar Game", description: "Gamified Sikh heritage application for community impact" },
  { id: 8, title: "Ethereal Search Showcase", description: "Next-gen AI search experience visualization" },
  { id: 9, title: "Artful Archives", description: "Creative digital preservation platform" },
  { id: 10, title: "Ethereal Explorer", description: "Immersive spatial computing experience on the web" },
  { id: 11, title: "Rosicrucian Parenting", description: "Full-stack parenting platform with iOS & Android apps" },
  { id: 12, title: "Rosicrucian Vowel Sounds", description: "Cross-platform Flutter app on App Store & Play Store" },
  { id: 13, title: "Hylios — Ethereal Dimension", description: "Published iOS game within the Ethereal Dimension universe" },
  { id: 14, title: "Barricades — Austin Project", description: "Interactive narrative experience within Ethereal Dimension" },
  { id: 15, title: "Cycles of Fate", description: "Dynamic web experience exploring fate and destiny" },
  { id: 16, title: "Geometric Graph Design", description: "Stunning generative geometric visualizations" },
  { id: 17, title: "Voice Practice Hub", description: "Audio-powered voice training and practice platform" },
  { id: 18, title: "Audio Dialogues", description: "Interactive audio conversation experience" },
  { id: 19, title: "My4Blocks", description: "Block-based interactive web experience" },
  { id: 20, title: "Blog Layouts for Artful Archives", description: "Design system and layout concepts for creative blogging" }
];

async function generateImages() {
  const outputDir = path.join(process.cwd(), "public", "projects");
  
  // Ensure output directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error("Error creating output directory:", error);
  }

  console.log("Starting image generation for", projects.length, "projects...");

  for (const project of projects) {
    const filename = `project-${project.id}.png`;
    const filepath = path.join(outputDir, filename);

    // Skip if image already exists
    try {
      await fs.access(filepath);
      console.log(`Skipping ${project.title} - Image already exists.`);
      continue;
    } catch {
      // File doesn't exist, proceed
    }

    console.log(`Generating image for: ${project.title}...`);
    
    try {
      // Crafting a prompt that fits the Ghibli style requirement
      const prompt = `Studio Ghibli style, beautiful anime animation, masterpiece, highly detailed, vibrant colors. Concept: ${project.title} - ${project.description}`;
      
      const input = {
        prompt: prompt,
        resolution: "2K",
        image_input: [],
        aspect_ratio: "4:3",
        output_format: "png",
        safety_filter_level: "block_only_high"
      };

      const output = await replicate.run("google/nano-banana-pro", { input });
      
      // The output is likely a URL stream or buffer
      console.log(`Saving image to ${filepath}`);
      
      // Since output is likely a buffer based on the example `fs.writeFile("my-image.png", output);`
      // Wait, let's check the type. If it's a URL or ReadableStream, Replicate JS client usually handles it.
      // Based on the user's prompt: `output.url()` gets URL, and `fs.writeFile("my-image.png", output)` writes it.
      
      await fs.writeFile(filepath, output);
      console.log(`Successfully generated and saved ${filename}`);
      
      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Failed to generate image for ${project.title}:`, error);
    }
  }
  
  console.log("Finished generating all images.");
}

generateImages().catch(console.error);
