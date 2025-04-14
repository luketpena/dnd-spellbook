import { useMemo, useState } from "react";
import Icon from "../shared/Icon";
import { Modal } from "../shared/Modal";

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
  const [coinCount, setCoinCount] = useState(2573);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const purse = useMemo<Partial<Purse>>(() => {
    return breakdownCoins(coinCount);
  }, [coinCount]);

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

  return (
    <>
      <button
        className="text-white flex gap-3"
        onClick={() => setShowChangeModal(true)}
      >
        {purseDisplay.map((entry) => (
          <p style={{ color: entry.color }} className="flex gap-1">
            <Icon name="GiCrownCoin" /> <span>{entry.value}</span>
          </p>
        ))}
      </button>
      <Modal
        open={showChangeModal}
        onClose={() => setShowChangeModal(false)}
        title="Add/Remove Coin"
      >
        Testing!
      </Modal>
    </>
  );
};
