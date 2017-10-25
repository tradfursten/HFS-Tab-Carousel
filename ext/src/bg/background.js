import main from './src/main';
import { setDefaultSettings } from '../shared/settings';
const instance = main(chrome);

chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('onMessage', msg);
  
  switch(msg.type) {
    case 'INIT': {
      sendResponse({
        isRunning: instance.isRunning()
      });
      break;
    }
    
    case 'TOGGLE_START_STOP': {
      const isRunning = instance.isRunning();
      if(isRunning) {
        instance.stop();
      } else {
        instance.run();
      }
      sendResponse({ isRunning: !isRunning });
      break;
    }
  }
});

chrome.runtime.onInstalled.addListener(setDefaultSettings);