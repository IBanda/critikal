import useSubscriber from 'lib/useSubscriber';
import { useRouter } from 'next/router';
import Button from './Button';

export default function Header() {
  const { mutateSubscriber } = useSubscriber({});
  const router = useRouter();
  const onLogout = async () => {
    await fetch('/api/logout');
    mutateSubscriber();
    router.push('/signin');
  };
  return (
    <header className="flex items-center justify-between px-3 mb-8">
      <div className="bg-gray-900 p-2 text-white tracking-tight font-bold shadow-lg text-xl">
        Critikal
      </div>
      <Button
        type="button"
        className="py-2 px-3 indigo  text-sm "
        onClick={onLogout}
      >
        Logout
      </Button>
    </header>
  );
}
