import { useEffect, useMemo } from "react";
import { useStore } from "zustand";
import {
  getLevelFromXp,
  userDataStore,
} from "../../data-management/data-management";
import clsx from "clsx";
// import { SpellSlot } from "../../class-data/class-data";

interface SpellSlot {
  level: number;
  count: number;
}

const wizardSpellSlots: { [label: string]: SpellSlot[] } = {
  "1": [
    { level: 1, count: 2 },
    { level: 2, count: 3 },
    { level: 3, count: 4 },
  ],
  "2": [
    { level: 3, count: 2 },
    { level: 4, count: 3 },
  ],
  "3": [
    { level: 5, count: 2 },
    { level: 6, count: 3 },
  ],
  "4": [
    { level: 7, count: 1 },
    { level: 8, count: 2 },
    { level: 9, count: 3 },
  ],
  "5": [
    { level: 9, count: 1 },
    { level: 10, count: 2 },
    { level: 18, count: 3 },
  ],
  "6": [
    { level: 11, count: 1 },
    { level: 19, count: 2 },
  ],
  "7": [
    { level: 13, count: 1 },
    { level: 20, count: 2 },
  ],
  "8": [{ level: 15, count: 1 }],
  "9": [{ level: 15, count: 17 }],
};

interface SpellSlotRowProps {
  // slots: SpellSlot[];
}

const isEven = (v: number) => v % 2 === 0;

export const SpellSlotRow: React.FC<SpellSlotRowProps> = () => {
  const { xp, spellSlotUsage } = useStore(userDataStore);

  const spellSlots = useMemo(() => {
    const level = getLevelFromXp(xp);
    return Object.entries(wizardSpellSlots)
      .map(([key, tiers]) => {
        const entry = tiers
          .sort((a, b) => b.level - a.level)
          .find((v) => v.level <= level);
        const slotLevel = Number(key);
        return {
          level: slotLevel,
          count: entry === undefined ? 0 : entry.count,
          usage: spellSlotUsage[slotLevel - 1],
        };
      })
      .filter((entry) => entry.count > 0);
  }, [xp, spellSlotUsage]);

  return (
    <div className="text-white flex flex-col gap-2 w-max">
      {spellSlots.map((slot) => (
        <div key={`spell-slot-${slot.level}`} className="flex gap-2">
          {/* Spell slot usage pips */}
          <div className="relative  w-8">
            {Array.from({ length: slot.count }).map((v, index) => (
              <div
                key={`level-${slot.level}-${index}`}
                style={{ top: 9 * index, right: isEven(index) ? 12 : 0 }}
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
      {/* {slots.map((slot) => (
        <span
          key={`spell-slot-${slot.level}`}
          className="text-white flex flex-col p-2 relative rounded-lg h-16 bg-black/75 bg-hexagon-flat items-center justify-center "
        >
          <span className=" text-white text-4xl leading-[30px]">
            {slot.level}
          </span>
          <span className="text-xs leading-3">LEVEL</span>
          <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
        </span>
      ))} */}
    </div>
  );
};
