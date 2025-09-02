import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ lenis }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenis?.current) {
      lenis.current.scrollTo(0, { immediate: false });
    }
  }, [pathname, lenis]);

  return null;
}
