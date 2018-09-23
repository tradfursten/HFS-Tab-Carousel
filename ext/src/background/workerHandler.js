import Worker from './Worker';
import ChromeHelper from './utils/chrome';

const workHandler = (chrome, windowId) => {
  const worker = new Worker(chrome);

  return {
    getValidTabsAndRun: async () => {
      const { validTabs, activeTabIndex } = await ChromeHelper.getValidTabsInWindow(windowId);

      if (validTabs.length < 2) {
        alert('Not enough tabs found, aborting');
        return false;
      }

      return worker
        .setTabs(validTabs, activeTabIndex)
        .start()
        .getIsRunning();
    },
    stop: async () => worker.stop().getIsRunning(),
    isRunning: () => worker.isRunning
  };
};

module.exports = workHandler;