import { CardForm } from "../../pages/HomePage";

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
  backgroundSrc: "https://i.imgur.com/nkh6fSk.png",

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
  backgroundSrc: "https://i.imgur.com/34CxwSo.png",
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

export const SpellFalseLife = new SkillCard({
  title: "False Life",
  backgroundSrc: "https://i.imgur.com/3uVGUmi.png",
  details: {
    castingTime: "Action",
    range: "Self",
    components: ["V", "S", "M"],
    materialComponents: "a drop of alcohol",
    magicSchool: "necromancy",
    level: 1,
  },
  content: [
    {
      text: "Gain 2d4 + 4 Temporary Hit Points.",
    },
    {
      header: "Spell slot scaling",
      text: "Gain 5 additional Temporary Hit Points for each spell slot level above 1.",
    },
  ],
});

export const SpellMistyStep = new SkillCard({
  title: "Misty Step",
  backgroundSrc: "https://i.imgur.com/7w5Yi6d.png",
  details: {
    castingTime: "Bonus Action",
    range: "Self",
    components: ["V"],
    magicSchool: "conjuration",
    level: 2,
  },
  content: [
    {
      text: "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.",
    },
  ],
});

export const SpellPhantasmalForce = new SkillCard({
  title: "Phantasmal Force",
  backgroundSrc: "https://i.imgur.com/7o4PJDW.png",
  details: {
    castingTime: "Action",
    range: "60ft",
    components: ["V", "S", "M"],
    magicSchool: "illusion",
    concentration: true,
    duration: "1min",
    level: 2,
    damage: {
      dice: 8,
      count: 2,
      type: "Psychic",
    },
  },
  content: [
    {
      text: "Attempt to craft an illusion in the mind of a creature you can see within range. The target makes INT saving throw. On a failed save, create a phantasmal object, creature, or phenomenon no larger than 10-foot Cube only perceptible to the mind of the target.",
    },
    {
      header: "Stimuli",
      text: "Illusion can include sound, vision, temperature, and any other stimuli, including pain.",
    },
    {
      header: "Counter",
      text: "Target can take a Study action INT (Investigation) check against spell save DC. If it succeeds, the illusion is broken.",
    },
    {
      header: "Breaks in logic",
      text: "While active, the target treats the phantasm as if it were real, and rationalizes any illogical outcomes that come from interacting with it. Example: target steps through phantasmal bridge and survives. They will attribute the fall to something else, but still believe the bridge is real.",
    },
    {
      header: "Damage",
      text: "If the illusion includes something dangerous or harmful, then on each of your turns the target takes 2d8 Psychic damage if they are within 5 feet of the phantasm. The target perceives the damage as the type appropriate to the illusion. (e.g. burning if there is a fire.)",
    },
  ],
});

export const SpellInvisibility = new SkillCard({
  title: "Invisibility",
  backgroundSrc: "https://i.imgur.com/I5Fjsmo.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    components: ["V", "S", "M"],
    materialComponents: "an eyelash in gum arabic",
    magicSchool: "illusion",
    concentration: true,
    duration: "1hr",
    level: 2,
  },
  content: [
    {
      text: "A creature you touch has the Invisible condition until the spell ends. The spell ends early immediately after the target makes an attack roll, deals damage, or casts a spell.",
    },
    {
      header: "Spell slot scaling",
      text: "Target one additional creature for each spell slot level above 2.",
    },
  ],
});

export const SpellIdentify = new SkillCard({
  title: "Identify",
  backgroundSrc: "https://i.imgur.com/zTzWfPK.png",
  details: {
    castingTime: "1min",
    ritual: true,
    range: "Touch",
    components: ["V", "S", "M"],
    materialComponents: "a pearl worth 100+ GP",
    magicSchool: "divination",
    level: 1,
  },
  content: [
    {
      text: "You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires Attunement, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name.",
    },
    {
      header: "Creature target",
      text: "If a creature is touched, you learn which ongoing spells, if any, are currently affecting it.",
    },
  ],
});

