import { CardContent } from "../../../App";

interface AbilityCardDescription {
  content: CardContent[];
}

export const AbilityCardDescription: React.FC<AbilityCardDescription> = ({
  content,
}) => {
  return (
    <div className="p-2 back-shadow text-outline whitespace-pre-line text-xs flex flex-col gap-4 text-white">
      {/* Render each content */}
      {content.map((data, index) => (
        <p key={`description-${index}`}>
          {/* Header */}
          {data.header && (
            <span className="text-emerald-600 font-bold mr-2 uppercase">
              {data.header}
            </span>
          )}
          {/* Text */}
          {data.text && <span>{data.text}</span>}
        </p>
      ))}
    </div>
  );
};
