"use client";

import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 1280; // xl breakpoint — matches TailAdmin sidebar's xl:translate-x-0

// Diadaptasi dari template asli: template memakai useEffect + setState
// sinkron untuk membaca matchMedia, yang ditolak aturan lint
// react-hooks/set-state-in-effect. useSyncExternalStore adalah pola
// yang direkomendasikan React untuk sumber eksternal seperti ini.
function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
