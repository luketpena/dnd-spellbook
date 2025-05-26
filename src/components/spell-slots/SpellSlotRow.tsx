import clsx from "clsx";
import { useMemo } from "react";
import { useStore } from "zustand";
import { charDataStore } from "../../data-management/char-data.management";
import { userDataStore } from "../../data-management/data-management";
import { isEven } from "../../utility/math.util";
import Icon from "../shared/Icon";
import { getSpellSlots } from "./spell-slot-row.util";

interface SpellSlotRowProps {}

export const SpellSlotRow: React.FC<SpellSlotRowProps> = () => {
  const { xp, spellSlotUsage, incrementSpellSlotUsage } =
    useStore(userDataStore);
  const { charClass } = useStore(charDataStore);

  const spellSlots = useMemo(() => {
    return getSpellSlots(xp, spellSlotUsage, charClass);
  }, [xp, spellSlotUsage, charClass]);

  return (
    <div className="text-white flex flex-col gap-2 w-max">
      {spellSlots.map((slot) => (
        <div key={`spell-slot-${slot.level}`} className="flex gap-2">
          {/* + and - buttons */}
          <div className="flex flex-col justify-around">
            <button onClick={() => incrementSpellSlotUsage(slot.level, -1)}>
              <Icon name="BiPlus" />
            </button>
            <button onClick={() => incrementSpellSlotUsage(slot.level, 1)}>
              <Icon name="BiMinus" />
            </button>
          </div>

          {/* Spell slot usage pips */}
          <div className="relative  w-8">
            {Array.from({ length: slot.count }).map((v, index) => (
              <div
                key={`level-${slot.level}-${index}`}
                style={{ top: 9 * index, right: isEven(index) ? 13 : 0 }}
                className={clsx(
                  "w-4 h-4 aspect-square bg-white absolute",
                  slot.usage > index
                    ? "bg-hexagon-flat-outline"
                    : "bg-hexagon-flat"
                )}
              ></div>
            ))}
          </div>
          {/* Spell slot level indicator */}
          <span className="text-white flex flex-col p-2 relative rounded-lg h-16 bg-black/75 bg-hexagon-flat items-center justify-center ">
            <span className=" text-white text-4xl leading-[30px]">
              {slot.level}
            </span>
            <span className="text-xs leading-3">LEVEL</span>
            <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
          </span>
        </div>
      ))}
    </div>
  );
};
