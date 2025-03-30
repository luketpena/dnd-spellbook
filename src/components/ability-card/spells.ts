import { CardForm } from "../../App";

export const SpellMinorIllusion: CardForm = {
  title: "Minor Illusion",
  details: {
    duration: "1 Minute",
    range: "30ft",
    castingTime: "Action",
    magicSchool: "Illusion",
    level: 0,
    components: ["S", "M"],
    materialComponents: "fleece",
  },
  backgroundSrc: "src/assets/backgrounds/minor-illusion.webp",

  content: [
    {
      text: "Create a sound or image for the duration.",
    },
    {
      header: "Single illusion",
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
};

export const SpellFireBolt: CardForm = {
  title: "Fire Bolt",
  details: {
    range: "120ft",
    castingTime: "Action",
    magicSchool: "Evocation",
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
  backgroundSrc: "src/assets/backgrounds/firebolt.webp",
  content: [
    {
      text: "Hurl a mote of fire at a creature or an object within range.",
    },
    {
      text: `Flammable objects hit by this spell start burning if they aren't being worn or carried.`,
    },
  ],
};
