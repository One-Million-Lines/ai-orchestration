import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DynamicList } from "../DynamicList";
import type { BlueprintState, WorkflowMap } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

const emptyMap: WorkflowMap = { trigger: "", steps: "", systems: "", people: "", bottlenecks: "", painPoints: [] };

export function WorkflowMapWorkspace({ sectionData, onUpdateData }: Props) {
  const workflows = sectionData.workflows || [];
  const maps = sectionData.workflowMaps || {};

  if (workflows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No workflows defined yet. Go to Section 1 to add workflows first.
      </p>
    );
  }

  const getMap = (wfId: string): WorkflowMap => maps[wfId] || emptyMap;

  const updateMap = (wfId: string, field: keyof WorkflowMap, value: any) => {
    const current = getMap(wfId);
    onUpdateData("workflowMaps", { ...maps, [wfId]: { ...current, [field]: value } });
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

      {workflows.map((wf) => {
        const m = getMap(wf.id);
        return (
          <TabsContent key={wf.id} value={wf.id} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Trigger — What starts this workflow?</label>
              <Textarea value={m.trigger} onChange={(e) => updateMap(wf.id, "trigger", e.target.value)} placeholder="e.g., Email arrives in shared inbox" rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Steps — What actually happens?</label>
              <Textarea value={m.steps} onChange={(e) => updateMap(wf.id, "steps", e.target.value)} placeholder="List each step: check email → categorize → forward → respond..." rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Systems involved</label>
                <Textarea value={m.systems} onChange={(e) => updateMap(wf.id, "systems", e.target.value)} placeholder="Gmail, CRM, Slack..." rows={2} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">People involved</label>
                <Textarea value={m.people} onChange={(e) => updateMap(wf.id, "people", e.target.value)} placeholder="Support team, manager..." rows={2} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bottlenecks & Delays</label>
              <Textarea value={m.bottlenecks} onChange={(e) => updateMap(wf.id, "bottlenecks", e.target.value)} placeholder="Where does work get stuck? What takes too long?" rows={3} />
            </div>
            <DynamicList items={m.painPoints} onChange={(items) => updateMap(wf.id, "painPoints", items)} label="Pain Points" placeholder="Add a pain point..." />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
