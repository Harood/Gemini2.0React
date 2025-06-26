import { useState, createContext} from 'react';
import main from '../config/gemini';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, index * 75); // Adjust the delay as needed
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
  setResultData('');
  setLoading(true);
  setShowResult(true);
  let response = '';
  if (prompt !== undefined){
    response = await main(prompt);
    setRecentPrompt(prompt);
  }
  else { 
    setPrevPrompts((prev) => [...prev, input]);
    response = await main(input);
    setRecentPrompt(input);
  }




  // Step 1: Bold formatting (**text** => <b>text</b>)
  let formatted = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  // Step 2: Headings (lines ending with ':' become <h3>)
  formatted = formatted.replace(/^(.+?):$/gm, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>');

  // Step 3: Bullet points (* item)
  formatted = formatted.replace(/\n\* (.*?)(?=\n|$)/g, '<li>$1</li>');

  // Step 4: Wrap all <li> in <ul> if any exist
  if (formatted.includes('<li>')) {
    formatted = formatted.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="list-disc list-inside ml-4 mt-2">$1</ul>');
  }

  // Step 5: Replace remaining line breaks
  formatted = formatted.replace(/\n/g, '<br>');

  // Step 6: Typing effect
  const words = formatted.split(' ');
  for (let i = 0; i < words.length; i++) {
    delayPara(i, words[i] + ' ');
  }

  setLoading(false);
  setInput('');
};




  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
