
import { summonToast } from '@/helpers/summonToast';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  promise: jest.fn(),
}));

describe('summonToast', () => {
  const mockAsyncFunction = jest.fn();
  const mockParams = ['param1', 'param2'];
  const mockText = {
    loading: 'Loading...',
    success: 'Successfully completed!',
  };

  test('should call toast.promise with the correct arguments', async () => {
    mockAsyncFunction.mockResolvedValue('Data successfully fetched');
    await summonToast(mockAsyncFunction, mockParams, mockText);

    expect(toast.promise).toHaveBeenCalledTimes(1);

    const [promise, options] = (toast.promise as jest.Mock).mock.calls[0];

    expect(promise).toBeInstanceOf(Promise);

    expect(mockAsyncFunction).toHaveBeenCalledWith(...mockParams);

    expect(options.loading).toBe(mockText.loading);
    expect(options.success).toEqual(<b>{mockText.success}</b>);
    expect(options.error).toEqual(<b>Something went wrong...</b>);
  });

});