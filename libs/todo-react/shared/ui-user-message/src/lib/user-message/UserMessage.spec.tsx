import {act, render} from '@testing-library/react';

import UserMessage from './UserMessage';

describe('UserMessage', () => {
  const onTimerEnd = jest.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<UserMessage color={'success'} onTimerEnd={onTimerEnd} />);
    expect(baseElement).toBeTruthy();
  });

  it('triggers onTimerEnd after 5 seconds', () => {
    jest.useFakeTimers();

    const { unmount } = render(
      <UserMessage onTimerEnd={onTimerEnd} color="default" />
    );

    act(() => {
      jest.advanceTimersByTime(5100);
    });

    expect(onTimerEnd).toHaveBeenCalled();

    unmount();
  });
});
