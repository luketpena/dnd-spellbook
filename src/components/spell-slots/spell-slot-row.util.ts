import { CharacterClass } from "../../class-data/class-data";
import { getLevelFromXp } from "../../data-management/data-management";
import { classSpellSlotSets, SpellSlot } from "./class-spell-slots";

export interface SpellSlotWithUsage extends SpellSlot {
  usage: number;
}

/* For a given xp level and class, return the available spell slots */
export function getSpellSlots(
  xp: number,
  spellSlotUsage: number[],
  charClass: CharacterClass | null
): SpellSlotWithUsage[] {
  if (!charClass) return [];

  const level = getLevelFromXp(xp);
  const spellSlots = classSpellSlotSets[charClass];
  const result = Object.entries(spellSlots)
    .map(([key, tiers]) => {
      const entry = tiers
        .sort((a: SpellSlot, b: SpellSlot) => b.level - a.level)
        .find((v: SpellSlot) => v.level <= level);
      const slotLevel = Number(key);
      return {
        level: slotLevel,
        count: entry === undefined ? 0 : entry.count,
        usage: spellSlotUsage[slotLevel - 1],
      };
    })
    .filter((entry) => entry.count > 0);

  console.log({ charClass, xp, level, spellSlots, result });
  return result;
}
