// Helper functions for storing tests

export const getAccuracy = (keyStrokes, prompt) => {
    const promptKeys = prompt.split('');
    
    let offset = 0;
    let correct = 0;
    let error = 0;
    for (let i = 0; i < keyStrokes.length; i++) {
      if (keyStrokes[i] === 'Backspace') {
        offset -= 2;
        continue;
      }
      if (keyStrokes[i] === promptKeys[i + offset]) {
        correct++;
      } else {
        error++;
      }
    }

    return Math.floor((correct / (correct + error)) * 100) || 0; // Returns percentage
};

export const getWPM = (keyStrokes, duration) => {
  const filteredKeystrokes = keyStrokes.filter(k => k !== 'Backspace');

  const wordsTyped = filteredKeystrokes.length / 5;
  const minutes = duration / 60;

  return minutes > 0 ? Math.floor(wordsTyped / minutes) : 0;
}

export const getAWPM = (keyStrokes, duration, prompt) => {
  const wpm = getWPM(keyStrokes, duration);
  const minutes = duration / 60;

  const finalTyped = [];
  for (const key of keyStrokes) {
    if (key === "Backspace") {
      finalTyped.pop(); 
    } else {
      finalTyped.push(key); 
    }
  }

  let uncorrectedErrors = 0;
  for (let i = 0; i < Math.max(finalTyped.length, prompt.length); i++) {
    if (finalTyped[i] !== prompt[i]) {
      uncorrectedErrors++;
    }
  }

  const awpm = Math.max(Math.floor(wpm - (uncorrectedErrors / minutes)), 0);
  return awpm;
};


