import { createContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userDataStore = create<UserData>()(
  persist(
    (set) => ({
      xp: 50,
      setXp: (xp: number) => {
        set((state) => ({ ...state, xp }));
      },
      addXp: (add: number) => {
        set((state) => {
          const newXp = state.xp + add;
          console.log(typeof state.xp, typeof add, typeof newXp);
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
