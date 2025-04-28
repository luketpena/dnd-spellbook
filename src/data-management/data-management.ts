import { createContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SkillCard } from "../components/ability-card/spells";
import { clamp } from "../utility/math.util";
import { getSpellSlots } from "../components/spell-slots/SpellSlotRow";

export const levelExpThresholds = [
  355000, 305000, 265000, 225000, 195000, 165000, 140000, 120000, 100000, 85000,
  64000, 48000, 34000, 23000, 14000, 6500, 2700, 900, 300, 0,
] as const;

export function getLevelFromXp(xp: number) {
  const index = levelExpThresholds.findIndex((threshold) => threshold <= xp);
  return index === -1 ? 1 : 20 - index;
}

export const userDataStore = create<UserData>()(
  persist(
    (set) => ({
      maxHp: 17,
      hp: 17,
      tempHp: 0,
      maxTempHp: 0,
      ac: 0,
      tempAc: 0,

      xp: 0,
      spellSlotUsage: [1, 2],
      incrementSpellSlotUsage: (slotLevel, change) => {
        set((state) => {
          const spellSlotUsage = [...state.spellSlotUsage];
          const slots = getSpellSlots(state.xp, spellSlotUsage);
          const slot = slots.find((v) => v.level === slotLevel);
          if (slotLevel > 0 && slotLevel <= state.spellSlotUsage.length) {
            spellSlotUsage[slotLevel - 1] = clamp(
              spellSlotUsage[slotLevel - 1] + change,
              0,
              slot?.count ?? 0
            );
            console.log("increment", slotLevel, change, slot);
          }

          return { ...state, spellSlotUsage };
        });
      },
      castSpell: (skill, slotLevel) => {
        set((state) => {
          const spellSlotUsage = [...state.spellSlotUsage];

          // We only need to use up a slot for spells level 1 and higher
          const level = slotLevel;
          if (level > 0) {
            if (spellSlotUsage.length >= level) {
              spellSlotUsage[level - 1] += 1;
            }
          }

          // Replace active spell concentration if relevant
          const activeSpellConcentration = skill.data.details.concentration
            ? skill.data.title
            : state.activeSpellConcentration;
          return { ...state, spellSlotUsage, activeSpellConcentration };
        });
      },
      activeSpellConcentration: null,
      resetSpellConcentration: () => {
        set((state) => {
          return { ...state, activeSpellConcentration: null };
        });
      },
      setXp: (xp) => {
        set((state) => ({ ...state, xp }));
      },
      addXp: (add) => {
        set((state) => {
          const newXp = state.xp + add;
          localStorage.setItem("xp", newXp.toString());
          return { ...state, xp: newXp };
        });
      },

      coins: 0,
      setCoins: (coins) => {
        set((state) => ({ ...state, coins }));
      },
    }),
    {
      name: "user",
    }
  )
);

export interface UserData {
  // XP
  xp: number;
  setXp: (v: number) => void;
  addXp: (v: number) => void;

  // HP and AC
  hp: number;
  maxHp: number;
  tempHp: number;
  maxTempHp: number;
  ac: number;
  tempAc: number;

  // Spells
  spellSlotUsage: number[];
  incrementSpellSlotUsage: (slotLevel: number, change: number) => void;
  castSpell: (skill: SkillCard, slotLevel: number) => void;
  activeSpellConcentration: string | null;
  resetSpellConcentration: () => void;

  // Purse + Inventory
  coins: number;
  setCoins: (v: number) => void;
}
export interface UserDataLegacy {
  xp: number;
  coins: number;
  setCoins: (v: number) => void;
}

export const UserDataContext = createContext<UserDataLegacy>({
  xp: 0,
  coins: 0,
  setCoins: () => {},
});

export interface Trait {
  title: string;
  description: string;
  source?: string;
}
