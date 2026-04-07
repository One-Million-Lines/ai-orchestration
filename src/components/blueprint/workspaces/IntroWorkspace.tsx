import { Sparkles } from "lucide-react";

export function IntroWorkspace() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
        <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
        <div className="space-y-2 text-sm">
          <p className="font-medium">Welcome to your AI Orchestration Blueprint.</p>
          <p className="text-muted-foreground">
            This tool will guide you through 13 sections to build a complete execution plan for orchestrating AI in your business workflows.
          </p>
          <p className="text-muted-foreground">
            Each section builds on the previous one. Fill in your context, mark sections complete as you go, and watch your blueprint come together.
          </p>
          <p className="text-muted-foreground">
            Your progress is saved automatically. You can export the full blueprint at any time.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border p-3">
          <p className="font-medium text-blue-600 mb-1">Plan & Understand</p>
          <p className="text-xs text-muted-foreground">Sections 0–3: Define what to orchestrate</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-medium text-violet-600 mb-1">Design & Architect</p>
          <p className="text-xs text-muted-foreground">Sections 4–6: Build the orchestration model</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-medium text-teal-600 mb-1">Operate & Measure</p>
          <p className="text-xs text-muted-foreground">Sections 7–9: Run and track performance</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-medium text-amber-600 mb-1">Scale & Govern</p>
          <p className="text-xs text-muted-foreground">Sections 10–13: Expand and deliver</p>
        </div>
      </div>
    </div>
  );
}
