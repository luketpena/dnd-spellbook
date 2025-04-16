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
  SpellFalseLife,
  SpellFindFamiliar,
  SpellFireBolt,
  SpellIdentify,
  SpellInvisibility,
  SpellMageArmor,
  SpellMageHand,
  SpellMagicMissile,
  SpellMindSliver,
  SpellMinorIllusion,
  SpellMistyStep,
  SpellPhantasmalForce,
  SpellShield,
  SpellSilentImage,
  SpellThaumaturgy,
} from "./components/ability-card/spells";
import { InventoryCurrency } from "./components/inventory/InventoryCurrency";
import Icon from "./components/shared/Icon";
import { SlideMenu, SlideMenuButton } from "./components/slide-menu/SlideMenu";
import { SpellPreparation } from "./components/spell-preparation/SpellPreparation";
import { UserDataContext } from "./data-management/data-management";
import { CharacterLevel } from "./components/character-stats/CharacterLevel";

// @ts-nocheck

export interface TiltValues {
  x: number;
  y: number;
}

interface CardCollectionContextType {
  tilt: TiltValues;
  spells: SkillCard[];
}
export const CardCollectionContext = createContext<CardCollectionContextType>({
  tilt: { x: 0, y: 0 },
  spells: [],
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
    SpellFalseLife,
    SpellMistyStep,
    SpellPhantasmalForce,
    SpellInvisibility,
    SpellMindSliver,
    SpellIdentify,
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // @ts-ignore
  const [sort, setSort] = useState<SpellSortTarget>("level");
  // @ts-ignore
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  // @ts-ignore
  const [filterPrepared, setFilterPrepared] = useState<boolean>(true);

  const [coins, setCoins] = useState<number>(0);

  const spells = useMemo(() => {
    return spellList
      .sort((a, b) => {
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
            const levelSort =
              (b.data.details.level - a.data.details.level) * dir;
            return levelSort === 0
              ? titleA < titleB
                ? -1
                : titleA > titleB
                ? 1
                : 0
              : levelSort;
        }
      })
      .filter((v) => {
        if (filterPrepared) {
          const preparedList =
            localStorage.getItem("preparedSpells")?.split(",") ?? [];
          return v.data.details.ritual || preparedList.includes(v.data.title);
        } else {
          return true;
        }
      });
  }, [sort, sortDir, spellList, filterPrepared]);

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
  const [tiltData, setTiltData] = useState<TiltValues>({ x: 0, y: 0 });

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
    setTiltData((prev) => {
      const smoothX = lerp(prev.x, targetTilt.current.x, 0.1);
      const smoothY = lerp(prev.y, targetTilt.current.y, 0.1);

      animFrame.current = requestAnimationFrame(animateTilt);
      return {
        x: smoothX,
        y: smoothY,
      };
    });
  }

  const cardCollectionData: CardCollectionContextType = useMemo(() => {
    return {
      tilt: tiltData,
      spells: spellList,
    };
  }, [tiltData, spells]);

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
        dropdownValue: sort,
        dropdownOptions: [
          {
            text: "School",
            value: "magicSchool",
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
        dropdownValue: sortDir,
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

  // const preparedMenuButtons = useMemo<SlideMenuButton[]>(() => {
  //   return [
  //     {
  //       text: "Prepared Spells Only",
  //       action: (v: boolean) => setFilterPrepared(v),
  //       dropdownValue: filterPrepared,
  //       dropdownOptions: [
  //         {
  //           text: "Active",
  //           value: true,
  //         },
  //         {
  //           text: "Inactive",
  //           value: false,
  //         },
  //       ],
  //     },
  //   ];
  // }, [filterPrepared]);

  return (
    <UserDataContext.Provider value={{ coins, setCoins, xp: 0 }}>
      <CardCollectionContext.Provider value={cardCollectionData}>
        <div className="grid grid-cols-[auto_1fr] bg-black h-dvh">
          {/* Spell List */}
          <div className="h-dvh overflow-auto no-scrollbar">
            <div className="flex flex-col h-max">
              {spells.map((skill, index) => (
                <span id={`spell-${index}`} key={`spell-card-${index}`}>
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
          <div className="grid grid-rows-[auto_1fr]">
            <div>
              <SlideMenu buttons={filterMenuButtons} icon="BiSortAlt2" />
              <button
                className="w-16 h-16 flex items-center justify-center text-white"
                onClick={() => setFilterPrepared(!filterPrepared)}
              >
                <Icon
                  name={filterPrepared ? "GiSecretBook" : "GiSpellBook"}
                  size={40}
                />
              </button>
              {/* <SlideMenu
                buttons={preparedMenuButtons}
                icon={filterPrepared ? "GiSecretBook" : "GiSpellBook"}
              /> */}
              <InventoryCurrency />
            </div>
            {!filterPrepared && <SpellPreparation />}
            <CharacterLevel />
          </div>
        </div>
      </CardCollectionContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
