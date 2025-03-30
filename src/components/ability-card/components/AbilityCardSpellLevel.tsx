interface AbilityCardSpellLevel {
  level: number;
}

export const AbilityCardSpellLevel: React.FC<AbilityCardSpellLevel> = ({
  level,
}) => {
  return (
    <span className="text-white flex flex-col p-2 relative rounded-lg h-full bg-black/75 bg-hexagon-flat items-center justify-center ">
      <span className="text-xs leading-3">LEVEL</span>
      <span className=" text-white text-4xl leading-[30px]">{level}</span>
      <div className="absolute w-full h-full bg-white bg-hexagon-flat-outline"></div>
    </span>
  );
};
