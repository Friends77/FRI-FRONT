import { useEffect, useRef } from 'react';

interface IObserverProps {
  callback: () => void;
  options?: IntersectionObserverInit;
}

const InfiniteScrollObserver = ({ callback, options }: IObserverProps) => {
  const ref = useRef(null);

  const defaultOptions = {
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options || defaultOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  return <div ref={ref} />;
};

export default InfiniteScrollObserver;
