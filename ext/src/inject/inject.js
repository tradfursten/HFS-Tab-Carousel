import constants from 'ext/src/shared/constants';

((chrome, document) => {
  const run = () => {
    const body = document.body;
    body.className = `${body.className} hfscarousel-hidden`;

    //Try to fix bug when page is not with opacity=0 when tab is activated
    setTimeout(() => {
      body.className = `${body.className} hfscarousel-transition`;
    }, 100);
  };

  chrome.extension.onMessage.addListener((msg) => {
    const body = document.body;
    switch (msg.type) {
      case constants.FADE_IN:
        body.className = body.className.replace(' hfscarousel-hidden', '');
        break;

      case constants.FADE_OUT:
        body.className = `${body.className} hfscarousel-hidden`;
        break;
    }
  });

  run();
})(chrome, document);