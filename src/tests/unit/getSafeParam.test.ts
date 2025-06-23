import { getSafeParam } from "@/helpers/getParams";
import { isSort } from "@/types";


describe('getSafeParam', () => {
  test('returns valid value when validator passes', () => {
    const params = new URLSearchParams({ sort: 'title' });
    const result = getSafeParam(params, 'sort', 'album', isSort);
    expect(result).toBe('title');
  });

  test('returns default value when validator fails', () => {
    const params = new URLSearchParams({ sort: 'invalid' });
    const result = getSafeParam(params, 'sort', 'album', isSort);
    expect(result).toBe('album');
  });

  test('returns default value when param is missing', () => {
    const params = new URLSearchParams({});
    const result = getSafeParam(params, 'sort', 'album', isSort);
    expect(result).toBe('album');
  });

  test('returns value when validator is not provided', () => {
    const params = new URLSearchParams({ search: 'rock' });
    const result = getSafeParam(params, 'search', '');
    expect(result).toBe('rock');
  });
});
