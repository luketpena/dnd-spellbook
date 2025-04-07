import { CardForm } from "../../App";

export class SkillCard {
  data: CardForm;
  constructor(_data: CardForm) {
    this.data = _data;
  }

  togglePrepare() {
    this.data.details.prepared = !this.data.details.prepared;
  }
}

export const SpellMinorIllusion = new SkillCard({
  title: "Minor Illusion",
  details: {
    duration: "1 Minute",
    range: "30ft",
    castingTime: "Action",
    magicSchool: "illusion",
    level: 0,
    components: ["S", "M"],
    materialComponents: "fleece",
  },
  backgroundSrc: "https://i.imgur.com/RWyLnuD.png",

  content: [
    {
      text: "Create a sound or image for the duration.",
    },
    {
      header: "Single Cast",
      text: "Only 1 minor illusion can be active. Recasting ends prior illusion.",
    },
    {
      header: "Counter",
      text: "Creature can take study action to examine. INT (Investigation) check vs spell save DC. If perceived, the illusion becomes faint to them.",
    },
    {
      header: "Sound",
      text: "Whisper to scream in volume, any sound. Single continuous or many discrete.",
    },
    {
      header: "Image",
      text: "5ft cube, no other sensory experience and no light emission. Objects pass through it.",
    },
  ],
});

export const SpellFireBolt = new SkillCard({
  title: "Fire Bolt",
  details: {
    range: "120ft",
    castingTime: "Action",
    magicSchool: "evocation",
    level: 0,
    components: ["V", "S"],
    damage: {
      type: "Fire",
      count: 1,
      dice: 10,
    },
    damageScaling: [
      {
        count: 2,
        level: 5,
      },
      {
        count: 3,
        level: 11,
      },
      {
        count: 4,
        level: 17,
      },
    ],
  },
  backgroundSrc: "https://i.imgur.com/5FB6hwq.png",
  content: [
    {
      text: "Hurl a mote of fire at a creature or an object within range.",
    },
    {
      header: "Burning objects",
      text: `Flammable objects hit by this spell start burning if they aren't being worn or carried.`,
    },
  ],
});

export const SpellMageHand = new SkillCard({
  title: "Mage Hand",
  details: {
    range: "30ft",
    castingTime: "Action",
    components: ["V", "S"],
    level: 0,
    magicSchool: "conjuration",
  },
  backgroundSrc: "https://i.imgur.com/buKDXnY.png",
  content: [
    {
      text: "A spectral, floating hand appears at a point you choose within range. The handle lasts the duration.",
    },
    {
      header: "Out of range",
      text: "The hand vanishes if it is greater than 30 feet away.",
    },
    {
      header: "Single Cast",
      text: "Only one Mage Hand may be active. It vanishes if recast.",
    },
    {
      header: "Actions",
      text: "The hand may manipulate an object, open unlocked doors or containers, stow or retrieve items from containers, etc",
    },
    {
      header: "Carry limit",
      text: "The hand cannot carry anything over 10 pounds.",
    },
    {
      header: "Relocate",
      text: "As a Magic Action, you can control the hand thus again. As part of that action, the hand may be moved up to 30 feet, still within range.",
    },
  ],
});

export const SpellMageArmor = new SkillCard({
  title: "Mage Armor",
  details: {
    range: "Touch",
    castingTime: "Action",
    components: ["V", "S", "M"],
    materialComponents: "a piece of cured leather",
    level: 1,
    magicSchool: "abjuration",
  },
  backgroundSrc: "https://i.imgur.com/2AVPltS.png",
  content: [
    {
      text: `Target's base AC becomes 13 + DEX modifier`,
    },
    {
      header: "Willing participant",
      text: "Touched target must be a willing creature.",
    },
    {
      header: "No physical armor",
      text: "Target cannot be wearing armor. The spell ends early if the target dons armor.",
    },
  ],
});

export const SpellShield = new SkillCard({
  title: "Shield",
  details: {
    castingTime: "Reaction",
    range: "Self",
    components: ["V", "S"],
    duration: "1 round",
    magicSchool: "abjuration",
    level: 1,
  },
  backgroundSrc: "https://i.imgur.com/uk6rhAM.png",
  content: [
    {
      text: "An imperceptible barrier of magical force protects you. Until the start of your next turn, you have +5 bonus to AC, including against the triggering attack. You take no damage from Magic Missile.",
    },
  ],
});

