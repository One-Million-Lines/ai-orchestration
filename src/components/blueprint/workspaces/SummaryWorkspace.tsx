import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { sections } from "@/data/sections";
import { AUTONOMY_LEVELS, KPI_CATEGORIES, type BlueprintState } from "@/data/types";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

function SummarySection({ title, children, empty }: { title: string; children: React.ReactNode; empty?: boolean }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        {title}
        {empty && <span className="text-xs text-amber-600 font-normal">(not yet completed)</span>}
      </h4>
      {empty ? (
        <p className="text-xs text-muted-foreground italic">No data entered yet.</p>
      ) : (
        children
      )}
    </div>
  );
}

export function SummaryWorkspace({ sectionData }: Props) {
  const [copied, setCopied] = useState(false);

  const workflows = sectionData.workflows || [];
  const decisions = sectionData.decisions || {};
  const maps = sectionData.workflowMaps || {};
  const connections = sectionData.systemConnections || {};
  const roles = sectionData.roleAssignments || { operators: "", workflowOwners: "", orchestratorOwner: "" };
  const kpis = sectionData.kpis || [];
  const phases = sectionData.rolloutPhases || [];

  const buildTextSummary = () => {
    let text = "AI ORCHESTRATION BLUEPRINT\n";
    text += "=".repeat(40) + "\n\n";

    text += "1. WORKFLOW SELECTION\n";
    text += "-".repeat(20) + "\n";
    if (sectionData.categories?.length) text += `Categories: ${sectionData.categories.join(", ")}\n`;
    workflows.forEach((wf) => {
      text += `\n• ${wf.name}\n`;
      if (wf.description) text += `  Description: ${wf.description}\n`;
      if (wf.goal) text += `  Goal: ${wf.goal}\n`;
    });

    text += "\n\n2. WORKFLOW MAPS\n";
    text += "-".repeat(20) + "\n";
    workflows.forEach((wf) => {
      const m = maps[wf.id];
      if (!m) return;
      text += `\n• ${wf.name}\n`;
      if (m.trigger) text += `  Trigger: ${m.trigger}\n`;
      if (m.steps) text += `  Steps: ${m.steps}\n`;
      if (m.systems) text += `  Systems: ${m.systems}\n`;
      if (m.people) text += `  People: ${m.people}\n`;
      if (m.bottlenecks) text += `  Bottlenecks: ${m.bottlenecks}\n`;
      if (m.painPoints?.length) text += `  Pain Points: ${m.painPoints.join("; ")}\n`;
    });

    text += "\n\n3. DECISION MATRIX\n";
    text += "-".repeat(20) + "\n";
    workflows.forEach((wf) => {
      const decs = decisions[wf.id] || [];
      if (!decs.length) return;
      text += `\n• ${wf.name}\n`;
      decs.forEach((d) => {
        const level = AUTONOMY_LEVELS.find((l) => l.value === d.autonomyLevel);
        text += `  ${d.question} → ${level ? `${level.icon} ${level.label}` : "Not classified"}\n`;
      });
    });

    text += "\n\n4. SYSTEM MAP\n";
    text += "-".repeat(20) + "\n";
    workflows.forEach((wf) => {
      const conn = connections[wf.id];
      if (!conn) return;
      text += `\n• ${wf.name}\n`;
      if (conn.dataSource) text += `  Data from: ${conn.dataSource}\n`;
      if (conn.actions) text += `  Actions to: ${conn.actions}\n`;
    });

    text += "\n\n5. OWNERSHIP MODEL\n";
    text += "-".repeat(20) + "\n";
    if (roles.operators) text += `Operators: ${roles.operators}\n`;
    if (roles.workflowOwners) text += `Workflow Owners: ${roles.workflowOwners}\n`;
    if (roles.orchestratorOwner) text += `Orchestrator Owner: ${roles.orchestratorOwner}\n`;

    text += "\n\n6. KPI FRAMEWORK\n";
    text += "-".repeat(20) + "\n";
    KPI_CATEGORIES.forEach((cat) => {
      const catKpis = kpis.filter((k) => k.category === cat.value);
      if (catKpis.length) {
        text += `\n${cat.label}:\n`;
        catKpis.forEach((k) => {
          text += `  • ${k.metric}${k.target ? ` (Target: ${k.target})` : ""}\n`;
        });
      }
    });

    text += "\n\n7. ROLLOUT PLAN\n";
    text += "-".repeat(20) + "\n";
    phases.forEach((p) => {
      text += `\n${p.name}\n`;
      if (p.description) text += `  ${p.description}\n`;
      if (p.timeline) text += `  Timeline: ${p.timeline}\n`;
      if (p.successCriteria) text += `  Success: ${p.successCriteria}\n`;
    });

    if (sectionData.neverAutomate?.length) {
      text += "\n\n8. GOVERNANCE\n";
      text += "-".repeat(20) + "\n";
      text += `Never automate: ${sectionData.neverAutomate.join(", ")}\n`;
      if (sectionData.escalationPaths) text += `Escalation: ${sectionData.escalationPaths}\n`;
    }

    return text;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(buildTextSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allDecisions = workflows.flatMap((wf) => (decisions[wf.id] || []).map((d) => ({ ...d, wfName: wf.name })));
  const classifiedCount = allDecisions.filter((d) => d.autonomyLevel).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Your complete blueprint, aggregated from all sections.
        </p>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Text"}
        </Button>
      </div>

      <SummarySection title="1. Workflow Selection & Goals" empty={workflows.length === 0}>
        <div className="space-y-2">
          {sectionData.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {sectionData.categories.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
              ))}
            </div>
          )}
          {workflows.map((wf) => (
            <div key={wf.id} className="rounded-md border bg-muted/30 p-2 text-sm">
              <p className="font-medium">{wf.name}</p>
              {wf.goal && <p className="text-xs text-green-700">Goal: {wf.goal}</p>}
            </div>
          ))}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="2. Workflow Maps" empty={Object.keys(maps).length === 0}>
        <div className="space-y-2">
          {workflows.map((wf) => {
            const m = maps[wf.id];
            if (!m) return null;
            return (
              <div key={wf.id} className="rounded-md border p-2 text-xs space-y-1">
                <p className="font-medium text-sm">{wf.name}</p>
                {m.trigger && <p><span className="text-muted-foreground">Trigger:</span> {m.trigger}</p>}
                {m.painPoints?.length > 0 && (
                  <p><span className="text-muted-foreground">Pain points:</span> {m.painPoints.join(", ")}</p>
                )}
              </div>
            );
          })}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="3. Decision Matrix" empty={allDecisions.length === 0}>
        <div className="text-xs space-y-1">
          <p className="text-muted-foreground mb-2">{classifiedCount}/{allDecisions.length} decisions classified</p>
          {allDecisions.map((d) => {
            const level = AUTONOMY_LEVELS.find((l) => l.value === d.autonomyLevel);
            return (
              <div key={d.id} className="flex items-center gap-2">
                <span>{level?.icon || "○"}</span>
                <span className="flex-1">{d.question}</span>
                <span className="text-muted-foreground">{d.wfName}</span>
              </div>
            );
          })}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="4. System Map" empty={Object.keys(connections).length === 0}>
        <div className="space-y-2">
          {workflows.map((wf) => {
            const conn = connections[wf.id];
            if (!conn) return null;
            return (
              <div key={wf.id} className="rounded-md border p-2 text-xs space-y-1">
                <p className="font-medium text-sm">{wf.name}</p>
                {conn.dataSource && <p><span className="text-muted-foreground">In:</span> {conn.dataSource}</p>}
                {conn.actions && <p><span className="text-muted-foreground">Out:</span> {conn.actions}</p>}
              </div>
            );
          })}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="5. Ownership Model" empty={!roles.operators && !roles.workflowOwners && !roles.orchestratorOwner}>
        <div className="text-xs space-y-1">
          {roles.operators && <p><span className="text-muted-foreground">Operators:</span> {roles.operators}</p>}
          {roles.workflowOwners && <p><span className="text-muted-foreground">Workflow Owners:</span> {roles.workflowOwners}</p>}
          {roles.orchestratorOwner && <p><span className="text-muted-foreground">Orchestrator:</span> {roles.orchestratorOwner}</p>}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="6. KPI Framework" empty={kpis.length === 0}>
        <div className="grid grid-cols-2 gap-2">
          {KPI_CATEGORIES.map((cat) => {
            const catKpis = kpis.filter((k) => k.category === cat.value);
            if (!catKpis.length) return null;
            return (
              <div key={cat.value} className="rounded-md border p-2 text-xs">
                <p className="font-medium text-sm mb-1">{cat.label}</p>
                {catKpis.map((k) => (
                  <p key={k.id}>{k.metric}{k.target && <span className="text-muted-foreground"> → {k.target}</span>}</p>
                ))}
              </div>
            );
          })}
        </div>
      </SummarySection>

      <Separator />

      <SummarySection title="7. Rollout Plan" empty={phases.every((p) => !p.description)}>
        <div className="space-y-2">
          {phases.map((p, i) => (
            <div key={i} className="rounded-md border p-2 text-xs space-y-1">
              <p className="font-medium text-sm">{p.name}</p>
              {p.description && <p>{p.description}</p>}
              <div className="flex gap-4 text-muted-foreground">
                {p.timeline && <span>Timeline: {p.timeline}</span>}
                {p.successCriteria && <span>Success: {p.successCriteria}</span>}
              </div>
            </div>
          ))}
        </div>
      </SummarySection>
    </div>
  );
}
