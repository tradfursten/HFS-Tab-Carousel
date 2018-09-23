import './browser_action.html';
import MessageTypes from 'root/shared/message-types';
const $ = document.querySelector.bind(document);

let button =  $('#toggleActiveBtn');
let settingsLink = $('#settingsLink');

bindElements();

let windowId = null;

chrome.windows.getCurrent(currentWindow => {
  windowId = currentWindow.id;

  sendMessage({ type: MessageTypes.POPUP_INIT }, resp => {
    console.log('response', resp);
    toggleButtonTextAndClass(resp.isRunning);
  });
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

function sendMessage (msg, callback) {
  console.log('sending message', msg, windowId);
  chrome.extension.sendMessage({ ...msg, windowId }, callback);
}

function sendToggleStartStop () {
  sendMessage({ type: MessageTypes.TOGGLE_START_STOP }, resp => {
    toggleButtonTextAndClass(resp.isRunning);
  });
}

function toggleButtonTextAndClass (isRunning) {
  button.innerHTML = isRunning ? 'Stop' : 'Start';
  button.className = button.className
    .replace(/ red| green/, '')
    .concat(isRunning ? ' red' : ' green');
}
