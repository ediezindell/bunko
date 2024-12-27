export const getSearchParams = (params: Record<string, number | string>) => {
  return new URLSearchParams(Object.entries(params).map(([key, val]) => [key, val.toString()]));
}

