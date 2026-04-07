import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Building2 } from "lucide-react";
import { sections } from "@/data/sections";
import { PHASE_COLORS } from "@/data/types";

interface ProgressHeaderProps {
  completedSections: number[];
  companyName: string;
  onExport: () => void;
  onReset: () => void;
  onCompanyNameChange: (name: string) => void;
}

export function ProgressHeader({
  completedSections,
  companyName,
  onExport,
  onReset,
  onCompanyNameChange,
}: ProgressHeaderProps) {
  const total = sections.length;
  const completed = completedSections.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">AI</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">Orchestration Blueprint</h1>
              <div className="flex items-center gap-2">
                {companyName ? (
                  <span className="text-xs text-muted-foreground">{companyName}</span>
                ) : (
                  <button
                    onClick={() => {
                      const name = prompt("Company name:");
                      if (name) onCompanyNameChange(name);
                    }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Building2 className="h-3 w-3" />
                    Set company name
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress bar */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex gap-0.5">
              {sections.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "h-2 w-4 rounded-sm transition-colors",
                    completedSections.includes(s.id) ? PHASE_COLORS[s.phase] : "bg-muted",
                  )}
                />
              ))}
            </div>
            <Badge variant="secondary" className="text-xs font-normal">
              {completed}/{total} · {percentage}%
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onExport} className="gap-1.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5 text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
