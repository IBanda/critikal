import useSubscriber from 'lib/useSubscriber';
import { useRouter } from 'next/router';

export default function Header() {
  const { mutateSubscriber } = useSubscriber({});
  const router = useRouter();
  const onLogout = async () => {
    await fetch('/api/logout');
    mutateSubscriber();
    router.push('/');
  };
  return (
    <header className="flex items-center justify-between px-3 mb-8">
      <img src="/logo.png" className="w-16" alt="logo" />
      <button
        type="button"
        className="text-white bg-indigo-500 py-2 px-3 font-medium text-sm tracking-tighter rounded"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
}
