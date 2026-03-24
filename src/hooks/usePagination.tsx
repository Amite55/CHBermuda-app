import { useCallback, useRef, useState } from "react";

export const usePagination = (apiCall: Function, limit = 10) => {
  const [response, setResponse] = useState<any>({});
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async (page: number, reset = false) => {
    if (isFetchingRef.current) return;
    if (!hasMoreRef.current && !reset) return;
    isFetchingRef.current = true;
    reset ? setIsLoading(true) : setIsFetchingMore(true);
    try {
      const res = await apiCall({ page, per_page: limit });
      setResponse(res);
      const newData = res?.data?.data ?? [];
      const hasMore = !!res?.data?.data?.next_page_url;
      pageRef.current = page;
      hasMoreRef.current = hasMore;
      setData((prev) => (reset ? newData?.data : [...prev, ...newData?.data]));
    } catch (err) {
      console.log("Pagination error:", err);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsFetchingMore(false);
      setRefreshing(false);
    }
  }, []);

  const loadMore = () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    fetchData(pageRef.current + 1);
  };

  const refresh = () => {
    if (isFetchingRef.current) return;
    setRefreshing(true);
    hasMoreRef.current = true;
    pageRef.current = 1;
    fetchData(1, true);
  };

  return {
    data,
    isLoading,
    isFetchingMore,
    refreshing,
    fetchData,
    loadMore,
    refresh,
    response,
  };
};

// user case -----------------------
// const [getMyStaffs] = useLazyGetMyStaffsQuery();
// const {
//   data: staffsData,
//   isLoading,
//   isFetchingMore,
//   refreshing,
//   fetchData,
//   loadMore,
//   refresh,
// } = usePagination(getMyStaffs);
// //  ============ call pagination function ===========
// useEffect(() => {
//   fetchData(1, true);
// }, []);

{
  /* <FlatList
  data={staffs}
  onEndReached={loadMore}
  onRefresh={refresh}
  refreshing={refreshing}
/> */
}
