import type { AcademyLesson } from './academy-types';
import {
  SIMULATIONS_PART_1,
  type ModuleGuidedSimulation,
  type ModuleSimulationStep1Option,
  type ModuleSimulationStep2Choice,
  type ModuleSimulationVisual,
  type SimCandleBar,
  type SimulationVisualKind,
} from './academy-simulations-part1';
import { SIMULATIONS_PART_2A } from './academy-simulations-part2a';
import { SIMULATIONS_PART_2B } from './academy-simulations-part2b';

export type {
  ModuleGuidedSimulation,
  ModuleSimulationStep1Option,
  ModuleSimulationStep2Choice,
  ModuleSimulationVisual,
  SimCandleBar,
  SimulationVisualKind,
};

export const MODULE_SIMULATIONS_REGISTRY: Record<string, ModuleGuidedSimulation> = {
  ...SIMULATIONS_PART_1,
  ...SIMULATIONS_PART_2A,
  ...SIMULATIONS_PART_2B,
};

export function getModuleGuidedSimulation(lesson: AcademyLesson): ModuleGuidedSimulation {
  return (
    MODULE_SIMULATIONS_REGISTRY[lesson.slug] ??
    SIMULATIONS_PART_1['money-history-and-inflation']
  );
}
