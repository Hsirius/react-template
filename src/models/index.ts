import { createContext, useContext } from "react";
import Global from "./Global";

export class RootStore {
  global = new Global();
}

export const rootStoreContext = createContext<RootStore | null>(null);

const useRootStore = () => {
  const rootStore = useContext(rootStoreContext);
  if (rootStore === null)
    throw new Error("You forgot to use RootStore Provider!");
  return rootStore;
};

export default useRootStore;
