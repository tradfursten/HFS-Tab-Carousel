import css from 'root/inject/inject.css';
import getSettings from 'root/shared/settings';

export default () => {
  return css.replace('1337.000001', getSettings().FADE_IN_OUT_TIME);
};
