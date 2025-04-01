import useGetAlarmList from '@/hooks/user/useGetAlarmList';
import * as Styled from './AlarmPopover.styled';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import alarmListAtom from '@/recoil/user/alarmList';
import AlarmItem from '../AlarmItem';

const AlarmPopover = () => {
  const [lastAlarmId, setLastAlarmId] = useState<number | undefined>(undefined);

  const { data: alarmListResponse } = useGetAlarmList(lastAlarmId);

  const [alarmList, setAlarmList] = useRecoilState(alarmListAtom);

  const observerRef = useRef<HTMLLIElement | null>(null);

  const [hasNext, setHasNext] = useState<boolean>(true);

  useEffect(() => {
    if (!alarmListResponse) return;

    setAlarmList((prevList) => {
      if (!lastAlarmId) return alarmListResponse.content;

      return [...prevList, ...alarmListResponse.content];
    });

    setHasNext(alarmListResponse.hasNext);
  }, [alarmListResponse, lastAlarmId, setAlarmList]);

  useEffect(() => {
    if (!observerRef.current || !hasNext) return;

    const currentObserverRef = observerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLastAlarmId(alarmList[alarmList.length - 1].id);
        }
      },
      { threshold: 0.5 },
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [hasNext, alarmList]);

  return (
    <>
      <Styled.AlarmTriangleIcon />
      <Styled.AlarmPopoverContainer>
        <Styled.Header>전체 알림</Styled.Header>
        {alarmList.length > 0 ? (
          <Styled.AlarmList>
            {alarmList.map((alarm, index) => (
              <AlarmItem
                key={alarm.id}
                alarm={alarm}
                ref={index === alarmList.length - 1 ? observerRef : null}
              />
            ))}
          </Styled.AlarmList>
        ) : (
          <Styled.EmptyText>받은 알림이 없어요</Styled.EmptyText>
        )}
      </Styled.AlarmPopoverContainer>
    </>
  );
};

export default AlarmPopover;
