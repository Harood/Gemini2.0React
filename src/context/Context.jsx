import { useEffect, useRef, useState, createContext } from 'react';
import main from '../config/gemini';

export const Context = createContext();

const MIN_SEND_INTERVAL_MS = 4000;
const TYPE_DELAY_MS = 18;

const getNextChunk = (text, index) => {
  const currentCharacter = text[index];

  if (/\s/.test(currentCharacter)) {
    let endIndex = index + 1;

    while (endIndex < text.length && /\s/.test(text[endIndex])) {
      endIndex += 1;
    }

    return text.slice(index, endIndex);
  }

  let endIndex = index + 1;

  while (endIndex < text.length && !/\s/.test(text[endIndex]) && endIndex - index < 4) {
    endIndex += 1;
  }

  return text.slice(index, endIndex);
};

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [resultData, setResultData] = useState('');
  const [nextSendAt, setNextSendAt] = useState(0);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const typingTimeoutRef = useRef(null);
  const typingRunIdRef = useRef(0);

  const clearTypingAnimation = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const startTypingAnimation = (text) => {
    clearTypingAnimation();
    typingRunIdRef.current += 1;
    const runId = typingRunIdRef.current;

    setTyping(true);
    setResultData('');

    const typeNext = (index) => {
      if (runId !== typingRunIdRef.current) {
        return;
      }

      if (index >= text.length) {
        setTyping(false);
        return;
      }

      const chunk = getNextChunk(text, index);
      setResultData((prev) => prev + chunk);

      const lastCharacter = chunk[chunk.length - 1];
      const delay = /[.!?]/.test(lastCharacter)
        ? TYPE_DELAY_MS * 6
        : /[,;:]/.test(lastCharacter)
          ? TYPE_DELAY_MS * 3
          : /\s/.test(lastCharacter)
            ? TYPE_DELAY_MS
            : Math.round(TYPE_DELAY_MS * 1.4);

      typingTimeoutRef.current = setTimeout(() => typeNext(index + chunk.length), delay);
    };

    typeNext(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingMs = Math.max(0, nextSendAt - Date.now());
      setCooldownSeconds(Math.ceil(remainingMs / 1000));
    }, 250);

    return () => clearInterval(timer);
  }, [nextSendAt]);

  useEffect(() => {
    return () => {
      clearTypingAnimation();
      typingRunIdRef.current += 1;
    };
  }, []);

  const newChat = () => {
    clearTypingAnimation();
    typingRunIdRef.current += 1;
    setLoading(false);
    setTyping(false);
    setShowResult(false);
    setResultData('');
  };

  const onSent = async (prompt) => {
    const promptToSend = (prompt ?? input).trim();

    if (!promptToSend || loading) {
      return;
    }

    clearTypingAnimation();
    typingRunIdRef.current += 1;

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
      if (prompt !== undefined) {
        response = await main(promptToSend);
        setRecentPrompt(promptToSend);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        response = await main(promptToSend);
        setRecentPrompt(promptToSend);
      }

      setLoading(false);
      startTypingAnimation(response);
      setInput('');
    } catch (error) {
      setTyping(false);
      setLoading(false);
      setResultData(error?.message || 'Something went wrong. Please try again.');
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
    typing,
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
