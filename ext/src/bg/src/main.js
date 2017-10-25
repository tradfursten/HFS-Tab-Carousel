import Worker from './Worker';
import ChromeHelper from './utils/chrome';

export default (chrome) => {
  const worker = new Worker(chrome);
  
  const run = async () => {
    const { validTabs, activeTabIndex } = await ChromeHelper.getValidTabsInActiveWindow();
    
    console.log(validTabs, activeTabIndex);
    if(validTabs.length < 2) {
      alert('Not enough tabs found, aborting');
      return;
    }
  
    worker.start(validTabs, activeTabIndex);
    chrome.browserAction.setIcon({ path: 'icons/icon19-running.png' });
    chrome.browserAction.setTitle({ title: 'Carousel running' });
  };
  
  const stop = () => {
    worker.stop();
    chrome.browserAction.setIcon({ path: 'icons/icon19-stopped.png' });
    chrome.browserAction.setTitle({ title: 'Carousel stopped' });
  };
  
  const isRunning = () => worker.isRunning;
  
  return {
    run, stop, isRunning
  };
};