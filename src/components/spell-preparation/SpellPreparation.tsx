import { useContext, useEffect, useState } from "react";

import clsx from "clsx";
import { SkillCard } from "../ability-card/spells";
import { CardCollectionContext } from "../../pages/HomePage";

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
    <div className="flex flex-col flex-wrap h-[300px] text-white/50 p-4 overflow-hidden">
      {spells.map((spell, index) => (
        <button
          key={`spell-prep-${index}`}
          className={clsx(
            "text-left px-2 py-1",
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
