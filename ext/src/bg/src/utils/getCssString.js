import css from '../../../inject/inject.css';
import settings from '../../../shared/settings';

export default () => css.replace('{DELAY}', settings().FADE_IN_OUT_TIME);