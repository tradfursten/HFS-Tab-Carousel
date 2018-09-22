import css from 'inject/inject.css';
import getSettings from 'shared/settings';

export default () => {
  return css.replace('1337.000001', getSettings().FADE_IN_OUT_TIME);
};
