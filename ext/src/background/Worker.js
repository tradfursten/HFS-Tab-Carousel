import getSettings from 'root/shared/settings';
import constants from 'root/shared/constants';
import TabHandler from './TabHandler';
import getCss from './utils/getCssString';

export default class Worker {
  constructor (chrome) {
    this.chrome = chrome;
    this.tabHandler = new TabHandler();
    this.isRunning = false;
    this.timeoutId = undefined;
    this.settings = null;
    this.isOwnActiveEvent = false;
  }

  start (validTabs, activeTabIndex) {
    this.settings = getSettings();
    console.log('Worker starting, settings:', this.settings);
    this.isRunning = true;
    this.tabHandler.setTabs(validTabs, activeTabIndex);
    this.setChromeIcon('icons/icon19-running.png', 'Carousel running');
    this.bindChromeEvents();
    this.setTickTimeout();
    return true;
  }

  setTickTimeout () {
    if (!this.isRunning) {
      return;
    }
    const nextTabId = this.tabHandler.getNextTabId();

    this.reloadTabIfNeeded(nextTabId);

    this.timeoutId = setTimeout(() => {
      this.tick();
    }, this.settings.TAB_TIME * 1000);
  }

  stop () {
    console.log('worker stopping');
    this.isRunning = false;
    this.timeoutId = clearTimeout(this.timeoutId);
    this.unbindEvents();
    this.setChromeIcon('icons/icon19-stopped.png', 'Carousel stopped');

    //Fade in all tabs
    this.tabHandler.getAllTabIds(tabId => {
      this.fadeIn(tabId, () => {});
    });
    return false;
  }

  tick () {
    const activeTabId = this.tabHandler.getActiveTabId();
    let nextTabId = this.tabHandler.getNextTabId();

    this.tabHandler.incrementTabs();

    this.fadeOutAndSwitchToNextTab(activeTabId, nextTabId);
  }

  /**
   * @param activeTabId
   * @param nextTabId
   */
  fadeOutAndSwitchToNextTab (activeTabId, nextTabId) {
    this.fadeOut(activeTabId, () => {
      this.isOwnActiveEvent = true;

      this.switchToTab(nextTabId, () => {
        this.isOwnActiveEvent = false;
      });
    });
  }

  fadeOut (tabId, onAfterFadeOut) {
    this.chrome.tabs.sendMessage(tabId, { type: constants.FADE_OUT });

    if (onAfterFadeOut) {
      this.timeoutId = setTimeout(onAfterFadeOut, this.settings.FADE_IN_OUT_TIME * 1000);
    }
  }

  switchToTab (tabId, callback) {
    this.chrome.tabs.update(tabId, { selected: true }, callback);
  }

  fadeIn (tabId, onAfterFadeIn) {
    this.chrome.tabs.sendMessage(tabId, { type: constants.FADE_IN });

    if (onAfterFadeIn) {
      this.timeoutId = setTimeout(onAfterFadeIn, this.settings.FADE_IN_OUT_TIME * 1000);
    }
  }

  updateLastTimeTabLoaded (tabId, isLoaded) {
    return this.tabHandler.updateLastTimeTabLoaded(tabId, isLoaded);
  }

  reloadTabIfNeeded (tabId) {
    console.log('reloadTabIfNeeded');
    const msecSinceReload = this.tabHandler.getMsecSinceReload(tabId);
    console.log('lastReloaded:', msecSinceReload, 'reload setting:', this.settings.RELOAD_FREQUENCY * 1000);

    if (msecSinceReload > (this.settings.RELOAD_FREQUENCY * 1000)) {
      console.log('Reloading tab', tabId);
      this.chrome.tabs.reload(tabId);
    }
  }

  bindChromeEvents () {
    //Closing tab
    this.chrome.tabs.onRemoved.addListener(this.onTabClose);

    //When tab is loading/loaded
    this.chrome.tabs.onUpdated.addListener(this.onTabUpdated);

    this.chrome.tabs.onActivated.addListener(this.onTabActivated);
  }

  setChromeIcon (imagePath, title) {
    this.chrome.browserAction.setIcon({ path: imagePath });
    this.chrome.browserAction.setTitle({ title: title });
  }

  unbindEvents () {
    this.chrome.tabs.onRemoved.removeListener(this.onTabClose);
    this.chrome.tabs.onUpdated.removeListener(this.onTabUpdated);
    this.chrome.tabs.onActivated.removeListener(this.onTabActivated);
  }

  onTabClose = tabId => {
    console.log('tab closed, aborting', tabId);
    this.stop();
  };

  onTabUpdated = (tabId, info) => {
    console.log('onTabUpdated', { tabId, info });

    const isLoaded = info.status === 'complete';
    this.updateLastTimeTabLoaded(tabId, isLoaded);

    if (isLoaded) {
      console.log('injecting js/css on tab', tabId);
      this.injectScriptAndCss(tabId);
    }
  };

  injectScriptAndCss (tabId) {
    this.chrome.tabs.insertCSS(tabId, { code: getCss() } );
    this.chrome.tabs.executeScript(tabId, { file: 'js/inject/inject.min.js' } );
  }

  onTabActivated = activeInfo => {
    if (!this.isOwnActiveEvent) {
      console.log('Tab switched without own event, stopping');
      return this.stop();
    }

    this.fadeIn(activeInfo.tabId, () => {
      this.setTickTimeout();
    });
  };
}