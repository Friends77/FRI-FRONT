import { selector } from 'recoil';
import { sentMessageAtom } from './atom';

const imageMessagesSelector = selector({
  key: 'imageMessagesSelector',
  get: ({ get }) => {
    const sentMessageList = get(sentMessageAtom);
    const imageMessageList = sentMessageList.filter(
      (message) => message.type === 'IMAGE',
    );

    let imageList: string[] = [];

    imageMessageList.map((message) => {
      imageList = [...imageList, ...message.content.split(',')];
    });

    return imageList;
  },
});

export default imageMessagesSelector;
