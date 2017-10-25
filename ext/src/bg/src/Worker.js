import settings from 'ext/src/shared/settings';
import constants from 'ext/src/shared/constants';
import TabHandler from 'src/TabHandler';
import getCss from 'src/utils/getCssString';

export default class Worker {
  constructor(chrome) {
    this.chrome = chrome;
    this.tabHandler = new TabHandler();
    this.isRunning = false;
    this.timeoutId = undefined;
    
    this.onTabClose = this.onTabClose.bind(this);
    this.onTabUpdated = this.onTabUpdated.bind(this);
  }
  
  start(validTabs, activeTabIndex) {
    console.log('Worker starting');
    this.settings = settings();
    this.isRunning = true;
    this.tabHandler.setTabs(validTabs, activeTabIndex);
    this.setTickTimeout();
    this.bindEvents();
    this.chrome.browserAction.setIcon({ path: 'icons/icon19-running.png' });
    this.chrome.browserAction.setTitle({ title: 'Carousel running' });
    return true;
  }
  
  setTickTimeout() {
    if(this.isRunning) {
      this.reloadTabIfNeeded(this.tabHandler.getNextTabId());
      this.timeoutId = setTimeout(() => this.tick(), this.settings.TAB_TIME * 1000);
    }
  }
  
  stop() {
    console.log('worker stopping');
    this.isRunning = false;
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    this.unbindEvents();
    this.chrome.browserAction.setIcon({ path: 'icons/icon19-stopped.png' });
    this.chrome.browserAction.setTitle({ title: 'Carousel stopped' });
    return false;
  }
  
  tick() {
    const activeTabId = this.tabHandler.getActiveTabId();
    let nextTabId = this.tabHandler.getNextTabId();
  
    this.tabHandler.incrementTabs();
    
    //Send fade out command to active tab
    this.fadeOut(activeTabId, () => {
      this.switchToTab(nextTabId);
      this.fadeIn(nextTabId, () => this.setTickTimeout());
    });
  }
  
  fadeOut(tabId, cb) {
    this.chrome.tabs.sendMessage(tabId, { type: constants.FADE_OUT });
    this.timeoutId = setTimeout(cb, this.settings.FADE_IN_OUT_TIME * 1000);
  }
  
  switchToTab(tabId) {
    this.chrome.tabs.update(tabId, { selected: true } );
  }
  
  fadeIn(tabId, cb) {
    console.log('sending message to tab to fade in', tabId);
    this.chrome.tabs.sendMessage(tabId, { type: constants.FADE_IN });
    this.timeoutId = setTimeout(cb, this.settings.FADE_IN_OUT_TIME * 1000);
  }
  
  setTabIsLoaded(tabId, isLoaded) {
    return this.tabHandler.setTabIsLoaded(tabId, isLoaded);
  }
  
  reloadTabIfNeeded(tabId) {
    const msecSinceReload = this.tabHandler.getMsecSinceReload(tabId);
    console.log('lastReloaded:', msecSinceReload, 'reload setting:', this.settings.RELOAD_FREQUENCY * 1000);
    
    if(msecSinceReload > (this.settings.RELOAD_FREQUENCY * 1000)) {
      console.log('Reloading tab', tabId);
      this.chrome.tabs.reload(tabId);
    }
  }
  
  bindEvents() {
    //Closing tab
    this.chrome.tabs.onRemoved.addListener(this.onTabClose);
  
    //When tab is loading/loaded
    this.chrome.tabs.onUpdated.addListener(this.onTabUpdated);
  }
  
  unbindEvents() {
    this.chrome.tabs.onRemoved.removeListener(this.onTabClose);
    this.chrome.tabs.onUpdated.removeListener(this.onTabUpdated);
  }
  
  onTabClose(tabId) {
    console.log('tab closed, aborting', tabId);
    if(this.isRunning) {
      this.stop();
    }
  }
  
  onTabUpdated (tabId, info) {
    console.log('onTabUpdated', tabId, info);
  
    const isLoaded = info.status === 'complete';
    this.setTabIsLoaded(tabId, isLoaded);
  
    if(isLoaded) {
      console.log('injecting js/css on tab', tabId);
      this.chrome.tabs.insertCSS(tabId, { code: getCss() } );
      this.chrome.tabs.executeScript(tabId, { file: 'js/inject/inject.min.js' } );
    }
  }
}