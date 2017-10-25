import css from 'ext/src/inject/inject.css';
import settings from 'ext/src/shared/settings';

export default () => css.replace('{DELAY}', settings().FADE_IN_OUT_TIME);