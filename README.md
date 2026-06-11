# AI Orchestration

## Project Name

AI Orchestration

## What it does

AI Orchestration is a guided blueprint builder for teams designing AI-enabled workflows. It walks the user through a sequence of sections that cover goals, current workflows, decisions, action boundaries, systems, ownership, feedback, KPIs, rollout, and governance.

## Why it exists

The project turns a broad AI orchestration effort into a structured execution document. Instead of a blank page, users fill out a repeatable framework section by section.

## Features

- Four-phase blueprint flow: plan, design, operate, and scale
- Fourteen structured sections with prompts, guidance, examples, and expected outputs
- Progress header and section sidebar navigation
- Local browser persistence
- Export to JSON
- Reset workflow with confirmation
- Floating navigation links to related demos

## How it works

- `src/data/sections.ts` defines each section's metadata, prompts, guidance, and expected outputs.
- `src/hooks/useBlueprintStore.tsx` stores the working blueprint in local storage and exposes update, reset, and export helpers.
- `src/components/blueprint/*` renders the header, sidebar, dynamic inputs, and section workspace.
- `src/App.tsx` wires the provider, layout, export behavior, and footer.
- The app is fully client-side. No backend is required.

## Tech stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 3
- Radix UI / shadcn-style UI components
- Lucide React

## Project structure

```text
src/
├── components/
│   ├── blueprint/   # guided blueprint UI
│   ├── ui/          # shared UI primitives
│   └── FloatingNav.tsx
├── data/
│   ├── sections.ts  # section definitions
│   └── types.ts
├── hooks/
│   └── useBlueprintStore.tsx
├── lib/
├── App.tsx
└── main.tsx
```

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The Vite dev server is configured for port `5309`.

### Build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Configuration

- No custom environment variables are required.
- In production, Vite serves the app from `/demo/ai-orchestration/`.
- `APP_VERSION` is injected from `package.json` at build time.

## Usage

1. Open the app and enter a company name if needed.
2. Work through the sections in order.
3. Fill in section data and mark sections complete as you go.
4. Export the resulting blueprint as JSON.
5. Reset the blueprint if you want to start over.

## Development

Useful commands:

```bash
npm run dev
npm run lint
npm run build
```

If you add or change sections, keep `sections.ts`, data types, and the rendering components aligned.

## Roadmap

There is no formal public roadmap documented in this repository yet. The current implementation focuses on the guided blueprint flow and JSON export.

## Contributing

Contributions are welcome. Please review [CONTRIBUTING.md](./CONTRIBUTING.md) and [public.md](./public.md) before opening a pull request.

## License

This project is available under the [MIT License](./LICENSE).
