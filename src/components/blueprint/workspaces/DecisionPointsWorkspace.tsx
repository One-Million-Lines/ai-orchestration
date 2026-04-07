import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlueprintState, Decision } from "@/data/types";
import { Plus, X } from "lucide-react";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function DecisionPointsWorkspace({ sectionData, onUpdateData }: Props) {
  const workflows = sectionData.workflows || [];
  const decisions = sectionData.decisions || {};
  const [newQ, setNewQ] = useState("");
  const [newWho, setNewWho] = useState("");
  const [newInfo, setNewInfo] = useState("");

  if (workflows.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No workflows defined yet. Go to Section 1 first.</p>;
  }

  const getDecisions = (wfId: string): Decision[] => decisions[wfId] || [];

  const addDecision = (wfId: string) => {
    if (!newQ.trim()) return;
    const d: Decision = { id: crypto.randomUUID(), question: newQ.trim(), who: newWho.trim(), infoNeeded: newInfo.trim(), autonomyLevel: "" };
    onUpdateData("decisions", { ...decisions, [wfId]: [...getDecisions(wfId), d] });
    setNewQ(""); setNewWho(""); setNewInfo("");
  };

  const removeDecision = (wfId: string, dId: string) => {
    onUpdateData("decisions", { ...decisions, [wfId]: getDecisions(wfId).filter((d) => d.id !== dId) });
  };

  return (
    <Tabs defaultValue={workflows[0]?.id}>
      <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0 mb-4">
        {workflows.map((wf) => (
          <TabsTrigger key={wf.id} value={wf.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-3 py-1 text-xs border">
            {wf.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {workflows.map((wf) => (
        <TabsContent key={wf.id} value={wf.id} className="space-y-3">
          {getDecisions(wf.id).map((d) => (
            <div key={d.id} className="rounded-lg border bg-muted/30 p-3 space-y-1">
              <div className="flex items-start justify-between">
                <p className="font-medium text-sm">❓ {d.question}</p>
                <button onClick={() => removeDecision(wf.id, d.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {d.who && <p className="text-xs text-muted-foreground">Who decides: {d.who}</p>}
              {d.infoNeeded && <p className="text-xs text-muted-foreground">Info needed: {d.infoNeeded}</p>}
            </div>
          ))}

          <div className="space-y-2 rounded-lg border border-dashed p-3">
            <Input value={newQ} onChange={(e) => setNewQ(e.target.value)} placeholder="Decision question (e.g., Is this email urgent?)" className="h-9" />
            <div className="grid grid-cols-2 gap-2">
              <Input value={newWho} onChange={(e) => setNewWho(e.target.value)} placeholder="Who makes this decision?" className="h-9" />
              <Input value={newInfo} onChange={(e) => setNewInfo(e.target.value)} placeholder="Info needed to decide" className="h-9" />
            </div>
            <Button variant="outline" size="sm" onClick={() => addDecision(wf.id)} disabled={!newQ.trim()} className="gap-1">
              <Plus className="h-4 w-4" /> Add Decision
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
