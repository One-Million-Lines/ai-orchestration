import { Textarea } from "@/components/ui/textarea";
import type { BlueprintState } from "@/data/types";
import { User, Users as UsersIcon, Crown } from "lucide-react";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function OwnershipWorkspace({ sectionData, onUpdateData }: Props) {
  const roles = sectionData.roleAssignments || { operators: "", workflowOwners: "", orchestratorOwner: "" };

  const update = (field: string, value: string) => {
    onUpdateData("roleAssignments", { ...roles, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">1. Operators (Daily Users)</p>
            <p className="text-xs text-muted-foreground">Receive outputs, approve/override AI actions</p>
          </div>
        </div>
        <Textarea
          value={roles.operators}
          onChange={(e) => update("operators", e.target.value)}
          placeholder="Who are the daily users? Name roles/people per workflow..."
          rows={3}
        />
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
            <UsersIcon className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-medium">2. Workflow Owners (Team Leads)</p>
            <p className="text-xs text-muted-foreground">Define how things work, adjust rules</p>
          </div>
        </div>
        <Textarea
          value={roles.workflowOwners}
          onChange={(e) => update("workflowOwners", e.target.value)}
          placeholder="Who owns each workflow? Who can change the rules?"
          rows={3}
        />
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <Crown className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium">3. Orchestrator Owner (Central)</p>
            <p className="text-xs text-muted-foreground">Governance, performance tracking, expansion</p>
          </div>
        </div>
        <Textarea
          value={roles.orchestratorOwner}
          onChange={(e) => update("orchestratorOwner", e.target.value)}
          placeholder="Who has overall governance? Who tracks performance and decides when to expand?"
          rows={3}
        />
      </div>
    </div>
  );
}
