import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface Redirection {
  redirectPath: string | null;
  redirect: boolean;
}

export default function useSubscriber({
  redirectPath = null,
  redirect = false,
}: Redirection) {
  const { data: subscriber, mutate: mutateSubscriber } = useSWR(
    '/api/subscriber'
  );

  useEffect(() => {
    if (!redirectPath || !subscriber) return;

    if (
      (redirectPath && !redirect && !subscriber?.loggedIn) ||
      (redirect && subscriber?.loggedIn)
    ) {
      Router.push(redirectPath);
    }
  }, [redirect, redirectPath, subscriber]);
  return { subscriber, mutateSubscriber };
}
