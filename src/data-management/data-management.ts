import { createContext } from "react";

export interface UserData {
  coins: number;
  setCoins: (v: number) => void;
}

export const UserDataContext = createContext<UserData>({
  coins: 0,
  setCoins: () => {},
});
