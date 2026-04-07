import { Textarea } from "@/components/ui/textarea";
import { DynamicList } from "../DynamicList";
import type { BlueprintState } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function ScaleWorkspace({ sectionData, onUpdateData }: Props) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-sm text-amber-800">
          <strong>Remember:</strong> Deepen 1 workflow → increase autonomy → stabilize → then expand. Do NOT scale by adding more workflows everywhere at once.
        </p>
      </div>

      <DynamicList
        items={sectionData.expansionSteps || []}
        onChange={(items) => onUpdateData("expansionSteps", items)}
        label="Workflow Expansion Order"
        placeholder="e.g., 1st: Email handling → 2nd: Lead follow-up → 3rd: Support triage"
      />

      <div>
        <label className="text-sm font-medium mb-1 block">Scale Strategy Notes</label>
        <Textarea
          value={sectionData.scaleStrategy || ""}
          onChange={(e) => onUpdateData("scaleStrategy", e.target.value)}
          placeholder="When is a workflow 'stable' enough to expand? What criteria do you use? What's the target timeline?"
          rows={5}
        />
      </div>
    </div>
  );
}
