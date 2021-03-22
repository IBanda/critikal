import Header from './Header';
import LinkCopy from './LinkCopy';

interface Props {
  children: React.ReactNode;
  id: string;
}

export default function Layout({ children, id }: Props) {
  return (
    <>
      <div className="bg-gray-900">
        <div className="container pb-12">
          <Header />
          <div className="flex flex-col items-center justify-center">
            <LinkCopy id={id} />
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </>
  );
}
