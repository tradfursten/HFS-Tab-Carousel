import './browser_action.html';
import constants from 'ext/src/shared/constants';
const $ = document.querySelector.bind(document);

let button =  $('#toggleActiveBtn');
button.onclick = () => {
  sendToggleStartStop();
};

function sendMessage (msg, cb) {
  console.log('sending message', msg);
  chrome.extension.sendMessage(msg, cb);
}

sendMessage({ type: constants.POPUP_INIT }, resp => {
  console.log('response', resp);
  toggleButtonText(resp.isRunning);
});

function sendToggleStartStop () {
  sendMessage({ type: constants.TOGGLE_START_STOP }, resp => {
    toggleButtonText(resp.isRunning);
  });
}

function toggleButtonText (isRunning) {
  button.innerHTML = isRunning ? 'Stop' : 'Start';
}