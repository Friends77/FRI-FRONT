import messageSubscribersAtom from '@/recoil/chat/messageSubscriber';
import { useRecoilState } from 'recoil';

const useMessageSubscription = () => {
  const [subscribers, setSubscribers] = useRecoilState(messageSubscribersAtom);

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
    subscribers.forEach((subscriber) => subscriber(data));
  };

  return { subscribe, notifySubscribers };
};

export default useMessageSubscription;
