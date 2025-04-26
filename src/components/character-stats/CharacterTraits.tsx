import { useState } from "react";
import { Trait } from "../../data-management/data-management";
import { Accordion } from "../shared/Accordion";

export const CharacterTraits: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  function toggleIndex(v: number) {
    setOpenIndex(openIndex === v ? -1 : v);
  }

  const racialTraits: Trait[] = [
    {
      title: "Darkvision",
      description:
        "Can see in the dark within 60ft. Dim light appears as if it were bright light, and darkness as if it were dim light. Colors cannot be discerned, only shades of gray.",
    },
    {
      title: "Fiendish Legacy",
      description:
        "At level 1, gain the Chill Touch cantrip. At level 3, gain the spell False Life. And level 5, gain the spell Ray of Enfeeblement. These spells are always prepared and can be cast once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have of the appropriate level.",
    },
    {
      title: "Otherworldly Presence",
      description: "You know the Thaumaturgy cantrip.",
    },
    {
      title: "Resistance to Necrotic Damage",
      description: "Reduce Necrotic damage by half.",
    },
  ];

  const classTraits: Trait[] = [
    {
      title: "Ritual Adept",
      description:
        "You can cast any spell as a Ritual if that spell has the Ritual tag and th spell is in your spellbook. You needn't have the spell prepared, but you must read from the book to cast a spell in this way.",
    },
    {
      title: "Arcane Recovery",
      description:
        "After finishing a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level equal to no more than half of your Wizard level (round up), and none of the slots can be level 6 or higher. Once this is donne, you cannot do so against until you finish a Long Rest.",
    },
    {
      title: "Illusion Savant",
      description:
        "Whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Illusion school to your spellbook for free. The chosen spell must be of a level for which you have spell slots.",
    },
    {
      title: "Improved Illusions",
      description:
        "You can cast Illusions without Verbal components, and if an Illusion has a range of 10+ feet, the range increases by 60 feet. Minor Illusion no longer counts against your known cantrips. It can create both a sound and am image in a single casting and can be cast as a Bonus Action.",
    },
  ];

  return (
    <div className="grid grid-rows-[auto_auto] gap-2 max-w-[500px]">
      <div>
        <h2 className="font-bold text-xl text-orange-400 mb-2">
          Racial Traits
        </h2>
        <div className=" text-white">
          {racialTraits.map((trait, index) => (
            <div className="bg-slate-700 px-2">
              <Accordion
                title={trait.title}
                index={index}
                openIndex={openIndex}
                onOpenChange={(v) => toggleIndex(v)}
                scrollOnOpen
              >
                <p>{trait.description}</p>
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl text-orange-400 mb-2">Class Traits</h2>
        <div className=" text-white ">
          {classTraits.map((trait, index) => (
            <div className="bg-slate-700 px-2">
              <Accordion
                title={trait.title}
                index={index + racialTraits.length}
                openIndex={openIndex}
                onOpenChange={(v) => toggleIndex(v)}
                scrollOnOpen
              >
                <p>{trait.description}</p>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
