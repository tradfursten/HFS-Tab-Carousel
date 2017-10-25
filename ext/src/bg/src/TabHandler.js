export default class TabHandler {
  constructor () {
    this.setTabs([], 0);
  }
  
  setTabs(tabs, activeTabIndex) {
    this.tabs = tabs;
    this.tabIds = tabs.map(tab => tab.id);
    this.activeTabIndex = activeTabIndex;
    this.nextTabIndex = (activeTabIndex + 1) % this.tabs.length;
    
    this.tabIsLoaded = this.tabs.map(() => {
      return { lastLoaded: 0, isLoaded: false };
    });
  }
  
  setTabIsLoaded(tabId, isLoaded) {
    const index = this.getTabIndex(tabId);
    this.tabIsLoaded[index].isLoaded = isLoaded;
    if(isLoaded) {
      this.tabIsLoaded[index].lastLoaded = Date.now();
    }
  }
  
  getTabIndex(tabId) {
    return this.tabIds.indexOf(tabId);
  }
  
  getActiveTabId() {
    return this.tabIds[this.activeTabIndex];
  }
  
  getNextTabId() {
    return this.tabIds[this.nextTabIndex];
  }
  
  incrementTabs() {
    this.activeTabIndex = this.nextTabIndex;
    this.nextTabIndex = (this.nextTabIndex + 1) % this.tabs.length;
  }
  
  getMsecSinceReload(tabId) {
    const index = this.getTabIndex(tabId);
    return Date.now() - this.tabIsLoaded[index].lastLoaded;
  }
}