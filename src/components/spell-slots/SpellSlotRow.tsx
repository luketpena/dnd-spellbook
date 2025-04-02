import { useEffect } from "react";
import { SpellSlot } from "../../class-data/class-data";

interface SpellSlotRowProps {
  slots: SpellSlot[];
}

export const SpellSlotRow: React.FC<SpellSlotRowProps> = ({ slots }) => {
  useEffect(() => {
    console.log("slots:", slots);
  }, []);

  return (
    <div>
      {slots.map((slot) => (
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
      ))}
    </div>
  );
};
