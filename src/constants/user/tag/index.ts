import { IInterestTag } from '@/types/@common';

export const transformTags = (tags: IInterestTag[]) => {
  return tags.map((tag) => ({
    value: tag.id,
    label: tag.type === 'SUBJECT' ? `${tag.image} ${tag.name}` : tag.name,
  }));
};
