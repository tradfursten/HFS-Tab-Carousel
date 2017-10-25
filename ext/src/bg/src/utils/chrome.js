const getValidTabsInActiveWindow = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const validTabs = tabs.filter(tabIsWebUrl);
      
      //Get index of active tab in array
      const activeTabIndex = validTabs.reduce(findActiveTabReducer, 0);
      resolve({validTabs, activeTabIndex});
    });
  });
};

const tabIsWebUrl = tab => tab.url.substring(0, 4) === 'http';

const findActiveTabReducer = (activeTabInd, tab, index) => tab.active ? index : activeTabInd;

export default {
  getValidTabsInActiveWindow
};