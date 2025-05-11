import { useState, useEffect, useCallback } from 'react';

interface WebSocketHook {
  sendMessage: (message: string) => void;
  lastMessage: MessageEvent | null;
  readyState: WebSocket['readyState'];
}

export const useWebSocket = (url: string): WebSocketHook => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState<WebSocket['readyState']>(WebSocket.CONNECTING);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setReadyState(socket.readyState);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setReadyState(socket.readyState);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onmessage = (event) => {
      setLastMessage(event);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }, [ws]);

  return { sendMessage, lastMessage, readyState };
}; 