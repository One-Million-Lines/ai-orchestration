import { Textarea } from "@/components/ui/textarea";
import type { BlueprintState } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function FlowDesignWorkspace({ sectionData, onUpdateData }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/50 p-4 space-y-2">
        <p className="text-sm font-medium">Standard Orchestration Pattern:</p>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {["1. Trigger Detected", "2. Context Gathered", "3. Decision Made", "4. Action Executed", "5. Feedback Captured"].map(
            (step, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-muted-foreground">→</span>}
                <span className="rounded bg-white border px-2 py-1 font-medium">{step}</span>
              </span>
            ),
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">
          How does this pattern apply to your workflows?
        </label>
        <Textarea
          value={sectionData.flowTemplate || ""}
          onChange={(e) => onUpdateData("flowTemplate", e.target.value)}
          placeholder="Describe how each step works for your specific workflows. How is context gathered? How are decisions triggered? What actions follow?"
          rows={6}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">
          Exceptions & Special Cases
        </label>
        <Textarea
          value={sectionData.flowNotes || ""}
          onChange={(e) => onUpdateData("flowNotes", e.target.value)}
          placeholder="Any edge cases, exceptions, or workflow-specific variations from the standard pattern?"
          rows={4}
        />
      </div>
    </div>
  );
}
