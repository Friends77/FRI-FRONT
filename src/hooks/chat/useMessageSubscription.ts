import messageSubscribersAtom from '@/recoil/chat/messageSubscriber';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const useMessageSubscription = () => {
  const [subscribers, setSubscribers] = useRecoilState(messageSubscribersAtom);

  const subscribersRef = useRef<Set<(data: string) => void>>(
    new Set(subscribers),
  );

  useEffect(() => {
    subscribersRef.current = new Set(subscribers);
  }, [subscribers]);

  const subscribe = (callback: (data: string) => void) => {
    setSubscribers((prevSubScribers) => {
      const newSubScribers = new Set(prevSubScribers);
      newSubScribers.add(callback);

      return newSubScribers;
    });

    return () => {
      setSubscribers((prevSubScribers) => {
        const newSubScribers = new Set(prevSubScribers);
        newSubScribers.delete(callback);

        return newSubScribers;
      });
    };
  };

  const notifySubscribers = (data: string) => {
    subscribersRef.current.forEach((subscriber) => subscriber(data));
  };

  return { subscribe, notifySubscribers };
};

export default useMessageSubscription;
