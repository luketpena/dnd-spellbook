import { useStore } from "zustand";
import {
  getLevelFromXp,
  levelExpThresholds,
  userDataStore,
} from "../../data-management/data-management";
import { useMemo, useState } from "react";
import { Modal } from "../shared/Modal";
import { Button } from "../shared/Button";
import { Input } from "../shared/form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useLongPress } from "use-long-press";

type XpFormMode = "add" | "set";

export const CharacterLevel: React.FC = () => {
  const { xp, addXp, setXp } = useStore(userDataStore);
  const [xpModalOpen, setXpModalOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      xp: 0,
    },
  });

  const [xpFormMode, setXpFormMode] = useState<XpFormMode | null>(null);
  const [longPressed, setLongPressed] = useState(false);
  const longPressHandlers = useLongPress(() => {
    console.log("please work!");
    setLongPressed(true);
    openModal("set");
  });

  const level = useMemo(() => {
    return getLevelFromXp(xp);
  }, [xp]);

  const nextXpGoal = useMemo(() => {
    const index = 19 - level;
    return levelExpThresholds[index];
  }, [xp, level]);

  const priorXpGoal = useMemo(() => {
    const index = 19 - level;
    return levelExpThresholds[index + 1];
  }, [xp, level]);

  const progress = useMemo(() => {
    const index = 19 - level;
    const xpGoal = levelExpThresholds[index];
    const xpGoalPrevious = levelExpThresholds[index + 1];
    const diff = xpGoal - xpGoalPrevious;
    const progressFromZero = xp - xpGoalPrevious;

    return progressFromZero / diff;
  }, [level, xp]);

  function openModal(mode: XpFormMode) {
    setXpFormMode(mode);
    form.setValue("xp", mode === "add" ? 0 : xp);
    setXpModalOpen(true);
  }

  return (
    <div>
      <button
        {...longPressHandlers()}
        className="relative w-[150px] group"
        onClick={() => {
          if (!longPressed) {
            openModal("add");
          } else {
            setLongPressed(false);
          }
        }}
        onMouseUp={() => {
          setLongPressed(false);
        }}
      >
        <div className="text-white relative  h-[150px]  flex items-center justify-center">
          <div className="flex flex-col items-center">
            <p className="text-xs leading-3">LEVEL</p>
            <p className="text-4xl leading-12">{level}</p>
          </div>
          <div className="absolute top-0 left-0 scale-95 group-hover:scale-100 transition-transform">
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
                stroke="#00ffff"
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
          </div>
        </div>

        <p className="relative leading-3 text-white text-center top-[-12px] flex flex-col">
          <span className="font-semibold">{xp}</span>
          <span className="text-xs opacity-50">
            ({xp - priorXpGoal} / {nextXpGoal - priorXpGoal})
          </span>
        </p>
      </button>
      <Modal open={xpModalOpen} onClose={() => setXpModalOpen(false)}>
        <FormProvider {...form}>
          {xpFormMode === "set" && (
            <p className="font-semibold text-orange-400 mb-1">
              This will reset your XP to input value.
            </p>
          )}
          <form className="flex gap-2">
            <Input type="number" name="xp" required min={1} />
            <Button
              text={xpFormMode === "add" ? "Add XP" : "Set XP"}
              disabled={!form.formState.isValid}
              onClick={() => {
                setXpModalOpen(false);
                switch (xpFormMode) {
                  case "add":
                    addXp(form.getValues().xp);
                    break;
                  case "set":
                    setXp(form.getValues().xp);
                    break;
                }
                form.reset();
              }}
            />
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};
