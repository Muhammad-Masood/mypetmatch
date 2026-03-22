import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type AppDrawerContextValue = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /** AppDrawer registers the animated close implementation. */
  registerDrawerClose: (fn: (() => void) | null) => void;
  /** Called when slide-out animation finishes (sets isOpen false). */
  markDrawerClosed: () => void;
};

const AppDrawerContext = createContext<AppDrawerContextValue | null>(null);

export function AppDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawerImplRef = useRef<(() => void) | null>(null);

  const openDrawer = useCallback(() => setIsOpen(true), []);

  const markDrawerClosed = useCallback(() => setIsOpen(false), []);

  const closeDrawer = useCallback(() => {
    if (closeDrawerImplRef.current) {
      closeDrawerImplRef.current();
    } else {
      setIsOpen(false);
    }
  }, []);

  const registerDrawerClose = useCallback((fn: (() => void) | null) => {
    closeDrawerImplRef.current = fn;
  }, []);

  useEffect(() => {
    return () => {
      closeDrawerImplRef.current = null;
    };
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openDrawer,
      closeDrawer,
      registerDrawerClose,
      markDrawerClosed,
    }),
    [isOpen, openDrawer, closeDrawer, registerDrawerClose, markDrawerClosed],
  );

  return <AppDrawerContext.Provider value={value}>{children}</AppDrawerContext.Provider>;
}

export function useAppDrawer(): AppDrawerContextValue {
  const ctx = useContext(AppDrawerContext);
  if (!ctx) {
    throw new Error('useAppDrawer must be used within AppDrawerProvider');
  }
  return ctx;
}

export function useOptionalAppDrawer(): AppDrawerContextValue | null {
  return useContext(AppDrawerContext);
}
