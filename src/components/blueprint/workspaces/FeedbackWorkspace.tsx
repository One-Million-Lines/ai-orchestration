import { Textarea } from "@/components/ui/textarea";
import { DynamicList } from "../DynamicList";
import { cn } from "@/lib/utils";
import type { BlueprintState } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

const CADENCE_OPTIONS = ["weekly", "bi-weekly", "monthly"];

const DEFAULT_SOURCES = [
  "Approval vs rejection rates",
  "Manual overrides",
  "Error corrections",
  "User satisfaction feedback",
  "Time-to-resolve changes",
];

export function FeedbackWorkspace({ sectionData, onUpdateData }: Props) {
  const sources = sectionData.feedbackSources || [];
  const cadence = sectionData.reviewCadence || "weekly";
  const areas = sectionData.improvementAreas || "";

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium mb-2 block">Feedback Sources to Capture</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {DEFAULT_SOURCES.map((src) => (
            <button
              key={src}
              onClick={() => {
                const updated = sources.includes(src) ? sources.filter((s) => s !== src) : [...sources, src];
                onUpdateData("feedbackSources", updated);
              }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                sources.includes(src)
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "text-muted-foreground hover:border-teal-300",
              )}
            >
              {src}
            </button>
          ))}
        </div>
        <DynamicList items={sources.filter((s) => !DEFAULT_SOURCES.includes(s))} onChange={(custom) => {
          const defaults = sources.filter((s) => DEFAULT_SOURCES.includes(s));
          onUpdateData("feedbackSources", [...defaults, ...custom]);
        }} placeholder="Add custom feedback source..." />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Review Cadence</label>
        <div className="flex gap-2">
          {CADENCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onUpdateData("reviewCadence", opt)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm capitalize transition-colors",
                cadence === opt ? "border-primary bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:border-primary/50",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">How will feedback improve the system?</label>
        <Textarea
          value={areas}
          onChange={(e) => onUpdateData("improvementAreas", e.target.value)}
          placeholder="Describe how you'll use feedback to improve decisions, adjust boundaries, and refine workflows..."
          rows={4}
        />
      </div>
    </div>
  );
}
