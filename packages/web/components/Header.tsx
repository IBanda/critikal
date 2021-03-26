import useSubscriber from 'lib/useSubscriber';
import { useRouter } from 'next/router';
import Button from './Button';
import TagModalBtn from './TagModalBtn';

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
      <div>
        <TagModalBtn />
        <Button
          type="button"
          className="py-2 px-3   text-sm "
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
