import clsx from "clsx";
import { useMemo, useState } from "react";
import { useStore } from "zustand";
import { spellList } from "../../App";
import { userDataStore } from "../../data-management/data-management";
import { AbilityCard } from "../ability-card/AbilityCard";
import Icon from "../shared/Icon";
import { Modal } from "../shared/Modal";

export const SpellConcentration: React.FC = () => {
  const { activeSpellConcentration, resetSpellConcentration } =
    useStore(userDataStore);
  const activeSpell = useMemo(() => {
    if (!activeSpellConcentration) return undefined;

    return spellList.find(
      (spell) => spell.data.title === activeSpellConcentration
    );
  }, [activeSpellConcentration]);

  const [skillViewOpen, setSkillViewOpen] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "w-[400px] h-[64px] text-white border-4 m-8 flex items-center ",
          activeSpell ? "animate-pulse" : "border-dashed opacity-50"
        )}
      >
        {activeSpell && (
          <button className="px-3" onClick={resetSpellConcentration}>
            <Icon name="RiCloseFill" />
          </button>
        )}

        <button
          className="w-full h-full"
          onClick={() => setSkillViewOpen(!skillViewOpen)}
        >
          <span>
            {activeSpell
              ? `Concentration: ${activeSpell.data.title}`
              : "No active concentration spell"}
          </span>{" "}
          {activeSpell && <span>({activeSpell.data.details.duration})</span>}
        </button>

        {activeSpell && (
          <div className="px-3 animate-spin">
            <Icon name="GiSelect" />
          </div>
        )}
      </div>
      <Modal
        open={skillViewOpen}
        onClose={() => setSkillViewOpen(false)}
        noPadding
      >
        {activeSpell && (
          <AbilityCard
            open={true}
            onClickOpen={() => {}}
            skill={activeSpell}
            fixedHeight={false}
          />
        )}
      </Modal>
    </>
  );
};
