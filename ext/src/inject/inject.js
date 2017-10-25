import constants from '../shared/constants';

((chrome, document) => {
  
  let start = Date.now();
  
  const run = () => {
    const body = document.body;
    body.className = `${body.className} carousel-hidden`;
    
    setTimeout(() => {
      body.className = `${body.className} transition`;
    }, 100);
  };
  
  chrome.extension.onMessage.addListener((msg) => {
    console.log('onMessage', msg);
    const body = document.body;
    switch(msg.type) {
      case constants.FADE_IN:
        body.className = body.className.replace('carousel-hidden', '');
        break;
        
      case constants.FADE_OUT:
        body.className = body.className + ' carousel-hidden';
        break;
    }
  });
  
  run();
  
  
})(chrome, document);