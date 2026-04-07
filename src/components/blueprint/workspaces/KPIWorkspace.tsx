import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KPI_CATEGORIES, type BlueprintState, type KPI } from "@/data/types";
import { Plus, X } from "lucide-react";

interface Props {
  sectionData: BlueprintState["sectionData"];
  onUpdateData: (key: string, value: any) => void;
}

const catColors = {
  efficiency: "bg-blue-50 border-blue-200 text-blue-700",
  quality: "bg-violet-50 border-violet-200 text-violet-700",
  adoption: "bg-teal-50 border-teal-200 text-teal-700",
  business: "bg-amber-50 border-amber-200 text-amber-700",
};

export function KPIWorkspace({ sectionData, onUpdateData }: Props) {
  const kpis = sectionData.kpis || [];
  const [cat, setCat] = useState<KPI["category"]>("efficiency");
  const [metric, setMetric] = useState("");
  const [target, setTarget] = useState("");

  const addKPI = () => {
    if (!metric.trim()) return;
    const kpi: KPI = { id: crypto.randomUUID(), category: cat, metric: metric.trim(), target: target.trim() };
    onUpdateData("kpis", [...kpis, kpi]);
    setMetric("");
    setTarget("");
  };

  const removeKPI = (id: string) => {
    onUpdateData("kpis", kpis.filter((k) => k.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Category overview */}
      <div className="grid grid-cols-2 gap-3">
        {KPI_CATEGORIES.map((c) => {
          const count = kpis.filter((k) => k.category === c.value).length;
          return (
            <div key={c.value} className={cn("rounded-lg border p-3", catColors[c.value])}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{c.label}</p>
                <span className="text-xs font-bold">{count}</span>
              </div>
              <p className="text-xs opacity-75">e.g., {c.examples.join(", ")}</p>
            </div>
          );
        })}
      </div>

      {/* KPI list */}
      {kpis.length > 0 && (
        <div className="space-y-2">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium border", catColors[kpi.category])}>
                {kpi.category}
              </span>
              <span className="flex-1 text-sm">{kpi.metric}</span>
              {kpi.target && <span className="text-xs text-muted-foreground">Target: {kpi.target}</span>}
              <button onClick={() => removeKPI(kpi.id)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add KPI */}
      <div className="space-y-2 rounded-lg border border-dashed p-3">
        <div className="flex gap-2 flex-wrap">
          {KPI_CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value as KPI["category"])}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                cat === c.value ? cn("font-medium", catColors[c.value]) : "text-muted-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input value={metric} onChange={(e) => setMetric(e.target.value)} placeholder="KPI metric name" className="h-9" />
          <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target value (e.g., < 2h)" className="h-9" />
        </div>
        <Button variant="outline" size="sm" onClick={addKPI} disabled={!metric.trim()} className="gap-1">
          <Plus className="h-4 w-4" /> Add KPI
        </Button>
      </div>
    </div>
  );
}