export const SpellMindSliver = new SkillCard({
  title: "Mind Sliver",
  backgroundSrc: "https://i.imgur.com/Bb6IKcZ.png",
  details: {
    castingTime: "Action",
    range: "60ft",
    components: ["V"],
    magicSchool: "enchantment",
    level: 0,
    damage: {
      type: "Psychic",
      count: 1,
      dice: 6,
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
      text: "You try to temporarily sliver the mind of on creature you can see within range.",
    },
    {
      header: "Counter",
      text: "Creature must succeed on an INT saving throw. If they fail, they take damage and subtract 1d4 from the next saving throw they make before the end of your next turn.",
    },
  ],
});

export const SpellSpareTheDying = new SkillCard({
  title: "Spare the Dying",
  backgroundSrc: "https://i.imgur.com/KQ1JHZg.png",
  details: {
    castingTime: "Action",
    range: "15ft",
    components: ["V", "S"],
    magicSchool: "necromancy",
    level: 0,
  },
  content: [
    {
      text: "Choose a creature within range that has 0 Hit Points and isn't dead. The creature becomes Stable.",
    },
    {
      header: "Cantrip Upgrade",
      text: "The range doubles when you reach level 5 (30ft), 11 (60ft), and 17 (120ft).",
    },
  ],
});

export const SpellGuidance = new SkillCard({
  title: "Guidance",
  backgroundSrc: "https://i.imgur.com/V4kcyxE.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    duration: "1min",
    concentration: true,
    components: ["V", "S"],
    magicSchool: "divination",
    level: 0,
  },
  content: [
    {
      text: "You touch a willing creature and choose a skill. Until the spell ends, the creature adds 1d4 to any ability check using the chosen skill.",
    },
  ],
});

export const SpellCureWounds = new SkillCard({
  title: "Cure Wounds",
  backgroundSrc: "https://i.imgur.com/4r8C3hZ.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    components: ["V", "S"],
    magicSchool: "abjuration",
    level: 1,
  },
  content: [
    {
      text: "A creature you touch regains a number of Hit Points equal to 2d8 plus your spellcasting ability modifier.",
    },
    {
      header: "Using a Higher-Level Spell Slot",
      text: "The healing increases by 2d8 for each spell slot above level 1.",
    },
  ],
});

export const SpellShockingGrasp = new SkillCard({
  title: "Shocking grasp",
  backgroundSrc: "https://i.imgur.com/OUe1n0l.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    components: ["V", "S"],
    magicSchool: "evocation",
    level: 0,
    damage: {
      type: "Lightning",
      count: 1,
      dice: 8,
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
      text: "Lightning springs from you to a creature that you try to touch. Make a melee spell attack against the target. On a hit, the target takes 1d8 Lightning damage, and it can't make Opportunity Attacks until the start of its next turn.",
    },
    {
      header: "Cantrip Upgrade",
      text: "The damage increases by 1d8 when you reach level 5 (2d8), 11 (3d8), and 17 (4d8)",
    },
  ],
});

export const SpellFeatherFall = new SkillCard({
  title: "Feather Fall",
  backgroundSrc: "https://i.imgur.com/dIzKvDV.png",
  details: {
    castingTime: "Reaction",
    range: "60ft",
    components: ["V", "M"],
    materialComponents: "a small feather or piece of down",
    magicSchool: "transmutation",
    duration: "1min",
    level: 1,
  },
  content: [
    {
      header: "Reaction",
      text: "The Reaction casting time is trigger when you or a creature you can see within 60 feet of you falls.",
    },
    {
      text: `Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If a creature lands before the spell ends, the creature takes no damage from the fall, and the spell ends for that creature.`,
    },
  ],
});

