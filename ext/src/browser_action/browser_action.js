import './browser_action.html';
import constants from 'root/shared/constants';
const $ = document.querySelector.bind(document);

let button =  $('#toggleActiveBtn');
let settingsLink = $('#settingsLink');

bindElements();

sendMessage({ type: constants.POPUP_INIT }, resp => {
  console.log('response', resp);
  toggleButtonText(resp.isRunning);
});

function bindElements () {
  button.onclick = sendToggleStartStop;

  settingsLink.href = chrome.extension.getURL('js/options/options.html');
  settingsLink.onclick = e => {
    e.preventDefault();

    chrome.tabs.create({
      url: chrome.extension.getURL('js/options/options.html'),
      active: true
    });
  };
}

function sendMessage (msg, cb) {
  console.log('sending message', msg);
  chrome.extension.sendMessage(msg, cb);
}

function sendToggleStartStop () {
  sendMessage({ type: constants.TOGGLE_START_STOP }, resp => {
    toggleButtonText(resp.isRunning);
  });
}

function toggleButtonText (isRunning) {
  button.innerHTML = isRunning ? 'Stop' : 'Start';
}
