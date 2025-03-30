import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import "./assets/styles/reusable-styles.css";
import { InputText } from "./components/form-components/InputText";
import { AbilityCard } from "./components/ability-card/AbilityCard";
import { useEffect, useState } from "react";
import {
  SpellFireBolt,
  SpellMinorIllusion,
} from "./components/ability-card/spells";

export type CastingComponents = "S" | "M" | "V" | "C";
export type Dice = 4 | 6 | 8 | 10 | 12 | 20;
export interface Damage {
  type: string;
  count: number;
  dice: Dice;
}

export interface DamageWithLevel extends Omit<Partial<Damage>, "type"> {
  level: number;
}

export interface CardDetails {
  duration?: string;
  range: string;
  castingTime: string;
  level: number;
  magicSchool: string;
  components: CastingComponents[];
  materialComponents?: string;
  damage?: Damage;
  damageScaling?: DamageWithLevel[];
}

export interface CardForm {
  title: string;
  content: CardContent[];
  details: CardDetails;
  backgroundSrc: string;
}

export interface CardContent {
  header?: string;
  text?: string;
}

function App() {
  const form = useForm<CardForm>({
    defaultValues: {
      title: "Minor Illusion",
      details: {
        duration: "1 Minute",
        range: "30ft",
        castingTime: "Action",
        magicSchool: "Illusion",
        level: 0,
        components: ["S", "M"],
        materialComponents: "fleece",
      },

      content: [
        {
          text: "Create a sound or image for the duration.",
        },
        {
          header: "Single illusion",
          text: "Only 1 minor illusion can be active. Recasting ends prior illusion.",
        },
        {
          header: "Counter",
          text: "Creature can take study action to examine. INT (Investigation) check vs spell save DC. If perceived, the illusion becomes faint to them.",
        },
        {
          header: "Sound",
          text: "Whisper to scream in volume, any sound. Single continuous or many discrete.",
        },
        {
          header: "Image",
          text: "5ft cube, no other sensory experience and no light emission. Objects pass through it.",
        },
      ],
    },
  });

  const spells: CardForm[] = [SpellMinorIllusion, SpellFireBolt];

  const [openIndex, setOpenIndex] = useState<number | null>(1);

  function toggleOpenIndex(v: number) {
    setOpenIndex(openIndex === v ? null : v);
  }

  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);

  const [hasGyro, setHasGryro] = useState<string | null>(null);

  useEffect(() => {
    console.log("app init");
    checkGyroSupport();
  }, []);

  function handleDeviceOrientation(e: DeviceOrientationEvent) {
    setGamma(-3);
    if (!e.alpha && !e.beta && !e.gamma) {
      return;
    }

    console.log("rotate");

    setAlpha(e.alpha ?? -2);
    setBeta(e.beta ?? -2);
    setGamma(e.gamma ?? -2);
  }

  async function checkGyroSupport() {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permissionState = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permissionState === "granted") {
          console.log(
            "DeviceOrientationEvent is supported and permission granted!"
          );
          setHasGryro("permission granted");
          window.addEventListener("deviceorientation", handleDeviceOrientation);
        } else {
          console.log("DeviceOrientationEvent permission denied.");
          setHasGryro("permission denied");
        }
      } catch (error) {
        console.error(
          "Error requesting DeviceOrientationEvent permission:",
          error
        );
        setHasGryro("error requesting permission");
      }
    } else {
      console.log(
        "DeviceOrientationEvent is supported without explicit permission."
      );
      setHasGryro("permission not required");
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  }

  return (
    <>
      <p>Has gyro: {hasGyro}</p>
      <p>Alpha: {alpha}</p>
      <p>Beta: {beta}</p>
      <p>Gamma: {gamma}</p>

      <div className="m-8">
        {spells.map((spell, index) => (
          <AbilityCard
            key={`ability-card-${index}`}
            {...spell}
            open={openIndex === index}
            onClickOpen={() => toggleOpenIndex(index)}
          />
        ))}
        {/* <AbilityCard
          {...form.getValues()}
          open={openIndex === 0}
          onClickOpen={() => toggleOpenIndex(0)}
        />
        <AbilityCard
          {...form.getValues()}
          open={openIndex === 1}
          onClickOpen={() => toggleOpenIndex(1)}
        /> */}
      </div>

      <FormProvider {...form}>
        <InputText name="title" />
      </FormProvider>
    </>
  );
}

export default App;
