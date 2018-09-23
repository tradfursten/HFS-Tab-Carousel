import { setDefaultSettings } from 'root/shared/settings';
import constants from 'root/shared/constants';
const workerHandler = require('./WorkerHandler')(chrome);

/**
 * On message from browser popup
 */
const onMessage = (msg, sender, sendResponse) => {
  const isRunning = workerHandler.isRunning();
  console.log('received msg:', { msg, sender });

  switch (msg.type) {
    case constants.POPUP_INIT:
      return sendResponse({ isRunning });

    case constants.TOGGLE_START_STOP: {
      let promise;
      if (!isRunning) {
        promise = workerHandler.getValidTabsAndRun();
      } else {
        promise = workerHandler.stop();
      }

      promise.then(isRunning => {
        return sendResponse({ isRunning });
      });
      return true;
    }
  }
};

chrome.runtime.onInstalled.addListener(setDefaultSettings);
chrome.runtime.onMessage.addListener(onMessage);
