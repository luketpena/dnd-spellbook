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
import { ProgressRing } from "../shared/ProgressRing";

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
            <ProgressRing progress={progress} color="#00ffff" />
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
