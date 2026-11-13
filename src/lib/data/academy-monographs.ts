import { MONOGRAPHS_PART_1, type ModuleDeepMonograph } from './academy-monographs-part1';
import { MONOGRAPHS_PART_2 } from './academy-monographs-part2';
import { MONOGRAPHS_PART_3 } from './academy-monographs-part3';
import { MONOGRAPHS_PART_4 } from './academy-monographs-part4';

export * from './academy-monographs-part1';

export const ALL_MODULE_MONOGRAPHS: Record<string, ModuleDeepMonograph> = {
  ...MONOGRAPHS_PART_1,
  ...MONOGRAPHS_PART_2,
  ...MONOGRAPHS_PART_3,
  ...MONOGRAPHS_PART_4,
};

export function getModuleMonograph(slug: string): ModuleDeepMonograph {
  return (
    ALL_MODULE_MONOGRAPHS[slug] ??
    MONOGRAPHS_PART_1['money-history-and-inflation']
  );
}
