import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onHide: () => void;
  duration: number;
  className: string;
}

export default function Alert({
  children,
  show,
  onHide,
  duration,
  className,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onHide(), duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, show]);

  return (
    show && (
      <div
        role="alert"
        className={`tracking-tighter text-white p-2 rounded text-sm mb-4 ${className}`}
      >
        {children}
      </div>
    )
  );
}
