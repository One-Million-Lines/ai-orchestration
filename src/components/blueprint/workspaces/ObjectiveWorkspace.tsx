import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, type BlueprintState, type Workflow } from "@/data/types";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function ObjectiveWorkspace({ sectionData, onUpdateData }: Props) {
  const categories = sectionData.categories || [];
  const workflows = sectionData.workflows || [];
  const [wfName, setWfName] = useState("");
  const [wfDesc, setWfDesc] = useState("");
  const [wfGoal, setWfGoal] = useState("");

  const toggleCategory = (cat: string) => {
    const updated = categories.includes(cat) ? categories.filter((c) => c !== cat) : [...categories, cat];
    onUpdateData("categories", updated);
  };

  const addWorkflow = () => {
    if (!wfName.trim()) return;
    const wf: Workflow = {
      id: crypto.randomUUID(),
      name: wfName.trim(),
      description: wfDesc.trim(),
      goal: wfGoal.trim(),
    };
    onUpdateData("workflows", [...workflows, wf]);
    setWfName("");
    setWfDesc("");
    setWfGoal("");
  };

  const removeWorkflow = (id: string) => {
    onUpdateData("workflows", workflows.filter((w) => w.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <label className="text-sm font-medium mb-2 block">Choose focus categories</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                categories.includes(cat)
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/50",
              )}
            >
              {categories.includes(cat) && <Check className="inline h-3 w-3 mr-1" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workflows */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Define workflows <span className="text-muted-foreground font-normal">(2–3 recommended)</span>
        </label>

        {workflows.length > 0 && (
          <div className="space-y-2 mb-4">
            {workflows.map((wf) => (
              <div key={wf.id} className="rounded-lg border bg-muted/30 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{wf.name}</p>
                    {wf.description && <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>}
                    {wf.goal && (
                      <p className="text-xs mt-1">
                        <span className="text-muted-foreground">Goal:</span>{" "}
                        <span className="font-medium text-green-700">{wf.goal}</span>
                      </p>
                    )}
                  </div>
                  <button onClick={() => removeWorkflow(wf.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 rounded-lg border border-dashed p-3">
          <Input value={wfName} onChange={(e) => setWfName(e.target.value)} placeholder="Workflow name (e.g., Inbound Email Handling)" className="h-9" />
          <Input value={wfDesc} onChange={(e) => setWfDesc(e.target.value)} placeholder="Brief description (optional)" className="h-9" />
          <Input value={wfGoal} onChange={(e) => setWfGoal(e.target.value)} placeholder="Business goal (e.g., Reduce handling time by 60%)" className="h-9" />
          <Button variant="outline" size="sm" onClick={addWorkflow} disabled={!wfName.trim()} className="gap-1">
            <Plus className="h-4 w-4" /> Add Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}
