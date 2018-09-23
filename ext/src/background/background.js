import { setDefaultSettings } from 'root/shared/settings';
import MessageTypes from 'root/shared/message-types';
const getWorkHandler = require('./WorkerHandler');

const windowWorkHandlers = {};

const onCloseWindow = windowId => {
  if (windowWorkHandlers.hasOwnProperty(windowId)) {
    delete windowWorkHandlers[windowId];
  }
};

const setChromeIcon = (path, title) => {
  chrome.browserAction.setIcon({ path });
  chrome.browserAction.setTitle({ title });
};

/**
 * On message from browser popup
 */
const onMessage = (msg, sender, sendResponse) => {
  const { windowId } = msg;
  if (!windowId) {
    alert('No window found');
    return true;
  }

  if (!windowWorkHandlers.hasOwnProperty(windowId)) {
    windowWorkHandlers[windowId] = getWorkHandler(chrome);
  }

  const isRunning = windowWorkHandlers[windowId].isRunning();

  switch (msg.type) {
    case MessageTypes.POPUP_INIT:
      return sendResponse({ isRunning });

    case MessageTypes.TOGGLE_START_STOP: {
      let promise;
      if (!isRunning) {
        promise = windowWorkHandlers[windowId].getValidTabsAndRun();
      } else {
        promise = windowWorkHandlers[windowId].stop();
      }

      promise.then(isRunning => {
        sendResponse({ isRunning });

        if (!isRunning) {
          setChromeIcon('icons/icon19-stopped.png', 'Carousel stopped');
        } else {
          setChromeIcon('icons/icon19-running.png', 'Carousel running');
        }
      });
      return true;
    }
  }
};

chrome.windows.onRemoved.addListener(onCloseWindow);
chrome.runtime.onInstalled.addListener(setDefaultSettings);
chrome.runtime.onMessage.addListener(onMessage);
