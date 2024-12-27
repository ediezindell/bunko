import { Size } from "@/types/RakutenBooksSearchApiParams";

export const sizeMap: Record<Size, string> = {
  0: "全て",
  1: "単行本",
  2: "文庫",
  3: "新書",
  4: "全集・双書",
  5: "事・辞典",
  6: "図鑑",
  7: "絵本",
  8: "カセット,CDなど",
  9: "コミック",
  10: "ムックその他",
};

export const getSizeLabel = (size: Size) => {
  return sizeMap[size]
}
