import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import { IconType } from "react-icons";

const Icons = {
  ...GiIcons,
  ...BsIcons,
  ...TbIcons,
  ...BiIcons,
  ...RiIcons,
};

export type IconName = keyof typeof Icons;

type IconProps = {
  name: IconName;
  size?: number;
};

const Icon = ({ name, size = 24 }: IconProps) => {
  const IconComponent = (Icons as { [key: string]: IconType })[name];

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent size={size} />;
};

export default Icon;
