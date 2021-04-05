import { useState } from 'react';

interface UseFetchProps {
  loadingMessage: string;
}

export const initialNotification = {
  message: '',
  success: false,
  loading: false,
};
export default function useFetch({ loadingMessage }: UseFetchProps) {
  const [{ message, success, loading }, setNotification] = useState(
    initialNotification
  );
  const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    setNotification((prev) => ({
      ...prev,
      message: loadingMessage,
      loading: true,
    }));
    const url =
      process.env.NODE_ENV === 'test' ? `http://localhost:3000${input}` : input;

    try {
      const res = await fetch(url, init);
      const data = await res.json();
      setNotification({ ...data, loading: false });
      return data;
    } catch (error) {
      setNotification({ ...error, loading: false });
    }
  };

  return {
    fetcher,
    notification: { message, success, loading },
    setNotification,
    initialNotification,
  };
}
