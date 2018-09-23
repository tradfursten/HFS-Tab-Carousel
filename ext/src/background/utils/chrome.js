const getValidTabsInActiveWindow = () => {
  return new Promise(resolve => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const validTabs = tabs.filter(tabIsWebUrl);

      //Get index of active tab in array
      const activeTabIndex = validTabs.reduce(findActiveTabReducer, 0);
      resolve({
        validTabs,
        activeTabIndex
      });
    });
  });
};

const getValidTabsInWindow = windowId => {
  return new Promise(resolve => {
    chrome.tabs.query({ windowId }, (tabs) => {
      const validTabs = tabs.filter(tabIsWebUrl);

      //Get index of active tab in array
      const activeTabIndex = validTabs.reduce(findActiveTabReducer, 0);
      resolve({
        validTabs,
        activeTabIndex
      });
    });
  });
};

const tabIsWebUrl = tab => {
  return tab.url.substring(0, 4) === 'http';
};

const findActiveTabReducer = (activeTabInd, tab, index) => {
  return tab.active ? index : activeTabInd;
};

export default {
  getValidTabsInActiveWindow,
  getValidTabsInWindow
};