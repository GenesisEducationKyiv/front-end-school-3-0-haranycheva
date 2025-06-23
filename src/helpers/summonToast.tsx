import toast from "react-hot-toast";

type ToastText = {
  loading: string;
  success: string;
};

export const summonToast = async <T,>(
  asyncFn: (...args: any[]) => Promise<T>,
  params: any[],
  text: ToastText
): Promise<T | undefined> => {
  try {
    return await toast.promise(
      asyncFn(...params),
      {
        loading: text.loading,
        success: <b>{text.success}</b>,
        error: <b>Something went wrong...</b>,
      }
    );
  } catch (err) {
    throw err;
  }
};

