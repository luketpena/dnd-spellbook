import { create } from "zustand";
import { CharacterParams } from "../components/character-stats/player-characters";
import { CharacterClass } from "../class-data/class-data";
import { SkillCard } from "../components/ability-card/spells";

export interface CharacterData {
  charParams: CharacterParams | null;
  charClass: CharacterClass | null;
  spellList: SkillCard[];
  setCharParams: (v: CharacterParams) => void;
}

export const charDataStore = create<CharacterData>((set) => ({
  charParams: null,
  charClass: null,
  spellList: [],
  setCharParams: (charParams: CharacterParams) => {
    set((state) => {
      const { charClass, spellList } = charParams;
      return { ...state, charParams, charClass, spellList };
    });
  },
}));
