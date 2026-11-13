import { EPIPHANIES_PART_1, type ModuleEpiphanyItem } from './academy-epiphanies-part1';
import { EPIPHANIES_PART_2 } from './academy-epiphanies-part2';

export type { ModuleEpiphanyItem };

export const MODULE_EPIPHANIES_REGISTRY: Record<string, ModuleEpiphanyItem> = {
  ...EPIPHANIES_PART_1,
  ...EPIPHANIES_PART_2,
};

export function getModuleEpiphany(slug: string, isId: boolean): {
  headline: string;
  myth: string;
  reality: string;
  microExample: string;
  takeaway: string;
} {
  const item =
    MODULE_EPIPHANIES_REGISTRY[slug] ??
    EPIPHANIES_PART_1['money-history-and-inflation'];
  if (isId) {
    return {
      headline: item.headlineId,
      myth: item.mythId,
      reality: item.realityId,
      microExample: item.microExampleId,
      takeaway: item.takeawayId,
    };
  }
  return {
    headline: item.headlineEn,
    myth: item.mythEn,
    reality: item.realityEn,
    microExample: item.microExampleEn,
    takeaway: item.takeawayEn,
  };
}
