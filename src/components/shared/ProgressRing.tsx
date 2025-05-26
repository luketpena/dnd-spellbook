export interface ProgressRingProps {
  progress: number;
  color?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  color = "#ffffff",
}) => {
  return (
    <svg
      width="150"
      height="150"
      viewBox="-25 -25 250 250"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "rotate(-90deg)",
      }}
      className="transition-all opacity-50 group-hover:opacity-100 "
    >
      <circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke="#e0e0e055"
        strokeWidth="16px"
      ></circle>
      <circle
        r="90"
        cx="100"
        cy="100"
        stroke={color}
        strokeWidth="16px"
        strokeLinecap="round"
        strokeDasharray="565.48px"
        fill="transparent"
        strokeDashoffset={`${565.48 * (1 - progress)}px`}
        style={{
          transition: "all 1s",
        }}
      ></circle>
    </svg>
  );
};
