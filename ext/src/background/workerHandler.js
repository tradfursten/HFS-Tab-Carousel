import Worker from './Worker';
import ChromeHelper from './utils/chrome';

module.exports = (chrome) => {
  const worker = new Worker(chrome);
  return {
    getValidTabsAndRun: async () => {
      const { validTabs, activeTabIndex } = await ChromeHelper.getValidTabsInActiveWindow();

      if (validTabs.length < 2) {
        alert('Not enough tabs found, aborting');
        return false;
      }

      return worker.start(validTabs, activeTabIndex);
    },
    stop: async () => worker.stop(),
    isRunning: () => worker.isRunning
  };
};