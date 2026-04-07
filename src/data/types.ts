export type Phase = "plan" | "design" | "operate" | "scale";

export interface Section {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  phase: Phase;
  keyQuestion: string | null;
  purpose: string;
  notThis?: string[];
  thisIs?: string;
  guidance: string[];
  examples?: string[];
  outputDescription: string;
  expectedOutputs: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  goal: string;
}

export interface WorkflowMap {
  trigger: string;
  steps: string;
  systems: string;
  people: string;
  bottlenecks: string;
  painPoints: string[];
}

export interface Decision {
  id: string;
  question: string;
  who: string;
  infoNeeded: string;
  autonomyLevel: "auto" | "approval" | "suggest" | "";
}

export interface SystemConnection {
  dataSource: string;
  actions: string;
}

export interface RoleAssignment {
  operators: string;
  workflowOwners: string;
  orchestratorOwner: string;
}

export interface KPI {
  id: string;
  category: "efficiency" | "quality" | "adoption" | "business";
  metric: string;
  target: string;
}

export interface RolloutPhase {
  name: string;
  description: string;
  timeline: string;
  successCriteria: string;
}

export interface BlueprintState {
  activeSection: number;
  completedSections: number[];
  sectionData: {
    // Section 1
    categories?: string[];
    workflows?: Workflow[];
    // Section 2
    workflowMaps?: Record<string, WorkflowMap>;
    // Section 3
    decisions?: Record<string, Decision[]>;
    // Section 4 – uses decisions from section 3 with autonomyLevel
    // Section 5
    flowTemplate?: string;
    flowNotes?: string;
    // Section 6
    systemConnections?: Record<string, SystemConnection>;
    // Section 7
    roleAssignments?: RoleAssignment;
    // Section 8
    feedbackSources?: string[];
    reviewCadence?: string;
    improvementAreas?: string;
    // Section 9
    kpis?: KPI[];
    // Section 10
    rolloutPhases?: RolloutPhase[];
    // Section 11
    scaleStrategy?: string;
    expansionSteps?: string[];
    // Section 12
    neverAutomate?: string[];
    escalationPaths?: string;
    auditRequirements?: string;
    humanFallback?: string;
  };
  metadata: {
    companyName: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const PHASE_COLORS: Record<Phase, string> = {
  plan: "bg-blue-500",
  design: "bg-violet-500",
  operate: "bg-teal-500",
  scale: "bg-amber-500",
};

export const PHASE_TEXT_COLORS: Record<Phase, string> = {
  plan: "text-blue-600",
  design: "text-violet-600",
  operate: "text-teal-600",
  scale: "text-amber-600",
};

export const PHASE_BG_LIGHT: Record<Phase, string> = {
  plan: "bg-blue-50",
  design: "bg-violet-50",
  operate: "bg-teal-50",
  scale: "bg-amber-50",
};

export const PHASE_BORDER: Record<Phase, string> = {
  plan: "border-blue-200",
  design: "border-violet-200",
  operate: "border-teal-200",
  scale: "border-amber-200",
};

export const PHASE_LABELS: Record<Phase, string> = {
  plan: "Plan & Understand",
  design: "Design & Architect",
  operate: "Operate & Measure",
  scale: "Scale & Govern",
};

export const CATEGORIES = [
  "Inbox & Communication",
  "Customer Support",
  "Sales Follow-ups",
  "Finance Operations",
  "Internal Task Coordination",
];

export const AUTONOMY_LEVELS = [
  { value: "auto", label: "Auto-execute", icon: "✅", description: "System handles automatically" },
  { value: "approval", label: "Require Approval", icon: "⚠️", description: "Needs human sign-off" },
  { value: "suggest", label: "Suggest Only", icon: "💡", description: "AI recommends, human decides" },
] as const;

export const KPI_CATEGORIES = [
  { value: "efficiency", label: "Efficiency", examples: ["Time saved", "Tasks automated"] },
  { value: "quality", label: "Quality", examples: ["Error rate", "Rework rate"] },
  { value: "adoption", label: "Adoption", examples: ["% actions accepted", "Override rate"] },
  { value: "business", label: "Business Impact", examples: ["Response time", "Conversion", "Cost reduction"] },
] as const;

export function createDefaultState(): BlueprintState {
  return {
    activeSection: 0,
    completedSections: [],
    sectionData: {
      categories: [],
      workflows: [],
      workflowMaps: {},
      decisions: {},
      flowTemplate: "",
      flowNotes: "",
      systemConnections: {},
      roleAssignments: { operators: "", workflowOwners: "", orchestratorOwner: "" },
      feedbackSources: [],
      reviewCadence: "weekly",
      improvementAreas: "",
      kpis: [],
      rolloutPhases: [
        { name: "Phase 1: Assisted Mode", description: "", timeline: "", successCriteria: "" },
        { name: "Phase 2: Partial Autonomy", description: "", timeline: "", successCriteria: "" },
        { name: "Phase 3: Controlled Autonomy", description: "", timeline: "", successCriteria: "" },
      ],
      scaleStrategy: "",
      expansionSteps: [],
      neverAutomate: [],
      escalationPaths: "",
      auditRequirements: "",
      humanFallback: "",
    },
    metadata: {
      companyName: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}
