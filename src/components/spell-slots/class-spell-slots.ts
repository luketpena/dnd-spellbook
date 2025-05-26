import { CharacterClass } from "../../class-data/class-data";

export interface SpellSlot {
  level: number;
  count: number;
}

export interface ClassSpellSlotSet {
  "1"?: SpellSlot[];
  "2"?: SpellSlot[];
  "3"?: SpellSlot[];
  "4"?: SpellSlot[];
  "5"?: SpellSlot[];
  "6"?: SpellSlot[];
  "7"?: SpellSlot[];
  "8"?: SpellSlot[];
  "9"?: SpellSlot[];
}

export const classSpellSlotSets: {
  [key in CharacterClass]: ClassSpellSlotSet;
} = {
  /* WIZARD SPELL SLOTS */
  wizard: {
    "1": [
      { level: 1, count: 2 },
      { level: 2, count: 3 },
      { level: 3, count: 4 },
    ],
    "2": [
      { level: 3, count: 2 },
      { level: 4, count: 3 },
    ],
    "3": [
      { level: 5, count: 2 },
      { level: 6, count: 3 },
    ],
    "4": [
      { level: 7, count: 1 },
      { level: 8, count: 2 },
      { level: 9, count: 3 },
    ],
    "5": [
      { level: 9, count: 1 },
      { level: 10, count: 2 },
      { level: 18, count: 3 },
    ],
    "6": [
      { level: 11, count: 1 },
      { level: 19, count: 2 },
    ],
    "7": [
      { level: 13, count: 1 },
      { level: 20, count: 2 },
    ],
    "8": [{ level: 15, count: 1 }],
    "9": [{ level: 15, count: 17 }],
  },

  /* PALADIN SPELL SLOTS */
  paladin: {
    "1": [
      { level: 1, count: 2 },
      { level: 3, count: 3 },
      { level: 5, count: 4 },
    ],
    "2": [
      { level: 5, count: 2 },
      { level: 7, count: 3 },
    ],
    "3": [
      { level: 9, count: 2 },
      { level: 11, count: 3 },
    ],
    "4": [
      { level: 13, count: 1 },
      { level: 15, count: 2 },
      { level: 17, count: 3 },
    ],
    "5": [
      { level: 17, count: 1 },
      { level: 19, count: 2 },
    ],
  },
};
