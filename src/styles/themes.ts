import { ThemeConfig } from 'antd/es/config-provider/context';
import { darken, lighten, rgba } from 'polished';

export const sizes = {
  textSmall: '1.3rem',
  textMedium: '1.4rem',
  textLazy: '1.5rem',

  iconSmall: '1.8rem',
  iconMedium: '2rem',
  iconLazy: '2.2rem',

  navBarHeight: '70px',
};

const _colors = {
  primary: '#326CF9',
  secondary: '#333333',

  titleBg: '#1E1E1E',
  titleBgHover: '#2C2C2C',
  titleTextColor: '#B9B9B9',

  headerBg: '#ffffff',

  sidebarBG: '#fff',
  sidebarSelected: '',
  selectedBG: '',
  disableBg: '#BDBDBD',

  underBg: '#f9f9f9',
  contentBG: '#ffffff',
  formFieldBG: '#ffffff',

  borderColor: '#F0F0F0',
  borderColorDark: '#333333',

  buttonBG: '#326CF9',
  buttonHover: '',

  scrollTrackBG: '#f9f9f9',
  scrollThumbBG: '#767676',

  textColor1: '#191919',
  textColor2: '#767676',
  textColor3: '#999999',
  textColorWhite1: '',
  textColorWhite2: '',

  success: '#4caf50',
  error: '#FE6968',
  relic: '#ff6000',
  ancient: '#c9a472',
};

_colors.sidebarSelected = darken(0.04, _colors.sidebarBG);
_colors.buttonHover = lighten(0.06, _colors.buttonBG);
_colors.selectedBG = rgba(_colors.primary, 0.1);
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
