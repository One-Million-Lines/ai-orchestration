import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { BlueprintState, createDefaultState } from "@/data/types";

const STORAGE_KEY = "ai-orchestration-blueprint";

interface BlueprintContextValue {
  state: BlueprintState;
  setActiveSection: (id: number) => void;
  updateSectionData: (key: string, value: any) => void;
  toggleComplete: (sectionId: number) => void;
  isCompleted: (sectionId: number) => boolean;
  updateMetadata: (key: string, value: string) => void;
  resetBlueprint: () => void;
  exportBlueprint: () => string;
}

const BlueprintContext = createContext<BlueprintContextValue | null>(null);

function loadState(): BlueprintState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle new fields
      const defaults = createDefaultState();
      return {
        ...defaults,
        ...parsed,
        sectionData: { ...defaults.sectionData, ...parsed.sectionData },
        metadata: { ...defaults.metadata, ...parsed.metadata },
      };
    }
  } catch (e) {
    console.error("Failed to load blueprint state:", e);
  }
  return createDefaultState();
}

export function BlueprintProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BlueprintState>(loadState);

  useEffect(() => {
    const toSave = { ...state, metadata: { ...state.metadata, updatedAt: new Date().toISOString() } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [state]);

  const setActiveSection = useCallback((id: number) => {
    setState((s) => ({ ...s, activeSection: id }));
  }, []);

  const updateSectionData = useCallback((key: string, value: any) => {
    setState((s) => ({
      ...s,
      sectionData: { ...s.sectionData, [key]: value },
    }));
  }, []);

  const toggleComplete = useCallback((sectionId: number) => {
    setState((s) => ({
      ...s,
      completedSections: s.completedSections.includes(sectionId)
        ? s.completedSections.filter((id) => id !== sectionId)
        : [...s.completedSections, sectionId],
    }));
  }, []);

  const isCompleted = useCallback(
    (sectionId: number) => state.completedSections.includes(sectionId),
    [state.completedSections],
  );

  const updateMetadata = useCallback((key: string, value: string) => {
    setState((s) => ({
      ...s,
      metadata: { ...s.metadata, [key]: value },
    }));
  }, []);

  const resetBlueprint = useCallback(() => {
    setState(createDefaultState());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportBlueprint = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  return (
    <BlueprintContext.Provider
      value={{ state, setActiveSection, updateSectionData, toggleComplete, isCompleted, updateMetadata, resetBlueprint, exportBlueprint }}
    >
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint() {
  const ctx = useContext(BlueprintContext);
  if (!ctx) throw new Error("useBlueprint must be used within BlueprintProvider");
  return ctx;
}
