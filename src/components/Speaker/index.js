export function Speak(texto) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.lang = 'en';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  }
