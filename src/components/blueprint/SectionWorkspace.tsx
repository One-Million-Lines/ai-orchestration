import type { BlueprintState } from "@/data/types";
import { IntroWorkspace } from "./workspaces/IntroWorkspace";
import { ObjectiveWorkspace } from "./workspaces/ObjectiveWorkspace";
import { WorkflowMapWorkspace } from "./workspaces/WorkflowMapWorkspace";
import { DecisionPointsWorkspace } from "./workspaces/DecisionPointsWorkspace";
import { BoundariesWorkspace } from "./workspaces/BoundariesWorkspace";
import { FlowDesignWorkspace } from "./workspaces/FlowDesignWorkspace";
import { SystemsWorkspace } from "./workspaces/SystemsWorkspace";
import { OwnershipWorkspace } from "./workspaces/OwnershipWorkspace";
import { FeedbackWorkspace } from "./workspaces/FeedbackWorkspace";
import { KPIWorkspace } from "./workspaces/KPIWorkspace";
import { RolloutWorkspace } from "./workspaces/RolloutWorkspace";
import { ScaleWorkspace } from "./workspaces/ScaleWorkspace";
import { GovernanceWorkspace } from "./workspaces/GovernanceWorkspace";
import { SummaryWorkspace } from "./workspaces/SummaryWorkspace";

interface SectionWorkspaceProps {
  sectionId: number;
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

export function SectionWorkspace({ sectionId, sectionData, onUpdateData }: SectionWorkspaceProps) {
  const props = { sectionData, onUpdateData };

  switch (sectionId) {
    case 0:
      return <IntroWorkspace />;
    case 1:
      return <ObjectiveWorkspace {...props} />;
    case 2:
      return <WorkflowMapWorkspace {...props} />;
    case 3:
      return <DecisionPointsWorkspace {...props} />;
    case 4:
      return <BoundariesWorkspace {...props} />;
    case 5:
      return <FlowDesignWorkspace {...props} />;
    case 6:
      return <SystemsWorkspace {...props} />;
    case 7:
      return <OwnershipWorkspace {...props} />;
    case 8:
      return <FeedbackWorkspace {...props} />;
    case 9:
      return <KPIWorkspace {...props} />;
    case 10:
      return <RolloutWorkspace {...props} />;
    case 11:
      return <ScaleWorkspace {...props} />;
    case 12:
      return <GovernanceWorkspace {...props} />;
    case 13:
      return <SummaryWorkspace {...props} />;
    default:
      return <p className="text-sm text-muted-foreground">Section not found.</p>;
  }
}
