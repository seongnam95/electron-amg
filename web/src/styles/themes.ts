import { ThemeConfig } from "antd/es/config-provider/context";
import { darken, rgba } from "polished";

export const sizes = {
  textXSmall: "15px",
  textSmall: "16px",
  textMedium: "17px",
  textLazy: "18px",
  textXLazy: "24px",
};

const _colors = {
  primary: "#333333",
  secondary: "#326CF9",

  titleBg: "#1E1E1E",
  titleBgHover: "#2C2C2C",
  titleTextColor: "#b9b9b9",

  sidebarBG: "#fff",
  sidebarSelected: "",

  selectedBg: "#F6F9FF",
  selectedHoverBg: "#F1F5FF",
  innerBg: "#f9f9f9",
  contentBG: "#ffffff",
  formFieldBG: "#f9f9f9",
  disableBg: "#bdbdbd",

  borderColor: "#f0f0f0",
  borderColorDark: "#333333",

  scrollTrackBG: "#ffffff",
  scrollThumbBG: "#eeeeee",

  textColor1: "#191919",
  textColor2: "#767676",
  textColor3: "#999999",

  textColorWhite1: "",
  textColorWhite2: "",

  success: "#4caf50",
  error: "#fe6968",
  relic: "#ff6000",
  accent: "#326CF9",
};

_colors.sidebarSelected = darken(0.04, _colors.sidebarBG);
_colors.textColorWhite1 = rgba("#FFF", 0.86);
_colors.textColorWhite2 = rgba("#FFF", 0.66);

export const colors = _colors;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryBg: rgba(colors.primary, 0.1),
    colorBgBase: colors.contentBG,
    colorBgContainer: colors.formFieldBG,
    colorText: colors.textColor1,
    colorTextQuaternary: colors.textColor2,
    colorBorder: colors.borderColor,
    colorIcon: colors.textColor1,
  },
  components: {
    Table: {
      colorBgContainer: colors.sidebarBG,
    },
    Popover: {
      colorBgElevated: colors.sidebarBG,
    },
  },
};
