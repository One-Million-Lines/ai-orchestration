import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { sections } from "@/data/sections";
import { PHASE_COLORS, PHASE_TEXT_COLORS, PHASE_BG_LIGHT, PHASE_BORDER, PHASE_LABELS } from "@/data/types";
import {
  Compass, Target, Map, GitBranch, Shield, Workflow, Link,
  Users, RefreshCw, BarChart3, Rocket, TrendingUp, Lock, FileText,
  ChevronLeft, ChevronRight, Check, Circle, Lightbulb, BookOpen,
} from "lucide-react";
import { SectionWorkspace } from "./SectionWorkspace";
import type { Section, BlueprintState } from "@/data/types";

const iconMap: Record<string, any> = {
  Compass, Target, Map, GitBranch, Shield, Workflow, Link,
  Users, RefreshCw, BarChart3, Rocket, TrendingUp, Lock, FileText,
};

interface SectionViewProps {
  section: Section;
  isCompleted: boolean;
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
  onToggleComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function SectionView({
  section,
  isCompleted,
  sectionData,
  onUpdateData,
  onToggleComplete,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
}: SectionViewProps) {
  const Icon = iconMap[section.icon] || Compass;
  const phase = section.phase;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 lg:p-8">
      {/* Section Header */}
      <div className={cn("rounded-xl border-2 p-6", PHASE_BORDER[phase], PHASE_BG_LIGHT[phase])}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", PHASE_COLORS[phase])}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={cn("text-xs", PHASE_TEXT_COLORS[phase])}>
                  {PHASE_LABELS[phase]}
                </Badge>
                <span className="text-xs text-muted-foreground">Section {section.id} of {sections.length - 1}</span>
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{section.subtitle}</p>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <Check className="h-3.5 w-3.5" />
              Complete
            </div>
          )}
        </div>

        {section.keyQuestion && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-white/60 p-3">
            <Lightbulb className={cn("mt-0.5 h-4 w-4 shrink-0", PHASE_TEXT_COLORS[phase])} />
            <p className="text-sm font-medium">{section.keyQuestion}</p>
          </div>
        )}
      </div>

      {/* Purpose */}
      <p className="text-sm text-muted-foreground leading-relaxed">{section.purpose}</p>

      {/* Not this / This is (section 0) */}
      {section.notThis && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 rounded-lg border border-red-100 bg-red-50/50 p-4">
            <p className="text-xs font-semibold text-red-600 uppercase mb-2">Not this</p>
            <ul className="space-y-1">
              {section.notThis.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-red-700">
                  <span>✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          {section.thisIs && (
            <div className="flex-1 rounded-lg border border-green-100 bg-green-50/50 p-4">
              <p className="text-xs font-semibold text-green-600 uppercase mb-2">This is</p>
              <p className="text-sm text-green-700 font-medium">👉 {section.thisIs}</p>
            </div>
          )}
        </div>
      )}

      {/* Guidance & Examples */}
      <Accordion type="single" collapsible>
        <AccordionItem value="guidance" className="border rounded-lg px-4">
          <AccordionTrigger className="text-sm hover:no-underline">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Guidance & Tips
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 mb-2">
              {section.guidance.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  {tip}
                </li>
              ))}
            </ul>
            {section.examples && section.examples.length > 0 && (
              <>
                <Separator className="my-3" />
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Examples</p>
                <ul className="space-y-1">
                  {section.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-muted-foreground italic">"{ex}"</li>
                  ))}
                </ul>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Workspace */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Circle className="h-3 w-3 fill-current" />
          Your Workspace
        </h3>
        <SectionWorkspace sectionId={section.id} sectionData={sectionData} onUpdateData={onUpdateData} />
      </div>

      {/* Expected Output */}
      <div className="rounded-lg border border-dashed p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Expected Output</p>
        <p className="text-sm font-medium mb-2">{section.outputDescription}</p>
        <ul className="space-y-1">
          {section.expectedOutputs.map((output, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={cn("h-1.5 w-1.5 rounded-full", PHASE_COLORS[phase])} />
              {output}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onPrev} disabled={!canGoPrev} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <Button
          variant={isCompleted ? "outline" : "default"}
          onClick={onToggleComplete}
          className="gap-2"
        >
          {isCompleted ? (
            <>
              <Check className="h-4 w-4" /> Completed — Undo?
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> Mark Complete
            </>
          )}
        </Button>

        <Button onClick={onNext} disabled={!canGoNext} className="gap-2">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
