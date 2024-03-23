export const parseOffsetLimitFromUrl = (url: string) => {
  const searchParams = new URLSearchParams(new URL(url).search);

  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  return {
    offset: offset ? parseInt(offset, 10) : 0,
    limit: limit ? parseInt(limit, 10) : 20,
  };
};
