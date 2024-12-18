import { useEffect, useRef } from 'react';

interface ObserverProps {
  callback: () => void;
}

const Observer = ({ callback }: ObserverProps) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (observer && loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback]);

  return (
    <div
      ref={loadMoreRef}
      className="h-3"
    ></div>
  );
};

export default Observer;
