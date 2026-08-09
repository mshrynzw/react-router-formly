import type { KeyboardEvent as ReactKeyboardEvent } from "react";

interface UseRovingTabsOptions<T extends string> {
  tabs: readonly T[];
  value: T;
  onChange: (value: T) => void;
  idPrefix?: string;
}

export function useRovingTabs<T extends string>({
  tabs,
  value,
  onChange,
  idPrefix = "tab",
}: UseRovingTabsOptions<T>) {
  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    const currentIndex = tabs.indexOf(value);
    if (currentIndex < 0) {
      return;
    }

    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    onChange(tabs[nextIndex]!);
  };

  const getTabProps = (tab: T) => ({
    role: "tab" as const,
    id: `${idPrefix}-${tab}`,
    "aria-selected": value === tab,
    "aria-controls": `${idPrefix}-panel-${tab}`,
    tabIndex: value === tab ? 0 : -1,
    onKeyDown,
  });

  const getPanelProps = (tab: T) => ({
    role: "tabpanel" as const,
    id: `${idPrefix}-panel-${tab}`,
    "aria-labelledby": `${idPrefix}-${tab}`,
    hidden: value !== tab,
  });

  return { getTabProps, getPanelProps };
}
