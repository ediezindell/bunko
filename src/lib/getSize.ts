import { SizeKey, sizeMap } from '@/types/RakutenBooksSearchApi';

export const getSizeLabel = (size: SizeKey) => {
  return sizeMap[size];
};