export const SpellSilentImage = new SkillCard({
  title: "Silent Image",
  details: {
    castingTime: "Action",
    range: "60ft",
    components: ["V", "S", "M"],
    materialComponents: "fleece",
    duration: "10min",
    concentration: true,
    magicSchool: "illusion",
    level: 1,
  },
  backgroundSrc: "https://i.imgur.com/cKWo0Rb.png",
  content: [
    {
      text: "Create the image of an object, creature, or other visible phenomenon.",
    },
    {
      header: "Visual Only",
      text: "Cannot create any sound, smell, or other sensory effect.",
    },
    {
      header: "Size",
      text: "No larger than a 15-foot cube.",
    },
    {
      header: "Relocate",
      text: "As a magic action, the image can move to any spot within range. It can animate so that its movements appear natural for the image.",
    },
    {
      header: "Counter",
      text: "Physical interactions reveal the illusion, since things an pass through it. Creature can take study action to examine. INT (Investigation) check vs spell save DC. If perceived, they can see through the image.",
    },
  ],
});

export const SpellDetectMagic = new SkillCard({
  title: "Detect Magic",
  backgroundSrc: "https://i.imgur.com/OK45ARY.png",
  details: {
    castingTime: "Action",
    ritual: true,
    range: "30ft",
    components: ["V", "S"],
    duration: "10min",
    concentration: true,
    magicSchool: "divination",
    level: 1,
  },
  content: [
    {
      text: "For the duration, you sense the presence of magical effects within range.",
    },
    {
      header: "Study",
      text: `If you sense magic, you can take a magic action to see a faint aura around any visible creature or object that bears the magic. If it was created by a spell, you learn the spell's school of magic.`,
    },
    {
      header: "Blocked",
      text: "This spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
    },
  ],
});

export const SpellDisguiseSelf = new SkillCard({
  title: "Disguise Self",
  backgroundSrc: "https://i.imgur.com/N4Fn07y.png",
  details: {
    castingTime: "Action",
    range: "Self",
    components: ["V", "S"],
    duration: "1hr",
    magicSchool: "illusion",
    level: 1,
  },
  content: [
    {
      text: "You make yourself - including clothing, armor, weapons, and other belongings on your person - look different until the spell ends",
    },
    {
      header: "Height and weight change",
      text: "You can appear up to 1 foot taller or shorter and can appear heavier or lighter.",
    },
    {
      header: "Form",
      text: "You must adopt a form that has the same basic arrangement of limbs. Otherwise the extent of the transformation is up to you.",
    },
    {
      header: "Physical inspection",
      text: "Does not hold up to physical touch. For example, if you add a hat to yourself that you are not wearing, objects will pass through the hat, and anyone who touches it would feel nothing.",
    },
  ],
});

export const SpellCharmPerson = new SkillCard({
  title: "Charm Person",
  backgroundSrc: "https://i.imgur.com/Z2s7QIe.png",
  details: {
    castingTime: "Action",
    range: "30ft",
    components: ["V", "S"],
    duration: "1hr",
    magicSchool: "enchantment",
    level: 1,
  },
  content: [
    {
      text: "Charm a humanoid creature who becomes friendly to you and your allies.",
    },
    {
      header: "Counter",
      text: "Target makes a wisdom saving throw. This is done with advantage if you or your allies are fighting it.",
    },
    {
      header: "Interruption",
      text: "Spell ends early if you or your allies attack",
    },
    {
      header: "Lingering knowledge",
      text: "When the spell ends, the target knows that they were charmed.",
    },
    {
      header: "Spell slot scaling",
      text: "You may target one additional creature for each spell slot level above 1.",
    },
  ],
});

export const SpellMagicMissile = new SkillCard({
  title: "Magic Missile",
  backgroundSrc: "https://i.imgur.com/MnCY3sN.png",
  details: {
    castingTime: "Action",
    range: "120ft",
    components: ["V", "S"],
    magicSchool: "evocation",
    level: 1,
    damage: {
      type: "Force",
      count: 1,
      dice: 4,
      modifier: "+1",
    },
  },
  content: [
    {
      text: "Create 3 glowing darts of magical force. All darts strike simultaneously.",
    },
    {
      header: "Target selection",
      text: "Darts may hit one creature or several. Targets must be visible and within range.",
    },
    {
      header: "Spell slot scaling",
      text: "The spell creates 1 more dart for each spell slot level above 1.",
    },
  ],
});

