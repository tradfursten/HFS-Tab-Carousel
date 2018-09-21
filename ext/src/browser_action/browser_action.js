import getSettings from 'ext/src/shared/settings';
import constants from 'ext/src/shared/constants';
const { TAB_TIME, RELOAD_FREQUENCY, FADE_IN_OUT_TIME } = getSettings();
const q = document.querySelector.bind(document);

let form, button, tab_time, fade_in_out_time, reload_frequency;
bindElements();
bindEvents();
sendMessage({ type: constants.POPUP_INIT }, resp => {
  console.log('response', resp);
  toggleButtonText(resp.isRunning);
});

function sendMessage (msg, cb) {
  console.log('sending message', msg);
  chrome.extension.sendMessage(msg, cb);
}

function sendToggleStartStop () {
  sendMessage({ type: constants.TOGGLE_START_STOP }, resp => {
    toggleButtonText(resp.isRunning);
  });
}

const toggleButtonText = (isRunning) => {
  button.innerHTML = isRunning ? 'Stop' : 'Start';
};

const fillForm = () => {
  tab_time.value = TAB_TIME;
  fade_in_out_time.value = FADE_IN_OUT_TIME;
  reload_frequency.value = RELOAD_FREQUENCY;
};

function bindElements() {
  form = q('#options-form');
  button = q('#toggleActiveBtn');

  tab_time = q('#TAB_TIME');
  fade_in_out_time = q('#FADE_IN_OUT_TIME');
  reload_frequency = q('#RELOAD_FREQUENCY');
}

function bindEvents() {
  form.onsubmit = () => {
    localStorage.setItem('TAB_TIME', tab_time.value);
    localStorage.setItem('FADE_IN_OUT_TIME', fade_in_out_time.value);
    localStorage.setItem('RELOAD_FREQUENCY', reload_frequency.value);
  };

  button.onclick = () => sendToggleStartStop();
}


fillForm();