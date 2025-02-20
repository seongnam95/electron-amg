import { ThemeConfig } from 'antd/es/config-provider/context';
import { darken, rgba } from 'polished';

export const sizes = {
  textSmall: '13px',
  textMedium: '14px',
  textLarge: '16px',

  iconSmall: '18px',
  iconMedium: '20px',
  iconLarge: '22px',

  headerHeight: '6.2rem',
  titleBarHeight: '4rem',
};

const _colors = {
  primary: '#326CF9',
  secondary: '#333333',

  titleBg: '#1E1E1E',
  titleBgHover: '#2C2C2C',
  titleTextColor: '#b9b9b9',

  sidebarBG: '#F5F5F5',
  sidebarSelected: '',
  sidebarIconActive: '#333333',

  selectedBg: '#ECF0FE',
  selectedHoverBg: '#F1F5FF',

  innerBg: '#F9F9F9',
  contentBG: '#ffffff',
  formFieldBG: '#f9f9f9',
  disableBg: '#dbdbdb',

  borderColor: '#f0f0f0',
  borderColorDark: '#333333',

  scrollTrackBG: '#ffffff',
  scrollThumbBG: '#eeeeee',

  textColor1: '#191919',
  textColor2: '#767676',
  textColor3: '#999999',

  textColorWhite1: '',
  textColorWhite2: '',
  textColorWhite3: '',

  iconColor1: '#313338',
  iconColor2: '#767676',
  iconColor3: '#909090',

  blue: '#1677FF',
  green: '#2DD329',
  red: '#EA3B3B',

  success: '#23D160',
  error: '#fe6968',
  relic: '#ff6000',
  accent: '#1e41d0',
};

_colors.sidebarSelected = darken(0.05, _colors.sidebarBG);
_colors.textColorWhite1 = rgba('#FFF', 0.86);
_colors.textColorWhite2 = rgba('#FFF', 0.66);
_colors.textColorWhite3 = rgba('#FFF', 0.38);

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
    Tag: {
      colorText: colors.textColor2,
    },
    Table: {
      colorIcon: colors.iconColor1,
      colorBgContainer: colors.contentBG,
      colorTextHeading: colors.textColor2,
      cellFontSize: 13,
      fontWeightStrong: 400,
      padding: 12,
      fontSizeIcon: 8,
      rowSelectedBg: colors.selectedBg,
    },
    Popover: {
      colorBgElevated: colors.innerBg,
    },
    Descriptions: {
      padding: 12,
    },
    Empty: {
      colorText: colors.textColor2,
    },
  },
};