export const SpellChillTouch = new SkillCard({
  title: "Chill Touch",
  backgroundSrc: "https://i.imgur.com/AHlGPLh.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    components: ["V", "S"],
    magicSchool: "necromancy",
    level: 0,
    damage: {
      type: "Necrotic",
      count: 1,
      dice: 10,
    },
    damageScaling: [
      {
        count: 2,
        level: 5,
      },
      {
        count: 3,
        level: 11,
      },
      {
        count: 4,
        level: 17,
      },
    ],
  },
  content: [
    {
      text: "Channeling the chill of the grave, make a melee spell attack against a target within reach.",
    },
    {
      header: "Prevent healing",
      text: "Until the end of your next turn, target cannot regain HP.",
    },
  ],
});

export const SpellThaumaturgy = new SkillCard({
  title: "Thaumaturgy",
  backgroundSrc: "https://i.imgur.com/FLEKHNO.png",
  details: {
    castingTime: "Action",
    range: "30ft",
    components: ["V"],
    magicSchool: "transmutation",
    level: 0,
    duration: "1min",
  },
  content: [
    {
      text: "Manifest a wonder within range that lasts up to the max duration. Can be cast multiple times to stack up to 3 different 1-minute effects active.",
    },
    {
      header: "Altered Eyes",
      text: "Alter the appearance of your eyes",
    },
    {
      header: "Booming Voice",
      text: "Your voice booms up to 3x louder. For the duration, you have advantage on CHA (Intimidation) checks.",
    },
    {
      header: "Fire Play",
      text: "Cause flames to flicker, brighten, dim, or change color.",
    },
    {
      header: "Invisible Hand",
      text: "Instantaneously cause an unlocked door or window to fly open or slam shut.",
    },
    {
      header: "Phantom Sound",
      text: "Create instantaneous sound that originates from a point within range.",
    },
    {
      header: "Tremors",
      text: "Cause harmless tremors in the ground.",
    },
  ],
});

export const SpellFindFamiliar = new SkillCard({
  title: "Find Familiar",
  backgroundSrc: "https://i.imgur.com/PnPrzPx.png",
  details: {
    castingTime: "1hr",
    range: "10ft",
    components: ["V", "S", "M"],
    materialComponents: "Incense (10+ GP)",
    magicSchool: "conjuration",
    level: 1,
    ritual: true,
  },
  content: [
    {
      text: "Gain the service of a familiar, taking an animal form you choose. Familiar appears within unoccupied space within range. They act independently, but obey your commands.",
    },
    {
      header: "Form",
      text: "Bat, Cat, Frog, Hawk, Lizard, Octopus, Owl, Rat, Raven, Spider, Weasel, or another Beast with a Challenge Rating of 0",
    },
    {
      header: "Classification",
      text: "Familiar is not a Beast, but is a Celestial, Fey, or Fiend.",
    },
    {
      header: "Telepathic Connection",
      text: "While within 100ft, you can communicate telepathically. As a Bonus Action, you can see through their eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses it has.",
    },
    {
      header: "Spell Casting",
      text: "When you cast spells with a range of touch, the familiar can deliver the touch. Familiar must be within 100ft and takes a Reaction to deliver the touch.",
    },
    {
      header: "Combat",
      text: "Familiar is an ally to you and your allies. It rolls initiative and acts on its turn. It cannot attack.",
    },
    {
      header: "Disappearance",
      text: "When the familiar drops to 0 HP, it disappears. It drops anything it was carrying.",
    },
    {
      header: "Dismissal",
      text: "As a Magic Action, familiar can be temporarily dismissed to a pocket dimension or forever. It drops anything it was carrying. If temporarily dismissed, it can be resummoned within 30ft range as a Magic Action. ",
    },
    {
      header: "One Familiar Only",
      text: "Only one familiar is active at a time. Recasting will allow you to alter the Form it takes.",
    },
  ],
});
