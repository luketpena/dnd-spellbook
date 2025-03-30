import { CardDetails } from "../../../App";
import { AbilityCardDetail } from "./AbilityCardDetail";

export interface AbilityCardDetailsRowProps extends CardDetails {}

export const AbilityCardDetailsRow: React.FC<AbilityCardDetailsRowProps> = ({
  castingTime,
  duration,
  range,
  components,
  materialComponents,
}) => {
  return (
    <div className="card-details flex gap-4 text-white text-[10px] uppercase px-4 py-1 text-outline">
      <AbilityCardDetail icon="BsClock" text={castingTime} />
      {duration && (
        <AbilityCardDetail icon="BsHourglassSplit" text={duration} />
      )}
      <AbilityCardDetail icon="TbLineDashed" text={range} />
      <AbilityCardDetail
        icon="GiOpenBook"
        text={components.join(",")}
        secondaryText={
          components.includes("M") && materialComponents
            ? `(${materialComponents})`
            : undefined
        }
      />
    </div>
  );
};
