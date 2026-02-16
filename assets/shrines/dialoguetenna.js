    // Dialogue data with support for inline GIFs
    const dialogues = [
      {
        text: "* And you'll all win some TV-tastic *[prizes]*!",
        sprite: "https://files.catbox.moe/pgn7jn.png",
        gifs: {
          "prizes": "https://files.catbox.moe/ognl0a.png"
        }
      },
      {
        text: "* Tonight, we have a *[spectacular]* performance for you! Get ready for *[magic]*!",
        sprite: "https://files.catbox.moe/pwjsp2.webp",
        gifs: {
          "spectacular": "https://files.catbox.moe/m6xs6c.gif",
          "magic": "https://files.catbox.moe/tzof52.png"
        }
      },
      {
        text: "* The audience is *[excited]*! Can you feel the *[energy]* in the air?",
        sprite: "https://files.catbox.moe/6t5r4e.png",
        gifs: {
          "excited": "https://files.catbox.moe/ognl0a.png",
          "energy": "https://files.catbox.moe/ognl0a.png"
        }
      },
      {
        text: "* And now... for my *[finale]*! *[Ta-da]*!",
        sprite: "https://files.catbox.moe/4d3s2a.png",
        gifs: {
          "finale": "https://files.catbox.moe/ognl0a.png",
          "Ta-da": "https://files.catbox.moe/ognl0a.png"
        }
      }
    ];

    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogueText');
    const character = document.getElementById('character');
    const skipBtn = document.getElementById('skipBtn');
    const restartBtn = document.getElementById('restartBtn');

    const typeSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3');
    typeSound.volume = 0.3;

    let currentDialogue = 0;
    let isTyping = false;
    let typingSpeed = 30; // ms per character
    let timeoutIds = [];

    function initDialogue() {
      showDialogue(currentDialogue);
      
      dialogueBox.addEventListener('click', advanceDialogue);
      
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          advanceDialogue();
        }
      });
      
      skipBtn.addEventListener('click', () => {
        if (isTyping) {
          skipTyping();
        }
      });
      
      restartBtn.addEventListener('click', () => {
        currentDialogue = 0;
        dialogueText.innerHTML = '';
        showDialogue(currentDialogue);
      });
    }

    function showDialogue(index) {
      const dialogue = dialogues[index];
      
      character.src = dialogue.sprite;
      
      typeWriter(dialogue.text, dialogue.gifs);
    }

    function typeWriter(text, gifs = {}) {
      isTyping = true;
      let charIndex = 0;
      let output = '';
      
      const gifPositions = [];
      for (const [key, url] of Object.entries(gifs)) {
        const marker = `*[${key}]*`;
        const pos = text.indexOf(marker);
        if (pos !== -1) {
          gifPositions.push({ pos, marker, url, length: marker.length });
        }
      }
      
      gifPositions.sort((a, b) => a.pos - b.pos);
      
      function typeNext() {
        if (charIndex < text.length) {
          const nextGif = gifPositions.find(g => g.pos === charIndex);
          
          if (nextGif) {
            output += `<img src="${nextGif.url}" class="inline-gif" alt="${nextGif.marker}">`;
            charIndex += nextGif.length;
          } else {
            const char = text.charAt(charIndex);
            output += char;
            charIndex++;
            
            if (charIndex % 3 === 0 && char.trim() !== '') {
              typeSound.currentTime = 0;
              typeSound.play().catch(e => console.log("Audio play prevented:", e));
            }
          }
          
          dialogueText.innerHTML = output;
          const id = setTimeout(typeNext, typingSpeed);
          timeoutIds.push(id);
        } else {
          isTyping = false;
        }
      }
      
      typeNext();
    }

    // Skip current typing animation
    function skipTyping() {
      // Clear all timeouts
      timeoutIds.forEach(id => clearTimeout(id));
      timeoutIds = [];
      
      // Display full text with GIFs
      const dialogue = dialogues[currentDialogue];
      let fullText = dialogue.text;
      
      // Replace GIF markers with actual images
      for (const [key, url] of Object.entries(dialogue.gifs || {})) {
        const marker = `*[${key}]*`;
        fullText = fullText.replace(marker, `<img src="${url}" class="inline-gif" alt="${marker}">`);
      }
      
      dialogueText.innerHTML = fullText;
      isTyping = false;
    }

    // Advance to next dialogue
    function advanceDialogue() {
      if (isTyping) {
        skipTyping();
        return;
      }
      
      // Move to next dialogue
      currentDialogue = (currentDialogue + 1) % dialogues.length;
      dialogueText.innerHTML = '';
      showDialogue(currentDialogue);
    }

    // Initialize when page loads
    window.addEventListener('DOMContentLoaded', initDialogue);