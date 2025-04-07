import { createContext, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import "./assets/styles/reusable-styles.css";
import { MagicSchool } from "./class-data/magic";
import { AbilityCard } from "./components/ability-card/AbilityCard";
import {
  SkillCard,
  SpellCharmPerson,
  SpellChillTouch,
  SpellDetectMagic,
  SpellDisguiseSelf,
  SpellFindFamiliar,
  SpellFireBolt,
  SpellMageArmor,
  SpellMageHand,
  SpellMagicMissile,
  SpellMinorIllusion,
  SpellShield,
  SpellSilentImage,
  SpellThaumaturgy,
} from "./components/ability-card/spells";
import { SlideMenu, SlideMenuButton } from "./components/slide-menu/SlideMenu";

// @ts-nocheck

interface CardCollectionContextType {
  tilt: {
    x: number;
    y: number;
  };
}
export const CardCollectionContext = createContext<CardCollectionContextType>({
  tilt: { x: 0, y: 0 },
});

export type CastingComponents = "S" | "M" | "V" | "C";
export type Dice = 4 | 6 | 8 | 10 | 12 | 20;
export interface Damage {
  type: string;
  count: number;
  dice: Dice;
  modifier?: string;
}

export interface DamageWithLevel extends Omit<Partial<Damage>, "type"> {
  level: number;
}

export interface CardDetails {
  duration?: string;
  range: string;
  castingTime: string;
  level: number;
  magicSchool: MagicSchool;
  components: CastingComponents[];
  materialComponents?: string;
  damage?: Damage;
  damageScaling?: DamageWithLevel[];
  prepared?: boolean;
  ritual?: boolean;
  concentration?: boolean;
}

export interface CardForm {
  title: string;
  content: CardContent[];
  details: CardDetails;
  backgroundSrc?: string;
}

export interface CardContent {
  header?: string;
  text?: string;
}

export type SpellSortTarget = "level" | "magicSchool" | "title";
export type SortDirection = "asc" | "desc";

const lerp = (start: number, end: number, amount: number) => {
  return start + (end - start) * amount;
};

function App() {
  const spellList: SkillCard[] = [
    SpellMinorIllusion,
    SpellFireBolt,
    SpellMageHand,
    SpellMageArmor,
    SpellSilentImage,
    SpellShield,
    SpellDetectMagic,
    SpellDisguiseSelf,
    SpellCharmPerson,
    SpellMagicMissile,
    SpellChillTouch,
    SpellThaumaturgy,
    SpellFindFamiliar,
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // @ts-ignore
  const [sort, setSort] = useState<SpellSortTarget>("level");
  // @ts-ignore
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const spells = useMemo(() => {
    return spellList.sort((a, b) => {
      const dir = sortDir === "desc" ? 1 : -1;
      const titleA = a.data.title.toUpperCase();
      const titleB = b.data.title.toUpperCase();

      switch (sort) {
        case "title":
          return titleA < titleB ? -dir : titleA > titleB ? dir : 0;

        case "magicSchool":
          // Sorts by school first, then alphabetically within that
          const schoolA = a.data.details.magicSchool.toUpperCase();
          const schoolB = b.data.details.magicSchool.toUpperCase();
          if (schoolA < schoolB) return -dir;
          if (schoolA > schoolB) return dir;
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;

        case "level":
          // Sorts by level first, then alphabetically within that
          const levelSort = (b.data.details.level - a.data.details.level) * dir;
          return levelSort === 0
            ? titleA < titleB
              ? -1
              : titleA > titleB
              ? 1
              : 0
            : levelSort;
      }
    });
  }, [sort, sortDir, spellList]);

  function toggleOpenIndex(v: number) {
    setOpenIndex(openIndex === v ? null : v);
    setTimeout(() => {
      document
        .getElementById(`spell-${v}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  const targetTilt = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);
  const [cardCollectionData, setCardCollectionData] =
    useState<CardCollectionContextType>({ tilt: { x: 0, y: 0 } });

  useEffect(() => {
    checkGyroSupport();
  }, []);

  function handleDeviceOrientation(e: DeviceOrientationEvent) {
    if (!e.alpha && !e.beta && !e.gamma) {
      return;
    }

    targetTilt.current.x = ((e.beta ?? 0) / 30) * -1;
    targetTilt.current.y = (e.gamma ?? 0) / 30;

    if (!animFrame.current) {
      animateTilt();
    }
  }

  function animateTilt() {
    setCardCollectionData((prev) => {
      const smoothX = lerp(prev.tilt.x, targetTilt.current.x, 0.1);
      const smoothY = lerp(prev.tilt.y, targetTilt.current.y, 0.1);

      animFrame.current = requestAnimationFrame(animateTilt);
      return {
        tilt: {
          x: smoothX,
          y: smoothY,
        },
      };
    });
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

          window.addEventListener("deviceorientation", handleDeviceOrientation);
        } else {
          console.log("DeviceOrientationEvent permission denied.");
        }
      } catch (error) {
        console.error(
          "Error requesting DeviceOrientationEvent permission:",
          error
        );
      }
    } else {
      console.log(
        "DeviceOrientationEvent is supported without explicit permission."
      );

      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  }

  const filterMenuButtons = useMemo<SlideMenuButton[]>(() => {
    return [
      {
        text: "Category",
        action: (v: SpellSortTarget) => setSort(v),
        dropdownOptions: [
          {
            text: "School",
            value: "school",
          },
          {
            text: "Title",
            value: "title",
          },
          {
            text: "Level",
            value: "level",
          },
        ],
      },
      {
        text: "Direction",
        action: (v: SortDirection) => setSortDir(v),
        dropdownOptions: [
          {
            text: "Asc",
            value: "asc",
          },
          {
            text: "Desc",
            value: "desc",
          },
        ],
      },
    ];
  }, [sortDir, sort]);

  return (
    <>
      <CardCollectionContext.Provider value={cardCollectionData}>
        <div className="grid grid-cols-[auto_1fr] bg-black h-dvh">
          {/* Spell List */}
          <div className="h-dvh overflow-auto no-scrollbar">
            <div className="flex flex-col h-max">
              {spells.map((skill, index) => (
                <span id={`spell-${index}`}>
                  <AbilityCard
                    key={`ability-card-${index}`}
                    skill={skill}
                    open={openIndex === index}
                    onClickOpen={() => toggleOpenIndex(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Spell Slots */}
          {/* <SpellSlotRow slots={pcData.spellSlots} /> */}
          <SlideMenu buttons={filterMenuButtons} />
        </div>
      </CardCollectionContext.Provider>
    </>
  );
}

export default App;
