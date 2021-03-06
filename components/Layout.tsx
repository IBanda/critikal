import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
