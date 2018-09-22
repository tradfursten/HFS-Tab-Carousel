import './options.html';
import getSettings, { setSettings } from 'shared/settings';
const form = document.querySelector('#options-form');
const TAB_TIME = document.querySelector('#TAB_TIME');
const FADE_IN_OUT_TIME = document.querySelector('#FADE_IN_OUT_TIME');
const RELOAD_FREQUENCY = document.querySelector('#RELOAD_FREQUENCY');

form.onsubmit = () => {
  setSettings({
    TAB_TIME: TAB_TIME.value,
    FADE_IN_OUT_TIME: FADE_IN_OUT_TIME.value,
    RELOAD_FREQUENCY: RELOAD_FREQUENCY.value
  });
  return false;
};

const fillForm = () => {
  const settings = getSettings();
  TAB_TIME.value = settings.TAB_TIME;
  FADE_IN_OUT_TIME.value = settings.FADE_IN_OUT_TIME;
  RELOAD_FREQUENCY.value = settings.RELOAD_FREQUENCY;
};

fillForm();