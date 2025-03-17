import { IMyChatItem } from '@/types/chat';
import { ISimpleUserProfile } from '@/types/user';

interface IFilterKeyword {
  type: 'chat' | 'user';
  content: IMyChatItem[] | ISimpleUserProfile[];
  keyword: string;
}

const CHO = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const getChosung = (word: string) => {
  return word
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return char; // 한글이 아니면 그대로 반환

      return CHO[Math.floor(code / 588)];
    })
    .join('');
};

const getSearchableText = (text: string) => ({
  lowerText: text.toLowerCase(),
  chosungText: getChosung(text),
});

export const filterKeyword = ({ type, content, keyword }: IFilterKeyword) => {
  if (!keyword || !keyword.trim()) return content;

  const { lowerText: lowerKeyword, chosungText: keywordChosung } =
    getSearchableText(keyword);

  return content.filter((item) => {
    const text =
      type === 'chat'
        ? (item as IMyChatItem).title
        : (item as ISimpleUserProfile).nickname;

    const { lowerText, chosungText } = getSearchableText(text);

    return (
      lowerText.includes(lowerKeyword) || chosungText.includes(keywordChosung)
    );
  });
};
