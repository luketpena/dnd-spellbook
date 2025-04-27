import { createContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      xp: 0,
      spellSlotUsage: [1, 1],
      activeSpellConcentration: null,
      setXp: (xp: number) => {
        set((state) => ({ ...state, xp }));
      },
      addXp: (add: number) => {
        set((state) => {
          const newXp = state.xp + add;
          localStorage.setItem("xp", newXp.toString());
          return { ...state, xp: newXp };
        });
      },

      coins: 0,
      setCoins: (v: number) => {
        set((state) => ({ ...state, coins: v }));
      },
    }),
    {
      name: "user",
    }
  )
);

export interface UserData {
  xp: number;
  spellSlotUsage: number[];
  activeSpellConcentration: string | null;
  setXp: (v: number) => void;
  addXp: (v: number) => void;
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
