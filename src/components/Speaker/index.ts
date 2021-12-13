export function Speak(texto:string, velocidade:number = 1) {
  let msg = new SpeechSynthesisUtterance();
  msg.text = texto;
  msg.lang = 'en';
  msg.rate = velocidade;
//   msg.on = function(event) {
//     alert('Finished in ' + event.elapsedTime + ' seconds.');


// };
  window.speechSynthesis.speak(msg)
}
