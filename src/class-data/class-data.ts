export type CharacterClass = "wizard" | "paladin";

export interface SpellSlotData {
  spellLevel: number;
  tiers: {
    characterLevel: number;
    count: number;
  }[];
}

export interface ClassData {
  spellSlots: SpellSlotData[];
}

export class SpellSlot {
  level: number;
  count: number;
  constructor(_level: number, _count: number) {
    this.level = _level;
    this.count = _count;
  }
}
