import { ThemeConfig } from 'antd/es/config-provider/context';
import { darken, lighten, rgba } from 'polished';

export const sizes = {
  textSmall: '13px',
  textMedium: '14px',
  textLazy: '15px',

  iconSmall: '18px',
  iconMedium: '20px',
  iconLazy: '22px',

  navBarHeight: '70px',
};

const _colors = {
  primary: '#326CF9',
  secondary: '#333333',

  titleBg: '#1E1E1E',
  titleBgHover: '#2C2C2C',
  titleTextColor: '#b9b9b9',

  sidebarBG: '#fff',
  sidebarSelected: '',

  selectedBg: '#F6F9FF',
  selectedHoverBg: '#F1F5FF',
  innerBg: '#f9f9f9',
  contentBG: '#ffffff',
  formFieldBG: '#f9f9f9',
  disableBg: '#bdbdbd',

  borderColor: '#f0f0f0',
  borderColorDark: '#333333',

  scrollTrackBG: '#f9f9f9',
  scrollThumbBG: '#767676',

  textColor1: '#191919',
  textColor2: '#767676',
  textColor3: '#999999',

  textColorWhite1: '',
  textColorWhite2: '',

  success: '#4caf50',
  error: '#fe6968',
  relic: '#ff6000',
  accent: '#1e41d0',
};

_colors.sidebarSelected = darken(0.04, _colors.sidebarBG);
_colors.textColorWhite1 = rgba('#FFF', 0.86);
_colors.textColorWhite2 = rgba('#FFF', 0.66);

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
