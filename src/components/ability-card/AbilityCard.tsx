import clsx from "clsx";
import { useContext } from "react";
import { CardCollectionContext } from "../../App";
import { getMagicSchoolIcon } from "../../class-data/magic";
import Icon from "../shared/Icon";
import "./AbilityCard.css";
import { AbilityCardDescription } from "./components/AbilityCardDescription";
import { AbilityCardDetailsRow } from "./components/AbilityCardDetailsRow";
import { AbilityCardSpellLevel } from "./components/AbilityCardSpellLevel";
import { SkillCard } from "./spells";

export interface AbilityCardProps {
  open: boolean;
  onClickOpen: () => void;
  skill: SkillCard;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({
  open,
  onClickOpen,
  skill,
}) => {
  const { title, details, content, backgroundSrc } = skill.data;
  const { magicSchool, level, prepared } = details;
  const cardContext = useContext(CardCollectionContext);

  function handleClick(e: React.MouseEvent, fn: () => void) {
    e.stopPropagation();
    fn();
  }

  return (
    <div
      className={clsx(
        `group w-[400px] cursor-pointer relative  overflow-hidden bg-gray-900  p-2 bg-cover bg-center transition-[height]`,
        open ? "h-[560px]" : "h-[130px]"
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
          transition: "transform 0.1s linear", // Minor fallback smoothness
          // backgroundPositionX: `${Math.floor(cardContext.tilt.x * 32)}px`,
          // backgroundPositionY: `${Math.floor(cardContext.tilt.y * 32)}px`,
        }}
      ></div>

      <div className="border border-white/75  border-x-white/50 border-b-white/25  transition-all h-full p-2 grid grid-rows-[auto_auto_1fr] gap-2 z-0 relative">
        {/* Header */}
        <div className="flex gap-2 items-center justify-between  text-white">
          <div className="flex  grow">
            <div className="text-white w-14 flex items-center justify-center back-shadow">
              <Icon name={getMagicSchoolIcon(details.magicSchool)} size={48} />
            </div>
            <div className="text-outline card-details grow px-4">
              <h2 className="text-2xl back-shadow">{title}</h2>
              <h3 className="capitalize">
                {magicSchool} {level === 0 ? "Cantrip" : `Spell (lvl.${level})`}
              </h3>
            </div>
          </div>

          <AbilityCardSpellLevel level={level} />
        </div>

        {/* Details */}
        <AbilityCardDetailsRow {...details} />

        {/* Description */}
        <div
          className={clsx(
            "transition-opacity flex flex-col gap-2",
            !open && "opacity-0"
          )}
        >
          {details.damage && (
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
          <AbilityCardDescription content={content} />

          {/* Card Actions */}
          <div className="bg-black/75 rounded p-2 text-white backdrop-blur-sm">
            <button
              className={clsx(prepared ? "text-white" : "text-white/50")}
              onClick={(e) => handleClick(e, () => skill.togglePrepare())}
            >
              <Icon name="GiBrain" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