export const SpellDragonsBreath = new SkillCard({
  title: "Dragon's Breath",
  backgroundSrc: "https://i.imgur.com/Hx2EG4i.png",
  details: {
    castingTime: "Bonus Action",
    range: "Touch",
    components: ["V", "S", "M"],
    materialComponents: "a hot pepper",
    magicSchool: "transmutation",
    concentration: true,
    duration: "1min",
    level: 2,
  },
  content: [
    {
      text: "You touch one willing creature and choose Acid, Cold, Fire, Lightning, or Poison. Until the spell ends, the target can take a Magic action to exhale a 15-foot Cone. Each creature in that area makes a Dexterity saving throw, taking 3d6 damage of the chosen type on a failed save or half as much damage on a successful one.",
    },
    {
      header: "Using a Higher-Level Spell Slot",
      text: "The damage increases by 1d6 for each spell slot level above 2.",
    },
  ],
});

export const SpellDivineSmite = new SkillCard({
  title: "Divine Smite",
  backgroundSrc: "https://i.imgur.com/CCGviOq.png",
  details: {
    castingTime: "Bonus Action",
    magicSchool: "evocation",
    components: ["V"],
    range: "Self",
    level: 1,
    damage: {
      type: "Radiant",
      count: 2,
      dice: 8,
    },
  },
  content: [
    {
      header: "Bonus Action",
      text: "Must be taken immediately after hitting a target with a Melee weapon or Unarmed Strike.",
    },
    {
      text: "The target takes an extra 2d8 Radiant Damage from the attack. The damage increases by 1d8 if the target is a Fiend or an Undead.",
    },
    {
      header: "Using a Higher-Level Spell Slot",
      text: "The damage increases by 1d8 for each spell slot level above 1.",
    },
  ],
});

export const SpellProtectionFromEvilAndGood = new SkillCard({
  title: "Protection From Evil And Good",
  backgroundSrc: "https://i.imgur.com/JE3aYNE.png",
  details: {
    castingTime: "Action",
    range: "Touch",
    components: ["V", "S", "M"],
    materialComponents:
      "a flask of Holy Water worth 25+ GP, which the spell consumes",
    duration: "10min",
    concentration: true,
    level: 1,
    magicSchool: "abjuration",
  },
  content: [
    {
      text: "Until the spell ends, one willing creature you touch is protected against creatures that are Aberrations, Celestials, Elementals, Fey, Fiends, or Undead. The protection grants several benefits.",
    },
    {
      text: "Creatures of those types have Disadvantage on attack rolls against the target.",
    },
    {
      text: "The target also can't be possessed by or gain the Charmed or Frightened condition from them.",
    },
    {
      text: "If the target is already possessed, Charmed, or Frightened by such a creature, the target has Advantage on any new saving throw against the relevant effect.",
    },
  ],
});

export const SpellThunderousSmite = new SkillCard({
  title: "Thunderous Smite",
  backgroundSrc: "https://i.imgur.com/BE1N6FA.png",
  details: {
    castingTime: "Bonus Action",
    range: "Self",
    components: ["V"],
    magicSchool: "evocation",
    level: 1,
    damage: {
      dice: 6,
      count: 2,
      type: "Thunder",
    },
  },
  content: [
    {
      header: "Bonus Action",
      text: "Must be taken immediately after hitting a target with a Melee weapon or Unarmed Strike.",
    },
    {
      text: "Your strike rings with thunder that is audible withing 300 feet of you, and the target takes an extra 2d6 Thunder damage from the attack. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and have the Prone condition.",
    },
    {
      header: "Using a Higher-Level Spell Slot",
      text: "The damage increased by 1d6 for each spell slot level above 1.",
    },
  ],
});

export const SpellShieldOfFaith = new SkillCard({
  title: "Shield of Faith",
  backgroundSrc: "https://i.imgur.com/WpbEZBv.png",
  details: {
    castingTime: "Bonus Action",
    range: "60ft",
    components: ["V", "S", "M"],
    materialComponents: "a prayer scroll",
    duration: "10min",
    concentration: true,
    magicSchool: "abjuration",
    level: 1,
  },
  content: [
    {
      text: "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
    },
  ],
});
