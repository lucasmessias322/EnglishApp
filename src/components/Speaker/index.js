export function Speak(texto, velocidade = 1) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.lang = 'en';
    msg.rate = velocidade;
    window.speechSynthesis.speak(msg);
  }
