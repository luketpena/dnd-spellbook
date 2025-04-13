import { useContext, useEffect, useState } from "react";
import { CardCollectionContext } from "../../App";
import clsx from "clsx";
import { SkillCard } from "../ability-card/spells";

export const SpellPreparation: React.FC = () => {
  const { spells } = useContext(CardCollectionContext);
  const [preparedSpells, setPreparedSpells] = useState<string[]>([]);

  useEffect(() => {
    const savedPreparedList = localStorage.getItem("preparedSpells");
    if (savedPreparedList) {
      setPreparedSpells(savedPreparedList.split(","));
    }
  }, []);

  function toggleSpell(spell: SkillCard) {
    const spellIndex = preparedSpells.indexOf(spell.data.title);
    if (spellIndex >= 0) {
      const newList = [
        ...preparedSpells.slice(0, spellIndex),
        ...preparedSpells.slice(spellIndex + 1),
      ];
      setPreparedSpells(newList);
      localStorage.setItem("preparedSpells", newList.toString());
    } else {
      const newList = [...preparedSpells, spell.data.title];
      setPreparedSpells(newList);
      localStorage.setItem("preparedSpells", newList.toString());
    }
  }

  return (
    <div className="flex flex-col gap-1 text-white/50 p-4">
      {spells.map((spell, index) => (
        <button
          key={`spell-prep-${index}`}
          className={clsx(
            "text-left",
            preparedSpells.includes(spell.data.title) && "text-white"
          )}
          onClick={() => toggleSpell(spell)}
        >
          {spell.data.title}
        </button>
      ))}
    </div>
  );
};
