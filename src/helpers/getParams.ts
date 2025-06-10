import { Filters } from '@/types';
import { O, pipe } from '@mobily/ts-belt';

export const getSafeParam = <T extends string>(
  searchParams: URLSearchParams,
  key: keyof Filters,
  defaultValue: T,
  validator?: (value: string) => value is T
): T => {
  return pipe(
    searchParams.get(key),
    O.fromNullable,
    O.flatMap((val) => {
      if (!validator) return O.Some(val as T);
      return validator(val) ? O.Some(val) : O.None;
    }),
    O.getWithDefault(defaultValue)
  );
};
