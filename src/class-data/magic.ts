import { IconName } from "../components/shared/Icon";

export type MagicSchool =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

export function getMagicSchoolIcon(school: MagicSchool): IconName {
  switch (school) {
    case "abjuration":
      return "GiMagicShield";
    case "conjuration":
      return "GiPentacle";
    case "divination":
      return "GiCrystalBall";
    case "evocation":
      return "GiFireflake";
    case "illusion":
      return "GiSheikahEye";
    case "necromancy":
      return "GiChewedSkull";
    case "transmutation":
      return "GiOilySpiral";
    case "enchantment":
      return "GiBeamsAura";
  }
}
