export const parseOffsetLimitFromUrl = (baseUrl: string) => {
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams(url.search);

  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  return {
    url,
    searchParams,
    offset: offset ? parseInt(offset, 10) : 0,
    limit: limit ? parseInt(limit, 10) : 20,
  };
};
