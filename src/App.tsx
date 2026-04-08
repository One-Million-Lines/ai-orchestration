import { useCallback } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BlueprintProvider, useBlueprint } from "@/hooks/useBlueprintStore";
import { FloatingNav } from "@/components/FloatingNav";
import { sections } from "@/data/sections";
import { ProgressHeader } from "@/components/blueprint/ProgressHeader";
import { Sidebar } from "@/components/blueprint/Sidebar";
import { SectionView } from "@/components/blueprint/SectionView";

declare const APP_VERSION: string;

function BlueprintApp() {
  const { state, setActiveSection, updateSectionData, toggleComplete, isCompleted, updateMetadata, resetBlueprint, exportBlueprint } = useBlueprint();

  const currentSection = sections[state.activeSection] || sections[0];

  const handleExport = useCallback(() => {
    const data = exportBlueprint();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orchestration-blueprint-${state.metadata.companyName || "export"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportBlueprint, state.metadata.companyName]);

  const handleReset = useCallback(() => {
    if (window.confirm("Reset the entire blueprint? This cannot be undone.")) {
      resetBlueprint();
    }
  }, [resetBlueprint]);

  return (
    <div className="flex min-h-screen flex-col">
      <ProgressHeader
        completedSections={state.completedSections}
        companyName={state.metadata.companyName}
        onExport={handleExport}
        onReset={handleReset}
        onCompanyNameChange={(name) => updateMetadata("companyName", name)}
      />

      <div className="flex flex-1">
        <Sidebar
          activeSection={state.activeSection}
          completedSections={state.completedSections}
          onSelect={setActiveSection}
        />

        <main className="flex-1 overflow-y-auto bg-background">
          <SectionView
            section={currentSection}
            isCompleted={isCompleted(currentSection.id)}
            sectionData={state.sectionData}
            onUpdateData={updateSectionData}
            onToggleComplete={() => toggleComplete(currentSection.id)}
            onNext={() => setActiveSection(Math.min(currentSection.id + 1, sections.length - 1))}
            onPrev={() => setActiveSection(Math.max(currentSection.id - 1, 0))}
            canGoNext={currentSection.id < sections.length - 1}
            canGoPrev={currentSection.id > 0}
          />
        </main>
      </div>

      <footer className="border-t bg-muted/30 py-3 text-center text-xs text-muted-foreground">
        AI Orchestration Blueprint · Built by Alex Rada · v{APP_VERSION}
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BlueprintProvider>
        <BlueprintApp />
        <FloatingNav position="bottom-right" />
      </BlueprintProvider>
    </TooltipProvider>
  );
}
