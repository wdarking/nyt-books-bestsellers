import { ReactNode, createContext, useState } from "react";

type ListContextType = string;
type ListActionContextType = (listSlug: string) => void;

export const ListContext = createContext<ListContextType>(
  {} as ListContextType,
);

export const ListActionContext = createContext<ListActionContextType>(
  {} as ListActionContextType,
);

type ListProviderProps = {
  children?: ReactNode;
};

export function ListProvider({ children }: ListProviderProps) {
  const [list, setList] = useState("hardcover-fiction");

  return (
    <ListContext.Provider value={list}>
      <ListActionContext.Provider value={setList}>
        {children}
      </ListActionContext.Provider>
    </ListContext.Provider>
  );
}
