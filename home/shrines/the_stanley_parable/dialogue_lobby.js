const dialogue = [
  "When Stanley came to a set of two open doors, he entered the door on his left."
];

let currentLine = 0;
const textElement = document.getElementById("subtitle");

document.getElementById("subtitle-box").addEventListener("click", () => {
  if (currentLine < dialogue.length) {
    textElement.textContent = dialogue[currentLine];
    currentLine++;
  }

  if (currentLine >= dialogue.length) {
    textElement.classList.remove("has-more");
  }
});