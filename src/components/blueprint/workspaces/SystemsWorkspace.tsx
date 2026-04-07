import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlueprintState, SystemConnection } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

const emptyConn: SystemConnection = { dataSource: "", actions: "" };

export function SystemsWorkspace({ sectionData, onUpdateData }: Props) {
  const workflows = sectionData.workflows || [];
  const connections = sectionData.systemConnections || {};

  if (workflows.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No workflows defined yet. Go to Section 1 first.</p>;
  }

  const getConn = (wfId: string): SystemConnection => connections[wfId] || emptyConn;

  const updateConn = (wfId: string, field: keyof SystemConnection, value: string) => {
    const current = getConn(wfId);
    onUpdateData("systemConnections", { ...connections, [wfId]: { ...current, [field]: value } });
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
        const conn = getConn(wf.id);
        return (
          <TabsContent key={wf.id} value={wf.id} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Data Sources — Where does data come from?</label>
              <Textarea
                value={conn.dataSource}
                onChange={(e) => updateConn(wf.id, "dataSource", e.target.value)}
                placeholder="e.g., Gmail inbox, CRM contact records, website forms..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Action Destinations — Where do outputs go?</label>
              <Textarea
                value={conn.actions}
                onChange={(e) => updateConn(wf.id, "actions", e.target.value)}
                placeholder="e.g., CRM update, task creation in Asana, email reply via Gmail, Slack notification..."
                rows={3}
              />
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
