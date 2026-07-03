# Icon Wiring Report — Claue-Portfolio

Date: 2026-07-01
Scope: wire `Resume-App-Icon/` library into `Claue-Portfolio/assets/tech/`, audit `data.js` references, produce `content/icon-map.json`.

## Inventory

- `Resume-App-Icon/`: 205 files (svg/png/webp/avif/jpeg/ico, several `-official` PNG variants), plus two subdirs:
  - `core_skills_icons/` — 34 curated SVGs + `resume-icons-pack.zip` (21 generic concept placeholders, no brand logos)
  - `Icon-Reference_Material/` — one raster reference sheet (`Skills-Catalog-Valid-Icons.png`), not usable as source icons
- `Claue-Portfolio/assets/tech/`: 66 files before this pass, **67 after** (one copy added)
- `Claue-Portfolio/assets/logos/`: 4 files (morgan-stanley.png, paypal.svg, stadia.png, venmo.png) — all referenced, all present

## Broken references in data.js

**None.** Every `assets/tech/*` and `assets/logos/*` path referenced by `skills[].items[].icon` and `experience[].logo`/`logoAlt` exists on disk. Covers, hackathon images, portraits, and all four `vid()` videos also resolve. `_brokenRefs` is empty.

## Copied (from → to)

| Term | From | To |
|---|---|---|
| Supabase | `Resume-App-Icon/supabase.svg` | `assets/tech/supabase.svg` |

That was the only needed term that was missing from `assets/tech/` **and** available in the local library. No name collisions occurred (no `supabase.*` existed in the target).

## Matched existing (no copy needed)

All 63 data.js skill terms already resolve to files in `assets/tech/` (python, claude, openai, gemini, ollama, langchain, langgraph, llamaindex, crewai, mcp, rag-pipelines, pytorch, mlx, stable-diffusion, opencv, hugging-face, replicate, tensorflow, openrouter, elevenlabs, swift, swiftui, objective-c, arkit, roomplan, coreml, activitykit, widgetkit, mapkit, ble, xcode, flutter, dart, react-native, aws, googlecloud, azure, docker, github-actions, jenkins, fastlane, vercel, datadog, firebase, runpod, n8n, postgresql, mongodb, redis, pinecone, chromadb, qdrant, neo4j, graphql, nextjs, react, typescript, numpy, pandas, figma, github, cursor). Bundle terms LangGraph, CrewAI, Neo4j, n8n, LangChain, Pinecone, ChromaDB, Qdrant, Next.js, Vercel, GitHub Actions, Flutter, Dart, React Native, TypeScript, React, Python, Swift, SwiftUI, ARKit, RoomPlan, CoreML, ActivityKit, WidgetKit, Xcode, Figma, Cursor, Anthropic/Claude, OpenAI, Gemini, Ollama, ElevenLabs all map onto those same files.

Judgment calls:
- **AWS Athena → `assets/tech/aws.svg`** — no Athena mark exists locally; the parent AWS logo is used as an explicit fallback (noted in `_notes`), not passed off as an Athena icon.
- **Anthropic/Claude → `assets/tech/claude.svg`** — `claude.svg` and `anthropic.svg` are byte-identical Anthropic "A" marks; either works.

The library's `-official` PNG variants (swift-official.png, arkit-official.png, xcode-official.png, widgetkit-official.png, etc.) were **not** swapped in: the site already references working icons under those names, and the no-overwrite rule applies. They remain available if a raster "official" look is ever preferred.

## Fetched

**None — web_fetch is effectively restricted for icon payloads.** Attempts, in order:

1. `https://cdn.simpleicons.org/threedotjs` (+ webgl, remotion) → tool returned empty body (`image/svg+xml` is stripped by the markdown converter)
2. `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/threedotjs.svg` → empty (XML stripped even as text/plain)
3. `https://api.iconify.design/simple-icons.json?icons=...` → empty (JSON stripped)
4. `https://example.com` → worked fine, confirming the tool itself is healthy but only renders HTML-as-markdown

Per task rules, no curl/wget/python fallback was attempted; the gaps are recorded instead.

### Ready-to-use CDN slugs for a future pass

The repo's own `Resume-App-Icon/icon-comparison.html` already uses this exact CDN pattern. When fetching becomes possible:

- Three.js → `https://cdn.simpleicons.org/threedotjs/000000`
- WebGL → `https://cdn.simpleicons.org/webgl/990000`
- Remotion → `https://cdn.simpleicons.org/remotion/0B84F3`
- OpenTelemetry → `https://cdn.simpleicons.org/opentelemetry/F5A800`
- Playwright → `https://cdn.simpleicons.org/playwright/2EAD33` (slug confirmed in icon-comparison.html)
- D3.js → `https://cdn.simpleicons.org/d3/F9A03C`
- DSPy, GLM/Zhipu → verify slug existence first (`dspy`, `zhipuai`); may not exist in Simple Icons

## Missing (18 terms, in `_missing`)

- **Fetch-blocked, real logos exist upstream:** Three.js, WebGL, Remotion, OpenTelemetry, Playwright, D3.js
- **Probably no canonical logo / niche:** DSPy, GEPA, "DSPy / GEPA" (data.js currently renders it with `python.svg` as a stand-in), GLM/Zhipu, tart, lume, CommonCrawl
- **Apple frameworks with no distributable mark in the library:** SpriteKit, CreateML, RealityKit, Object Capture, Virtualization.framework

No bad matches were forced for any of these.

## Quality spot-check (11 icons viewed)

Rendered/inspected: **supabase.svg** (valid brand-green bolt, the one copied file), gemini.png (Gemini sparkle), widgetkit.png (Apple widget stack), pinecone.png (arrow-pinecone mark), roomplan.png (Apple RoomPlan), llamaindex.png (llama mark), plus sub-1KB SVGs vercel.svg, azure.svg, elevenlabs.svg, replicate.svg, runpod.svg, flutter.svg, claude.svg/anthropic.svg — all are valid single-path brand marks, none broken or visually wrong. **Zero rejects.**

## Name collisions

None. The single copy (`supabase.svg`) had no existing counterpart. No existing file was overwritten or deleted.

## Library-side observations (no action taken)

- `venmp.png` (23,836 B) is a typo twin of `venmo.png` (same size); `morgan-stenley.jpg` is a typo twin of `morgan-stanley.jpg`
- `runpod` (791 KB, no extension) is an orphan blob next to runpod.{svg,jpg,png,webp}
- `nextjs.svg` vs `next-js.svg` and `coreml.svg` vs `core-ml.svg` duplicate pairs exist in the library; the site consistently uses the un-hyphenated names

## Totals

| Metric | Count |
|---|---|
| Terms mapped in icon-map.json | 65 |
| Matched existing files | 64 term-mappings (63 unique files) |
| Copied from library | 1 (Supabase) |
| Fetched from web | 0 (tool restricted) |
| Missing | 18 |
| Broken data.js refs | 0 |
