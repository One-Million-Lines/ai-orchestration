import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AUTONOMY_LEVELS, type BlueprintState, type Decision } from "@/data/types";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function BoundariesWorkspace({ sectionData, onUpdateData }: Props) {
  const workflows = sectionData.workflows || [];
  const decisions = sectionData.decisions || {};

  const allDecisions = workflows.flatMap((wf) =>
    (decisions[wf.id] || []).map((d) => ({ ...d, workflowName: wf.name, workflowId: wf.id })),
  );

  if (allDecisions.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No decisions defined yet. Complete Section 3 first.</p>;
  }

  const updateLevel = (wfId: string, dId: string, level: Decision["autonomyLevel"]) => {
    const wfDecisions = (decisions[wfId] || []).map((d) =>
      d.id === dId ? { ...d, autonomyLevel: level } : d,
    );
    onUpdateData("decisions", { ...decisions, [wfId]: wfDecisions });
  };

  const grouped = workflows
    .filter((wf) => (decisions[wf.id] || []).length > 0)
    .map((wf) => ({ workflow: wf, decisions: decisions[wf.id] || [] }));

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Classify each decision's autonomy level:</p>

      {grouped.map(({ workflow, decisions: wfDecisions }) => (
        <div key={workflow.id} className="space-y-2">
          <h4 className="text-sm font-medium">{workflow.name}</h4>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-3 py-2 font-medium">Decision</th>
                  {AUTONOMY_LEVELS.map((l) => (
                    <th key={l.value} className="px-3 py-2 font-medium text-center w-28">
                      {l.icon} {l.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wfDecisions.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-3 py-2">{d.question}</td>
                    {AUTONOMY_LEVELS.map((l) => (
                      <td key={l.value} className="px-3 py-2 text-center">
                        <button
                          onClick={() => updateLevel(workflow.id, d.id, l.value as Decision["autonomyLevel"])}
                          className={cn(
                            "h-5 w-5 rounded-full border-2 inline-flex items-center justify-center transition-colors",
                            d.autonomyLevel === l.value
                              ? l.value === "auto"
                                ? "border-green-500 bg-green-500"
                                : l.value === "approval"
                                  ? "border-amber-500 bg-amber-500"
                                  : "border-blue-500 bg-blue-500"
                              : "border-muted-foreground/30 hover:border-muted-foreground/60",
                          )}
                        >
                          {d.autonomyLevel === l.value && <div className="h-2 w-2 rounded-full bg-white" />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {AUTONOMY_LEVELS.map((l) => {
          const count = allDecisions.filter((d) => d.autonomyLevel === l.value).length;
          return (
            <div key={l.value} className="rounded-lg border p-3 text-center">
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{l.icon} {l.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
