const form = document.querySelector('#options-form');
const TAB_TIME = document.querySelector('#TAB_TIME');
const FADE_IN_OUT_TIME = document.querySelector('#FADE_IN_OUT_TIME');
const RELOAD_FREQUENCY = document.querySelector('#RELOAD_FREQUENCY');


form.onsubmit = () => {
  localStorage.setItem('TAB_TIME', TAB_TIME.value);
  localStorage.setItem('FADE_IN_OUT_TIME', FADE_IN_OUT_TIME.value);
  localStorage.setItem('RELOAD_FREQUENCY', RELOAD_FREQUENCY.value);
};


const fillForm = () => {
  TAB_TIME.value = localStorage.getItem('TAB_TIME');
  FADE_IN_OUT_TIME.value = localStorage.getItem('FADE_IN_OUT_TIME');
  RELOAD_FREQUENCY.value = localStorage.getItem('RELOAD_FREQUENCY');
};




fillForm();