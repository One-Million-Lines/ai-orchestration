import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { sections, PHASE_SECTIONS } from "@/data/sections";
import { PHASE_COLORS, PHASE_TEXT_COLORS, PHASE_LABELS, PHASE_BG_LIGHT, type Phase } from "@/data/types";
import {
  Compass, Target, Map, GitBranch, Shield, Workflow, Link,
  Users, RefreshCw, BarChart3, Rocket, TrendingUp, Lock, FileText,
  Check,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Compass, Target, Map, GitBranch, Shield, Workflow, Link,
  Users, RefreshCw, BarChart3, Rocket, TrendingUp, Lock, FileText,
};

interface SidebarProps {
  activeSection: number;
  completedSections: number[];
  onSelect: (id: number) => void;
}

export function Sidebar({ activeSection, completedSections, onSelect }: SidebarProps) {
  const phases = Object.entries(PHASE_SECTIONS) as [Phase, number[]][];

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-6">
          {phases.map(([phase, sectionIds]) => (
            <div key={phase}>
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className={cn("h-2 w-2 rounded-full", PHASE_COLORS[phase])} />
                <span className={cn("text-xs font-semibold uppercase tracking-wider", PHASE_TEXT_COLORS[phase])}>
                  {PHASE_LABELS[phase]}
                </span>
              </div>
              <div className="space-y-0.5">
                {sectionIds.map((id) => {
                  const section = sections[id];
                  const Icon = iconMap[section.icon] || Compass;
                  const isActive = activeSection === id;
                  const isComplete = completedSections.includes(id);

                  return (
                    <button
                      key={id}
                      onClick={() => onSelect(id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors",
                        isActive
                          ? cn("font-medium", PHASE_BG_LIGHT[phase], PHASE_TEXT_COLORS[phase])
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <Icon className="h-4 w-4" />
                        {isComplete && (
                          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="truncate">
                        <span className="text-xs text-muted-foreground mr-1">{id}.</span>
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
