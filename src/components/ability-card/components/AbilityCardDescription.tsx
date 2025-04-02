import { CardContent } from "../../../App";

interface AbilityCardDescription {
  content: CardContent[];
}

export const AbilityCardDescription: React.FC<AbilityCardDescription> = ({
  content,
}) => {
  return (
    <div className=" p-2 text-white">
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
