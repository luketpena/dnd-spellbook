import { IconName } from "../components/shared/Icon";

export type MagicSchool =
  | "abjuration" // Orange
  | "conjuration" // Blue
  | "divination" // Cyan
  | "enchantment" // White
  | "evocation" // Yellow
  | "illusion" // Purple
  | "necromancy" // Green
  | "transmutation"; // Red;

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
