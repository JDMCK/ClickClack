// Helper functions for storing tests

// Returns accuracy
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
