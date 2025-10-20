import { create } from "zustand";
import { applyFontSize } from "../utils/fontSize";
import { applyTheme } from "../utils/theme";
import { getUserInfo, saveUserFontSize, saveUserTheme } from "../api/userSettings";

export const useUserSettingsStore = create((set, get) => ({
  fontSizeIndex: 2,
  theme: "light",

  initSettings: async () => {
    try {
      const { fontSizeIndex, theme } = await getUserInfo();
      applyFontSize(fontSizeIndex);
      applyTheme(theme);
      set({ fontSizeIndex, theme });
      localStorage.setItem("exGpt-font-size", fontSizeIndex);
      localStorage.setItem("exGpt-theme", theme);
    } catch {
      const fontSizeIndex = Number(localStorage.getItem("exGpt-font-size")) || 2;
      const theme = localStorage.getItem("exGpt-theme") || "light";
      applyFontSize(fontSizeIndex);
      applyTheme(theme);
      set({ fontSizeIndex, theme });
    }
  },

  updateFontSize: async index => {
    applyFontSize(index);
    await saveUserFontSize(index);
    localStorage.setItem("exGpt-font-size", index);
    set({ fontSizeIndex: index });
  },

  updateTheme: async theme => {
    applyTheme(theme);
    await saveUserTheme(theme);
    localStorage.setItem("exGpt-theme", theme);
    set({ theme });
  },
}));
