export function Speak(texto, velocidade = 1, ) {
    let msg = new SpeechSynthesisUtterance();
    // let voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[10]; 
    msg.text = texto;
    msg.lang = 'en';
    msg.rate = velocidade;
    window.speechSynthesis.speak(msg);
  }
