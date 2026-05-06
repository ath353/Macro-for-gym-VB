import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("macrovn-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("macrovn-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, toggleDark: () => setIsDark((d) => !d) };
}
