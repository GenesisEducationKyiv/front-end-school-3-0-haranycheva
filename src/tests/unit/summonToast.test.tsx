import { summonToast } from '@/helpers/summonToast';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  promise: jest.fn((promise) => promise),
}));

describe('summonToast', () => {
  const mockParams = ['param1', 'param2'];
  const mockText = {
    loading: 'Loading...',
    success: 'Successfully completed!',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call toast.promise with the correct arguments', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue('Data successfully fetched');

    await summonToast(mockAsyncFunction, mockParams, mockText);

    expect(toast.promise).toHaveBeenCalledTimes(1);

    const [promise, options] = (toast.promise as jest.Mock).mock.calls[0];

    expect(promise).toBeInstanceOf(Promise);
    expect(mockAsyncFunction).toHaveBeenCalledWith(...mockParams);
    expect(options.loading).toBe(mockText.loading);
    expect(options.success).toEqual(<b>{mockText.success}</b>);
    expect(options.error).toEqual(<b>Something went wrong...</b>);
  });

  test('should correctly handle successful execution of the async function', async () => {
    const mockAsyncFunction = jest.fn().mockResolvedValue('Data successfully fetched');

    const result = await summonToast(mockAsyncFunction, mockParams, mockText);

    expect(result).toBe('Data successfully fetched');
  });

  test('should reject with error when async function fails', async () => {
    const errorMessage = 'Error fetching data';
    const mockAsyncFunction = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(summonToast(mockAsyncFunction, mockParams, mockText)).rejects.toThrow(errorMessage);

    expect(toast.promise).toHaveBeenCalledTimes(1);
  });
});
