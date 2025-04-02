import clsx from "clsx";
import { CardContent } from "../../../App";

interface AbilityCardDescription {
  content: CardContent[];
}

export const AbilityCardDescription: React.FC<AbilityCardDescription> = ({
  content,
}) => {
  return (
    <div
      className={clsx(
        "bg-black/75 rounded p-2 text-white backdrop-blur-sm overflow-y-auto no-scrollbar transition-opacity h-full"
      )}
    >
      <span className="back-shadow text-outline whitespace-pre-line text-xs flex flex-col gap-4">
        {content.map((data, index) => (
          <p key={`description-${index}`}>
            {data.header && (
              <span className="text-emerald-600 font-bold mr-2 uppercase">
                {data.header}
              </span>
            )}
            {data.text && <span>{data.text}</span>}
          </p>
        ))}
      </span>
    </div>
  );
};
