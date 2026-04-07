import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlueprintState, RolloutPhase } from "@/data/types";
import { Zap, Shield, Rocket } from "lucide-react";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

const phaseIcons = [Zap, Shield, Rocket];
const phaseColors = ["border-green-200 bg-green-50", "border-amber-200 bg-amber-50", "border-blue-200 bg-blue-50"];
const phaseDescriptions = [
  "AI suggests, humans approve everything. Build trust and validate accuracy.",
  "Low-risk actions automated, high-risk still require approval. Measure impact.",
  "Broader automation with active monitoring. Continuous improvement loop active.",
];

export function RolloutWorkspace({ sectionData, onUpdateData }: Props) {
  const phases = sectionData.rolloutPhases || [
    { name: "Phase 1: Assisted Mode", description: "", timeline: "", successCriteria: "" },
    { name: "Phase 2: Partial Autonomy", description: "", timeline: "", successCriteria: "" },
    { name: "Phase 3: Controlled Autonomy", description: "", timeline: "", successCriteria: "" },
  ];

  const updatePhase = (index: number, field: keyof RolloutPhase, value: string) => {
    const updated = phases.map((p, i) => (i === index ? { ...p, [field]: value } : p));
    onUpdateData("rolloutPhases", updated);
  };

  return (
    <div className="space-y-4">
      {phases.map((phase, i) => {
        const Icon = phaseIcons[i];
        return (
          <div key={i} className={`rounded-lg border-2 p-4 space-y-3 ${phaseColors[i]}`}>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <h4 className="font-medium">{phase.name}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{phaseDescriptions[i]}</p>

            <div>
              <label className="text-xs font-medium mb-1 block">What will you do in this phase?</label>
              <Textarea
                value={phase.description}
                onChange={(e) => updatePhase(i, "description", e.target.value)}
                placeholder="Describe the scope and approach for this phase..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Timeline</label>
                <Input
                  value={phase.timeline}
                  onChange={(e) => updatePhase(i, "timeline", e.target.value)}
                  placeholder="e.g., Weeks 1–4"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Success Criteria</label>
                <Input
                  value={phase.successCriteria}
                  onChange={(e) => updatePhase(i, "successCriteria", e.target.value)}
                  placeholder="e.g., 90% accuracy, < 5% override rate"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
