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
    try {
      const res = await fetch(input, init);
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
