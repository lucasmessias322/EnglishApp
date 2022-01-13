
// export function Speak(texto:string, velocidade:number = 1) {
//   let msg = new SpeechSynthesisUtterance();
//   msg.text = texto;
//   msg.lang = 'en-us';
//   msg.rate = velocidade;
//   window.speechSynthesis.speak(msg)
// }


let myTimeout :any;
function myTimer(time = 10000) {
  window.speechSynthesis.pause();
  window.speechSynthesis.resume();
  myTimeout = setTimeout(myTimer, time);
}

export function Speak(texto:string, velocidade:number = 1){
  window.speechSynthesis.cancel();
  myTimeout = setTimeout(myTimer, 10000);
  let utt = new SpeechSynthesisUtterance();
  utt.lang = "en-US";
  utt.text = texto;
  utt.rate = velocidade;

  utt.onend = function () {
    clearTimeout(myTimeout);
  };
  window.speechSynthesis.speak(utt);

  
}
