import clsx from "clsx";
import { CardForm } from "../../App";
import Icon from "../shared/Icon";
import "./AbilityCard.css";
import { AbilityCardDetailsRow } from "./components/AbilityCardDetailsRow";
import { AbilityCardDescription } from "./components/AbilityCardDescription";
import { AbilityCardSpellLevel } from "./components/AbilityCardSpellLevel";

export interface AbilityCardProps extends CardForm {
  open: boolean;
  onClickOpen: () => void;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({
  title,
  details,
  content,
  open,
  onClickOpen,
  backgroundSrc,
}) => {
  const { magicSchool, level } = details;

  return (
    <div
      className={clsx(
        `group w-[400px] cursor-pointer relative transition-all overflow-hidden bg-green-700 rounded-lg p-2 bg-cover bg-center`,
        open ? "h-[560px]" : "h-[130px]"
      )}
      style={{ backgroundImage: `url(${backgroundSrc})` }}
      onClick={() => onClickOpen()}
      role="button"
    >
      {/* <div className="absolute w-full h-full left-0 top-0 bg-black/50 group-hover:opacity-0 transition-opacity"></div> */}
      <div className="border border-white/75  border-x-white/50 border-b-white/25  transition-all h-full rounded-md p-2 grid grid-rows-[auto_auto_1fr] gap-2">
        {/* Header */}
        <div className="flex gap-2 items-center justify-between  text-white">
          <div className="flex  grow">
            <div className="text-purple-400 w-14 flex items-center justify-center back-shadow">
              <Icon name="GiSheikahEye" size={48} />
            </div>
            <div className="text-outline card-details grow px-4">
              <h2 className="text-2xl back-shadow">{title}</h2>
              <h3>
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
        </div>
      </div>
    </div>
  );
};
