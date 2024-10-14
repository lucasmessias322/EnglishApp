export default function handleTextToSpeech(word: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en";
    speechSynthesis.speak(utterance);
  } else {
    console.error("Text-to-speech is not supported in this browser.");
  }
}
