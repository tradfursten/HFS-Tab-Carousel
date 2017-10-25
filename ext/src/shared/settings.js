export default () => {
  const TAB_TIME = Number(localStorage.getItem('TAB_TIME'));
  const FADE_IN_OUT_TIME = Number(localStorage.getItem('FADE_IN_OUT_TIME'));
  const RELOAD_FREQUENCY = Number(localStorage.getItem('RELOAD_FREQUENCY'));
  
  return {
    TAB_TIME, FADE_IN_OUT_TIME, RELOAD_FREQUENCY
  };
};


export const setDefaultSettings = () => {
  localStorage.setItem('TAB_TIME', 15);
  localStorage.setItem('FADE_IN_OUT_TIME', 2);
  localStorage.setItem('RELOAD_FREQUENCY', 60);
};