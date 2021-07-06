import { useCallback, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Status } from "../../models";

export const useInfiniteScrollingObserver = (
  status: Status,
  fetch: any,
  setQueryParams: any,
  hasMore: boolean
) => {
  const dispatch = useAppDispatch();

  const observer: React.MutableRefObject<any> = useRef();
  const lastElementRef = useCallback(node => {
    if (status === 'LOADING MORE') return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(fetch);
        dispatch(setQueryParams);
      }
    }, { threshold: 0.5 })
    if (node) observer.current.observe(node)
  }, [dispatch, fetch, setQueryParams, hasMore, status]);

  return [lastElementRef]
};
