import React, { createContext, useContext, useState, ReactNode } from 'react';

type Store = 'GP_daily' | 'GP_store';

interface StoreContextType {
  activeStore: Store;
  switchStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [activeStore, setActiveStore] = useState<Store>('GP_daily');

  const switchStore = (store: Store) => {
    setActiveStore(store);
  };

  return (
    <StoreContext.Provider value={{ activeStore, switchStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}; 