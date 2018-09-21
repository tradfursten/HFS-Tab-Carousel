import WorkerHandler from 'src/WorkerHandler';
import { setDefaultSettings } from 'ext/src/shared/settings';
import constants from 'ext/src/shared/constants';
const workerHandler = WorkerHandler(chrome);

/**
 * On message from browser popup
 */
const onMessage = (msg, sender, sendResponse) => {
  const isRunning = workerHandler.isRunning();
  console.log('received msg:', { msg, sender });

  switch(msg.type) {
    case constants.POPUP_INIT:
      return sendResponse({ isRunning });

    case constants.TOGGLE_START_STOP: {
      let promise;
      if(isRunning) {
        promise = workerHandler.stop();
      } else {
        promise = workerHandler.getValidTabsAndRun();
      }
      promise.then(running => sendResponse({ isRunning: running }));
      return true;
    }
  }
};

chrome.runtime.onInstalled.addListener(setDefaultSettings);
chrome.runtime.onMessage.addListener(onMessage);