import { Result } from "neverthrow";

export type ApiResult<T> = Promise<Result<T, Error>>;