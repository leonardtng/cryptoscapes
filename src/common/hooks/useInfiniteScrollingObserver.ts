import { useCallback, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Status } from "../../models";

const useInfiniteScrollingObserver = (
  status: Status,
  fetch: any,
  setQueryParams: any
) => {
  const dispatch = useAppDispatch();

  const observer: React.MutableRefObject<any> = useRef();
  const lastElementRef = useCallback(node => {
    if (status === 'LOADING') return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(fetch);
        dispatch(setQueryParams);
      }
    }, { threshold: 0.99 })
    if (node) observer.current.observe(node)
  }, [dispatch, fetch, setQueryParams, status]);

  return [lastElementRef]
}

export default useInfiniteScrollingObserver