import getSettings from '../shared/settings';
const settings = getSettings();

let form, button, tab_time, fade_in_out_time, reload_frequency;
bindElements();

chrome.extension.sendMessage({ type: 'INIT' }, (resp) => {
  if(resp.isRunning) {
    sendToggleStartStop();
  }
});


const sendToggleStartStop = () => {
  chrome.extension.sendMessage({ type: 'TOGGLE_START_STOP' }, async (resp) => {
    toggleButtonText(resp.isRunning);
  });
};


const toggleButtonText = (isRunning) => {
  button.innerHTML = isRunning ? 'Stop' : 'Start';
};

const fillForm = () => {
  tab_time.value = settings.TAB_TIME;
  fade_in_out_time.value = settings.FADE_IN_OUT_TIME;
  reload_frequency.value = settings.RELOAD_FREQUENCY;
};

function bindElements() {
  form = document.querySelector('#options-form');
  button = document.querySelector('#toggleActiveBtn');
  
  tab_time = document.querySelector('#TAB_TIME');
  fade_in_out_time = document.querySelector('#FADE_IN_OUT_TIME');
  reload_frequency = document.querySelector('#RELOAD_FREQUENCY');
  
  form.onsubmit = () => {
    localStorage.setItem('TAB_TIME', tab_time.value);
    localStorage.setItem('FADE_IN_OUT_TIME', fade_in_out_time.value);
    localStorage.setItem('RELOAD_FREQUENCY', reload_frequency.value);
  };
  
  button.onclick = () => {
    sendToggleStartStop();
  };
}


fillForm();