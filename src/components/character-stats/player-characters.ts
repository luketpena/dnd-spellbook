import { CharacterClass } from "../../class-data/class-data";
import {
  SkillCard,
  SpellCharmPerson,
  SpellChillTouch,
  SpellCureWounds,
  SpellDetectMagic,
  SpellDisguiseSelf,
  SpellDivineSmite,
  SpellDragonsBreath,
  SpellFalseLife,
  SpellFeatherFall,
  SpellFindFamiliar,
  SpellFireBolt,
  SpellGuidance,
  SpellIdentify,
  SpellInvisibility,
  SpellMageArmor,
  SpellMageHand,
  SpellMagicMissile,
  SpellMindSliver,
  SpellMinorIllusion,
  SpellMistyStep,
  SpellPhantasmalForce,
  SpellProtectionFromEvilAndGood,
  SpellShield,
  SpellShieldOfFaith,
  SpellShockingGrasp,
  SpellSilentImage,
  SpellSpareTheDying,
  SpellThaumaturgy,
  SpellThunderousSmite,
} from "../ability-card/spells";

export type CharacterIds = "nylus" | "sedona";

export interface CharacterParams {
  firstName: string;
  lastName?: string;
  charClass: CharacterClass;
  spellList: SkillCard[];
}

export const playerCharacters: { [key in CharacterIds]: CharacterParams } = {
  nylus: {
    firstName: "Nylus",
    lastName: "Mokrun",
    charClass: "wizard",
    spellList: [
      SpellMinorIllusion,
      SpellFireBolt,
      SpellMageHand,
      SpellMageArmor,
      SpellSilentImage,
      SpellShield,
      SpellDetectMagic,
      SpellDisguiseSelf,
      SpellCharmPerson,
      SpellMagicMissile,
      SpellChillTouch,
      SpellThaumaturgy,
      SpellFindFamiliar,
      SpellFalseLife,
      SpellMistyStep,
      SpellPhantasmalForce,
      SpellInvisibility,
      SpellMindSliver,
      SpellIdentify,
      SpellGuidance,
      SpellSpareTheDying,
      SpellCureWounds,
      SpellShockingGrasp,
      SpellFeatherFall,
      SpellDragonsBreath,
    ],
  },

  sedona: {
    firstName: "Sedona",
    charClass: "paladin",
    spellList: [
      SpellCureWounds,
      SpellDivineSmite,
      SpellProtectionFromEvilAndGood,
      SpellThunderousSmite,
      SpellShieldOfFaith,
      
    ],
  },
};
