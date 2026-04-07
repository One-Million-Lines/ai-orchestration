import { Textarea } from "@/components/ui/textarea";
import { DynamicList } from "../DynamicList";
import type { BlueprintState } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function GovernanceWorkspace({ sectionData, onUpdateData }: Props) {
  return (
    <div className="space-y-5">
      <DynamicList
        items={sectionData.neverAutomate || []}
        onChange={(items) => onUpdateData("neverAutomate", items)}
        label="🚫 Never Automate — What is OFF LIMITS?"
        placeholder="e.g., Legal decisions, Terminations, Purchases over $10k..."
      />

      <div>
        <label className="text-sm font-medium mb-1 block">Escalation Paths</label>
        <Textarea
          value={sectionData.escalationPaths || ""}
          onChange={(e) => onUpdateData("escalationPaths", e.target.value)}
          placeholder="When AI is unsure or encounters edge cases, where does it escalate? Define the chain."
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Audit Logging Requirements</label>
        <Textarea
          value={sectionData.auditRequirements || ""}
          onChange={(e) => onUpdateData("auditRequirements", e.target.value)}
          placeholder="What should be logged? Every AI action must be traceable — what was done, why, and what data was used."
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Human Fallback Procedures</label>
        <Textarea
          value={sectionData.humanFallback || ""}
          onChange={(e) => onUpdateData("humanFallback", e.target.value)}
          placeholder="How does the system gracefully hand off to a person? What does the human see when they receive a handoff?"
          rows={3}
        />
      </div>
    </div>
  );
}
