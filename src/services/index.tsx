import React, { ReactNode, useCallback, useContext, useState } from "react";

export const randomId = (): string => (Math.random() * 1000000).toString();

export interface IImage {
  uri: string;
  createdAt: Date;
  caption?: string;
}

type Images = Record<string, IImage>;

export interface Store {
  images: Images;
  addImage: (id: string, img: IImage) => void;
  setCaption: (id: string, caption: string) => void;
}

const defaultStore: Store = {
  images: {},
  addImage: () => undefined,
  setCaption: () => undefined,
};

const StoreContext = React.createContext<Store>(defaultStore);
export const useStoreContext = (): Store => useContext(StoreContext);

export function StoreProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [images, setImages] = useState<Images>({});
  const addImage = useCallback(
    (id: string, img: IImage) => setImages((state) => ({ ...state, [id]: img })),
    [setImages]
  );
  const setCaption = useCallback(
    (id: string, caption: string) => setImages((state) => ({ ...state, [id]: { ...state[id], caption } })),
    [setImages]
  );

  return <StoreContext.Provider value={{ images, addImage, setCaption }}>{children}</StoreContext.Provider>;
}
