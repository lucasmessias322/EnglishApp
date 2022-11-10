export async function Speak(texto, cb) {
  let msg = new SpeechSynthesisUtterance();
  msg.text = texto;
  msg.lang = "en-us";
  msg.rate = 1;
  await window.speechSynthesis.speak(msg);

  setTimeout(() => {
    cb();
  }, 500);
}

// let myTimeout :any;
// function myTimer(time = 10000) {
//   window.speechSynthesis.pause();
//   window.speechSynthesis.resume();
//   myTimeout = setTimeout(myTimer, time);
// }

// export function Speak(texto:string, velocidade:number = 1){
//   window.speechSynthesis.cancel();
//   myTimeout = setTimeout(myTimer, 10000);
//   let utt = new SpeechSynthesisUtterance();
//   utt.lang = "en-US";
//   utt.text = texto;
//   utt.rate = velocidade;

//   utt.onend = function () {
//     clearTimeout(myTimeout);
//   };
//   window.speechSynthesis.speak(utt);

// }
