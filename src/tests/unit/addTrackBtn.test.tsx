import React from 'react';
import AddTrackBtn from '@/components/ui/AddTrackBtn';
import useModalStore from '@/store/modalStore';
import useSelectedStore from '@/store/selectedStore';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/store/modalStore');
jest.mock('@/store/selectedStore');

const mockedUseModalStore = useModalStore as jest.MockedFunction<
  typeof useModalStore
>;
const mockedUseSelectedStore = useSelectedStore as jest.MockedFunction<
  typeof useSelectedStore
>;

const openModalMock = jest.fn();
const setAbleSelectMock = jest.fn();

mockedUseModalStore.mockReturnValue(openModalMock);
mockedUseSelectedStore.mockReturnValue(setAbleSelectMock);

describe('AddTrackBtn', () => {
  test('renders the "Create Track" button', () => {
    render(<AddTrackBtn />);
    const createTrackButton = screen.getByTestId('create-track-button');
    expect(createTrackButton).not.toBeNull();
    expect(createTrackButton.textContent).toBe('Create Track');
  });

  test('calls openModal("create") and setAbleSelect(false) when the button is clicked', () => {
    render(<AddTrackBtn />);
    const createTrackButton = screen.getByTestId('create-track-button');

    fireEvent.click(createTrackButton);

    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledWith('create');

    expect(setAbleSelectMock).toHaveBeenCalledTimes(1);
    expect(setAbleSelectMock).toHaveBeenCalledWith(false);
  });
});
