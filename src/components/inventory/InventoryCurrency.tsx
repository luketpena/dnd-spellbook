import {
  FormEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Icon from "../shared/Icon";
import { Modal } from "../shared/Modal";
import { useForm, useWatch } from "react-hook-form";
import { UserDataContext } from "../../data-management/data-management";

export interface Purse {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

const coinDenominations = {
  platinum: 1000,
  gold: 100,
  electrum: 50,
  silver: 10,
  copper: 1,
};

type Coin = keyof Purse;

interface PurseEntry {
  color: string;
  value: number;
}

export function breakdownCoins(coins: number) {
  const result: any = {};

  let remaining = coins;

  for (const [coinType, value] of Object.entries(coinDenominations)) {
    result[coinType] = Math.floor(remaining / value);
    remaining %= value;
  }

  return result;
}

export function purseToCoins(purse: Purse) {
  return (
    purse.copper * coinDenominations.copper +
    purse.silver * coinDenominations.silver +
    purse.electrum * coinDenominations.electrum +
    purse.gold * coinDenominations.gold +
    purse.platinum * coinDenominations.platinum
  );
}

export function getCoinColor(coin: Coin) {
  switch (coin) {
    case "copper":
      return "#DB8739";
    case "silver":
      return "#D5DFE0";
    case "electrum":
      return "#FFE37E";
    case "gold":
      return "#F3AE00";
    case "platinum":
      return "#C4FFFA";
  }
}

export const InventoryCurrency: React.FC = () => {
  //@ts-ignore
  const [showChangeModal, setShowChangeModal] = useState(true);
  const [multiplier, setMultiplier] = useState(1);

  const { coins, setCoins } = useContext(UserDataContext);

  useEffect(() => {
    const coinsStored = Number(localStorage.getItem("coins"));
    setCoins(coinsStored);
  }, []);

  const form = useForm<Purse>({
    defaultValues: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    },
  });

  const watchedPurseForm = form.watch();
  const totalNewCoins = useMemo(() => {
    return (
      (watchedPurseForm.copper * coinDenominations.copper +
        watchedPurseForm.silver * coinDenominations.silver +
        watchedPurseForm.electrum * coinDenominations.electrum +
        watchedPurseForm.gold * coinDenominations.gold +
        watchedPurseForm.platinum * coinDenominations.platinum) *
      multiplier
    );
  }, [watchedPurseForm]);

  const purse = useMemo<Partial<Purse>>(() => {
    return breakdownCoins(coins);
  }, [coins]);

  const purseDisplay = useMemo<PurseEntry[]>(() => {
    return Object.entries(purse)
      .sort(([keya], [keyb]) => {
        // Sorting them, smallest to largest
        const a = (coinDenominations as any)[keya];
        const b = (coinDenominations as any)[keyb];
        return a - b;
      })
      .map(([key, value]) => {
        return {
          value,
          color: getCoinColor(key as Coin),
        };
      });
  }, [purse]);

  function incrementMultiplier(change: number) {
    let newValue = multiplier + change;
    if (newValue === 0) {
      newValue = change > 0 ? 1 : -1;
    }
    setMultiplier(newValue);
  }

  function handleSubmit(change: Purse) {
    const coinCount = purseToCoins(change);
    const newCoinCount = coins + coinCount * multiplier;
    setCoins(newCoinCount);
    localStorage.setItem("coins", newCoinCount.toString());
    form.reset();
  }

  return (
    <>
      {/* Purse Button */}
      <button
        className="text-white "
        onClick={() => setShowChangeModal(true)}
      ></button>

      {/* Purse Modal */}
      <Modal
        open={showChangeModal}
        onClose={() => setShowChangeModal(false)}
        title="Add/Remove Coin"
      >
        <div className="flex flex-col gap-2">
          {/* Purse Display */}
          <div className="flex justify-between bg-slate-700 rounded py-1 px-2">
            <div className="flex gap-3">
              {purseDisplay.map((entry, index) => (
                <p
                  key={`coin-entry-value-${index}`}
                  style={{ color: entry.color }}
                  className="flex gap-1"
                >
                  <Icon name="GiCrownCoin" /> <span>{entry.value}</span>
                </p>
              ))}
            </div>
            <div className="text-white flex gap-1">
              <Icon name="GiCrownCoin" />
              <p className="font-bold">{coins.toLocaleString()}</p>
            </div>
          </div>

          {/* Change form */}
          <form
            className="grid grid-rows-[auto_auto] gap-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex justify-between gap-2">
              {Object.keys(form.getValues()).map((key, index) => (
                <div className="flex flex-col" key={`coin-form-input-${index}`}>
                  {/* Value */}
                  <div
                    key={`currency-entry-${index}`}
                    className="flex items-center gap-1 bg-slate-700 p-2 rounded-lg"
                  >
                    <span style={{ color: getCoinColor(key as Coin) }}>
                      <Icon name="GiCrownCoin" />
                    </span>
                    {/* TODO: Replace with reusable input */}
                    <input
                      type="number"
                      {...form.register(key as Coin)}
                      className="text-white bg-slate-800 text-2xl w-16 rounded px-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-6">
              {/* Multiplier interface */}
              <div className="flex gap-2 items-center text-white">
                <button
                  type="button"
                  onClick={() => incrementMultiplier(-1)}
                  className="text-white bg-sky-600 h-12 aspect-square flex items-center justify-center rounded"
                >
                  <Icon name="BiChevronLeft" size={48} />
                </button>
                <div className="text-3xl translate-y-[-4px] w-[100px] text-center">
                  {multiplier > 0 ? "+" : ""}
                  {multiplier}
                </div>
                <button
                  type="button"
                  onClick={() => incrementMultiplier(1)}
                  className="text-white bg-sky-600 h-12 aspect-square flex items-center justify-center rounded"
                >
                  <Icon name="BiChevronRight" size={48} />
                </button>
              </div>

              <div className="flex gap-2">
                {/* Total new coins */}
                <div className="text-3xl flex items-center text-white gap-2">
                  <Icon name="GiCrownCoin" size={24} />
                  <span>{totalNewCoins.toLocaleString()}</span>
                </div>
                <button className="text-white bg-orange-700 h-12 px-6 rounded font-semibold">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
