import Worker from 'src/Worker';
import ChromeHelper from 'src/utils/chrome';

export default (chrome) => {
  const worker = new Worker(chrome);
  
  const run = async () => {
    const { validTabs, activeTabIndex } = await ChromeHelper.getValidTabsInActiveWindow();
    
    if(validTabs.length < 2) {
      alert('Not enough tabs found, aborting');
      return false;
    }
  
    return worker.start(validTabs, activeTabIndex);
  };
  
  const stop = async () => worker.stop();
  
  const isRunning = () => worker.isRunning;
  
  return { run, stop, isRunning };
};