'use client';

import '../../styles/test-page.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function TestPage() {
  const router = useRouter();
  const data = router.query;
  const prompt = `The vast ocean stretched endlessly before her, its deep blue waves shimmering under the golden sun.\n
Seagulls called above as she took a deep breath of the salty air.\n
Each crashing wave told a different story, whispering secrets of the past.\n
She closed her eyes, feeling the cool breeze against her face, and imagined distant lands beyond the horizon.\n
The rhythmic sound of the tide was calming, a reminder that nature moves at its own pace.\n
No rush, no urgency—just the endless cycle of the sea, carrying dreams and mysteries with every ebb and flow.
`.replaceAll('\n', ' ').replaceAll('  ', ' ');

  const [keys, setKeys] = useState([]);
  const [displayKeys, setDisplayKeys] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setDisplayKeys(prev => prev.slice(0, -1));
      setKeys(prev => [...prev, e.key]);
      return;
    }
    
    const regex = /^[a-zA-Z0-9.,!?;:''(){}\[\]<>@#%^&*\-_=+\/\\|~`$\s]$/;
    
    if (!regex.test(e.key)) {
      return;
    }
    
    setDisplayKeys(prev => [...prev, e.key]);
    setKeys(prev => [...prev, e.key]);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getAccuracy = (keyStrokes) => {
    const promptKeys = prompt.split('');

    console.log(keyStrokes, promptKeys);
    
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
    console.log("offset: ", offset)
    console.log("correct: ", correct)
    console.log("error: ", error)

    return correct / (correct + error);
  } 

  return (
    <div className='typing-frame'>
      <div className='typing-container'>
        <p>
          {displayKeys.map((key, index) => {
            if (key === prompt[index]) {
              return <span key={key + index} className='typed typed-correct'>{key}</span>
            } 
            return <span key={key + index} className='typed typed-error'>
              {prompt[index] === ' ' ? '•' : prompt[index]}
            </span>
          })}
          <span className="cursor"/>
          <span className='prompt'>{prompt.slice(displayKeys.length)}</span>
        </p>
      </div>
      <div className='stats'>
        Accuracy: {Math.floor(getAccuracy(keys) * 100) || ''}%
      </div>
    </div>
  );
}
