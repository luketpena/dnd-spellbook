import clsx from "clsx";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CardCollectionContext } from "../../App";
import { getMagicSchoolIcon } from "../../class-data/magic";
import Icon from "../shared/Icon";
import "./AbilityCard.css";
import { AbilityCardDescription } from "./components/AbilityCardDescription";
import { AbilityCardDetailsRow } from "./components/AbilityCardDetailsRow";
import { AbilityCardSpellLevel } from "./components/AbilityCardSpellLevel";
import { SkillCard } from "./spells";
import { Modal } from "../shared/Modal";
import { useStore } from "zustand";
import { userDataStore } from "../../data-management/data-management";
import { getSpellSlots } from "../spell-slots/SpellSlotRow";

export interface AbilityCardProps {
  open: boolean;
  onClickOpen: () => void;
  skill: SkillCard;
  fixedHeight?: boolean;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({
  open,
  onClickOpen,
  skill,
  fixedHeight = true,
}) => {
  const { spellSlotUsage, castSpell, xp, activeSpellConcentration } =
    useStore(userDataStore);
  const { title, details, content, backgroundSrc } = skill.data;
  const { magicSchool, level } = details;
  const cardContext = useContext(CardCollectionContext);
  const [spellCastingOpen, setSpellCastingOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const spellSlots = useMemo(() => {
    // Get all spell slots that are at or above the spell card level
    return getSpellSlots(xp, spellSlotUsage).filter(
      (slot) => slot.level >= level
    );
  }, [xp, spellSlotUsage, level]);

  function handleCastSpell(skill: SkillCard, slotLevel: number) {
    castSpell(skill, slotLevel);
    setSpellCastingOpen(false);
  }

  return (
    <>
      <div
        className={clsx(
          `group w-[400px] cursor-pointer relative  overflow-hidden bg-gray-900  p-2 bg-cover bg-center transition-[height]`,
          fixedHeight ? (open ? "h-[560px]" : "h-[130px]") : ""
        )}
        onClick={() => onClickOpen()}
        role="button"
      >
        {/* Background */}
        <div
          className="absolute top-[-50px] left-[-50px] w-[calc(100%+100px)] h-[calc(100%+100px)] z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundSrc})`,
            transform: `translate3d(${cardContext.tilt.x * 32}px, ${
              cardContext.tilt.y * 32
            }px, 0)`,
            transition: "transform 0.1s linear",
          }}
        ></div>

        <div
          ref={contentRef}
          className=" border border-white/75  border-x-white/50 border-b-white/25  transition-all h-full p-2 grid grid-rows-[auto_auto_1fr] gap-2 z-0 relative"
        >
          {/* Header */}
          <div className="flex gap-2 items-center justify-between  text-white">
            <div className="flex  grow">
              <div className="text-white w-14 flex items-center justify-center back-shadow">
                <Icon
                  name={getMagicSchoolIcon(details.magicSchool)}
                  size={48}
                />
              </div>
              <div className="text-outline card-details grow px-4">
                <h2 className="text-2xl back-shadow">{title}</h2>
                <h3 className="capitalize">
                  {magicSchool}{" "}
                  {level === 0 ? "Cantrip" : `Spell (lvl.${level})`}
                </h3>
              </div>
            </div>

            <AbilityCardSpellLevel
              level={level}
              onClick={() => setSpellCastingOpen(true)}
            />
          </div>

          {/* Details */}
          <AbilityCardDetailsRow {...details} />

          <div
            className={clsx(
              "transition-opacity grid grid-rows-[auto_1fr] ",
              !open && "opacity-0"
            )}
          >
            {/* Damage */}
            {!details.damage ? (
              <div></div>
            ) : (
              <div className="bg-black/75 p-2 rounded text-xs text-white">
                <div>
                  {details.damage.count}d{details.damage.dice}{" "}
                  {details.damage.type} Damage
                </div>
                {details.damageScaling && (
                  <div className="mt-2">
                    <h4 className="uppercase font-bold">Level Scaling</h4>

                    {details.damageScaling.map((damage, index) => (
                      <div className="flex gap-2" key={`damage-scale-${index}`}>
                        <div className="text-right w-12 font-semibold">
                          Lvl.{damage.level}
                        </div>
                        <div>
                          {damage.count ?? details.damage?.count}d
                          {damage.dice ?? details.damage?.dice}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="relative ">
              <div
                className={clsx(
                  "w-full h-full no-scrollbar overflow-y-auto bg-black/75 rounded backdrop-blur-sm",
                  fixedHeight && "absolute left-0 top-0 "
                )}
              >
                <AbilityCardDescription content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={spellCastingOpen}
        onClose={() => setSpellCastingOpen(false)}
        title={`Cast ${title}`}
      >
        <div className="text-white  mb-4">
          <p className="capitalize  text-xl font-semibold">
            {level === 0 ? "" : `Level ${level} `}
            {magicSchool}
            {level === 0 ? " Cantrip" : " Spell"}
          </p>
          <div className="italic text-xs text-slate-300">
            <p>Casting time: {details.castingTime}</p>
            {details.materialComponents && (
              <p>Material components: {details.materialComponents}</p>
            )}
          </div>
        </div>

        {details.concentration && (
          <div
            className={clsx(
              "p-4 mb-4 border rounded font-semibold flex flex-col",
              !activeSpellConcentration
                ? "bg-black/25 dashed border-white text-white"
                : activeSpellConcentration === title
                ? "bg-orange-500/25 border-orange-500 text-orange-100"
                : "bg-red-500/25 border-red-500 text-red-100"
            )}
          >
            <span>
              {!activeSpellConcentration
                ? "This spell requires Concentration."
                : activeSpellConcentration === title
                ? "This spell is already being Concentrated on."
                : "This spell will replace Concentration."}
            </span>
            {activeSpellConcentration && activeSpellConcentration != title && (
              <span className="text-xs font-extralight">
                Current spell: {activeSpellConcentration}
              </span>
            )}
          </div>
        )}

        {level === 0 ? (
          <p className="text-white italic">Does not require a spell slot</p>
        ) : (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleCastSpell(skill, 0)}
              className="text-white flex flex-col p-2 h-[64px] w-[74px]  aspect-square relative rounded-lg  bg-black/75 bg-hexagon-flat items-center justify-center"
            >
              <span className="text-sm leading-3">FREE</span>
              <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
            </button>

            {details.ritual && (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleCastSpell(skill, 0)}
                  className="text-white flex flex-col p-2 h-[64px] w-[74px]  aspect-square relative rounded-lg  bg-black/75 bg-hexagon-flat items-center justify-center"
                >
                  <span className="text-sm leading-3">RITUAL</span>
                  <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
                </button>
                <p className="text-xs text-white mt-1">+10min</p>
              </div>
            )}

            {spellSlots.map((slot) => (
              <div
                key={`spell-casting-slot-${slot.level}`}
                className="flex flex-col gap-1 items-center"
              >
                {/* Button */}
                <button
                  onClick={() => handleCastSpell(skill, slot.level)}
                  disabled={slot.usage === slot.count}
                  className="text-white flex flex-col p-2 h-[64px] w-[74px]  aspect-square relative rounded-lg  bg-black/75 bg-hexagon-flat items-center justify-center disabled:opacity-50"
                >
                  <span className="text-xs leading-3">LEVEL</span>
                  <span className=" text-white text-4xl leading-[30px]">
                    {slot.level}
                  </span>
                  <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
                </button>

                {/* Usage pips */}
                {Array.from({ length: slot.count }).map((v, index) => (
                  <div
                    key={`level-${slot.level}-${index}`}
                    className={clsx(
                      "w-4 h-4 aspect-square bg-white ",
                      slot.usage > index
                        ? "bg-hexagon-flat-outline"
                        : "bg-hexagon-flat"
                    )}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};
