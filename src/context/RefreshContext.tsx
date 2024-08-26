import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

type RefreshContextType = {
  refresh: boolean;
  triggerRefresh: () => void;
};

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  // Add prop validation for 'children'
  if (!children) {
    throw new Error('RefreshProvider requires children prop.');
  }
  const [refresh, setRefresh] = useState<boolean>(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev); // Toggle the refresh state
  };

  const value = useMemo(() => ({ refresh, triggerRefresh }), [refresh]);

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
};

export const useRefresh = (): RefreshContextType => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
