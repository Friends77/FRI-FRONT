import { INextMessageUtil, IPrevMessageUtil } from '@/types/chat';
import { isSameDay, isSameMinute } from 'date-fns';

export const isSameDate = ({
  currentMessage,
  prevMessage,
  index,
}: IPrevMessageUtil) => {
  if (index === 0) return false;

  const dateOfCurrentMessage = new Date(currentMessage.createdAt);

  const dateOfPrevMessage = new Date(prevMessage.createdAt);

  if (isSameDay(dateOfCurrentMessage, dateOfPrevMessage)) return true;

  return false;
};

export const isSameTime = ({
  currentMessage,
  prevMessage,
  index,
}: IPrevMessageUtil) => {
  if (index === 0) return false;

  const dateOfCurrentMessage = new Date(currentMessage.createdAt);

  const dateOfPrevMessage = new Date(prevMessage.createdAt);

  if (isSameMinute(dateOfCurrentMessage, dateOfPrevMessage)) return true;

  return false;
};

export const isSameSender = ({
  currentMessage,
  prevMessage,
  index,
}: IPrevMessageUtil) => {
  if (index === 0) return false;

  const currentMemberId = currentMessage.senderId;

  const prevMessageMemberId = prevMessage.senderId;

  if (currentMemberId === prevMessageMemberId) return true;

  return false;
};

export const isShowSendTime = ({
  currentMessage,
  nextMessage,
  index,
  length,
}: INextMessageUtil) => {
  if (index === length - 1) return true;

  const currentMemberId = currentMessage.senderId;

  const nextMessageMemberId = nextMessage.senderId;

  if (currentMemberId !== nextMessageMemberId) return true;

  const dateOfCurrentMessage = new Date(currentMessage.createdAt);

  const dateOfNextMessage = new Date(nextMessage.createdAt);

  if (!isSameMinute(dateOfCurrentMessage, dateOfNextMessage)) {
    return true;
  }

  return false;
};
