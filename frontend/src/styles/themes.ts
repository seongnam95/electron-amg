import { ThemeConfig } from 'antd/es/config-provider/context';
import { darken, lighten, rgba } from 'polished';

export const sizes = {
  textSmall: '13px',
  textMedium: '14px',
  textLarge: '15px',

  iconSmall: '18px',
  iconMedium: '20px',
  iconLarge: '22px',

  titleBarHeight: '4rem',
  navBarWidth: '8rem',
};

const _colors = {
  primary: '#326CF9',
  secondary: '#333333',

  titleBg: '#1E1E1E',
  titleBgHover: '#2C2C2C',
  titleTextColor: '#b9b9b9',

  sidebarBG: '#F5F5F5',
  sidebarSelected: '',

  selectedBg: '#F6F9FF',
  selectedHoverBg: '#F1F5FF',
  innerBg: '#F5F5F5',
  contentBG: '#ffffff',
  formFieldBG: '#f9f9f9',
  disableBg: '#bdbdbd',

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

  success: '#4caf50',
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
      colorBgContainer: colors.contentBG,
    },
    Popover: {
      colorBgElevated: colors.innerBg,
    },
  },
};
