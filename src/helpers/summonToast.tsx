import toast from "react-hot-toast";

type ToastText = {
  loading: string;
  success: string;
};

export const summonToast = <T,>(
  asyncFn: (...args: any[]) => Promise<T>,
  params: any[],
  text: ToastText
): Promise<T> => {
  return toast.promise(
    asyncFn(...params),
    {
      loading: text.loading,
      success: <b>{text.success}</b>,
      error: <b>Something went wrong...</b>,
    }
  );
};
