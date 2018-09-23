import MessageTypes from 'root/shared/message-types';

((chrome, document) => {
  const body = document.body;
  const run = () => {
    body.className = `${body.className} hfscarousel-hidden`;

    //Try to fix bug when page doesn't have opacity=0 when tab is activated
    setTimeout(() => {
      body.className = `${body.className} hfscarousel-transition`;
    }, 100);
  };

  chrome.extension.onMessage.addListener((msg) => {
    switch (msg.type) {
      case MessageTypes.FADE_IN:
        body.className = body.className.replace(' hfscarousel-hidden', '');
        break;

      case MessageTypes.FADE_OUT:
        body.className = `${body.className} hfscarousel-hidden`;
        break;
    }
  });

  run();
})(chrome, document);