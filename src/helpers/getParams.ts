import { Filters } from '@/types';
import { O, pipe } from '@mobily/ts-belt';

export const getParam = (
  searchParams: URLSearchParams,
  key: keyof Filters,
  defaultValue: string
): string => {
  return pipe(
    searchParams.get(key),
    O.fromNullable,
    O.getWithDefault(defaultValue)
  );
};

export const getValidatedParam = <T extends string>(
  searchParams: URLSearchParams,
  key: string,
  validator: (value: string) => value is T,
  defaultValue: T
): T  => {
  return pipe(
    searchParams.get(key),
    O.fromNullable,
    O.flatMap((param) => (validator(param) ? O.Some(param) : O.None)),
    O.getWithDefault(defaultValue)
  );
}
