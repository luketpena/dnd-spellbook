import Icon, { IconName } from "../../shared/Icon";

export interface AbilityCardDetailProps {
  icon: IconName;
  text: string;
  secondaryText?: string;
}

export const AbilityCardDetail: React.FC<AbilityCardDetailProps> = ({
  icon,
  text,
  secondaryText,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Icon name={icon} size={16} />
      <span>{text}</span>
      {secondaryText && <span className="capitalize">{secondaryText}</span>}
    </div>
  );
};
