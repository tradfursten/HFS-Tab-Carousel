const SETTINGS_NAMES = {
  TAB_TIME: 'TAB_TIME',
  FADE_IN_OUT_TIME: 'FADE_IN_OUT_TIME',
  RELOAD_FREQUENCY: 'RELOAD_FREQUENCY'
};

export { SETTINGS_NAMES };

export default () => {
  return {
    [SETTINGS_NAMES.TAB_TIME]: Number(localStorage.getItem(SETTINGS_NAMES.TAB_TIME)),
    [SETTINGS_NAMES.FADE_IN_OUT_TIME]: Number(localStorage.getItem(SETTINGS_NAMES.FADE_IN_OUT_TIME)),
    [SETTINGS_NAMES.RELOAD_FREQUENCY]: Number(localStorage.getItem(SETTINGS_NAMES.RELOAD_FREQUENCY))
  };
};

export const setSettings = ({ TAB_TIME, FADE_IN_OUT_TIME, RELOAD_FREQUENCY }) => {
  localStorage.setItem(SETTINGS_NAMES.TAB_TIME, TAB_TIME);
  localStorage.setItem(SETTINGS_NAMES.FADE_IN_OUT_TIME, FADE_IN_OUT_TIME);
  localStorage.setItem(SETTINGS_NAMES.RELOAD_FREQUENCY, RELOAD_FREQUENCY);
};

export const setDefaultSettings = () => {
  localStorage.setItem(SETTINGS_NAMES.TAB_TIME, 15);
  localStorage.setItem(SETTINGS_NAMES.FADE_IN_OUT_TIME, 2);
  localStorage.setItem(SETTINGS_NAMES.RELOAD_FREQUENCY, 60);
};