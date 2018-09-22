export default () => {
  return {
    TAB_TIME: Number(localStorage.getItem('TAB_TIME')),
    FADE_IN_OUT_TIME: Number(localStorage.getItem('FADE_IN_OUT_TIME')),
    RELOAD_FREQUENCY: Number(localStorage.getItem('RELOAD_FREQUENCY'))
  };
};

export const setSettings = ({ TAB_TIME, FADE_IN_OUT_TIME, RELOAD_FREQUENCY }) => {
  localStorage.setItem('TAB_TIME', TAB_TIME);
  localStorage.setItem('FADE_IN_OUT_TIME', FADE_IN_OUT_TIME);
  localStorage.setItem('RELOAD_FREQUENCY', RELOAD_FREQUENCY);
};

export const setDefaultSettings = () => {
  localStorage.setItem('TAB_TIME', 15);
  localStorage.setItem('FADE_IN_OUT_TIME', 2);
  localStorage.setItem('RELOAD_FREQUENCY', 60);
};