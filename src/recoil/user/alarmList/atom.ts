import { IAlarmItem } from '@/types/user';
import { atom } from 'recoil';

const alarmListAtom = atom<IAlarmItem[]>({
  key: 'alarmListAtom',
  default: [],
});

export default alarmListAtom;
