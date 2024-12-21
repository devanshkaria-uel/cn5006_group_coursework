import React, {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type LoaderRef = {
  showLoader: () => void;
  hideLoader: () => void;
};

const Loader = forwardRef<LoaderRef>((_, ref) => {
  const [isLoading, setLoading] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    showLoader() {
      setLoading(true);
    },
    hideLoader() {
      setLoading(false);
    },
  }));
  return isLoading ? (
    <div className="h-screen w-screen z-50 bg-black/80 absolute top-0 flex justify-center items-center text-white text-6xl">
      Loading..
    </div>
  ) : (
    <div></div>
  );
});

export default Loader;
