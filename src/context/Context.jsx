import { useEffect, useState, createContext} from 'react';
import main from '../config/gemini';

export const Context = createContext();

const MIN_SEND_INTERVAL_MS = 4000;

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [nextSendAt, setNextSendAt] = useState(0);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingMs = Math.max(0, nextSendAt - Date.now());
      setCooldownSeconds(Math.ceil(remainingMs / 1000));
    }, 250);

    return () => clearInterval(timer);
  }, [nextSendAt]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
  const promptToSend = (prompt ?? input).trim();

  if (!promptToSend || loading) {
    return;
  }

  const remainingMs = Math.max(0, nextSendAt - Date.now());
  if (remainingMs > 0) {
    setShowResult(true);
    setResultData(`Please wait ${Math.ceil(remainingMs / 1000)}s before sending another request.`);
    return;
  }

  setResultData('');
  setLoading(true);
  setShowResult(true);
  setNextSendAt(Date.now() + MIN_SEND_INTERVAL_MS);

  try {
    let response = '';
    if (prompt !== undefined){
      response = await main(promptToSend);
      setRecentPrompt(promptToSend);
    }
    else {
      setPrevPrompts((prev) => [...prev, input]);
      response = await main(promptToSend);
      setRecentPrompt(promptToSend);
    }




    setResultData(response);

    setInput('');
  } catch (error) {
    setResultData(error?.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
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
    cooldownSeconds,
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
