import type { Meta, StoryObj } from '@storybook/nextjs';
import { ConfirmDialog } from '../ui/ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'App/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    question: 'Are you sure?',
    aprovedFn: () => alert('action'),
  },
  argTypes: {
    question: {
      description: 'Question that is shown in the dialog',
    },
    aprovedFn: {
      description: 'The function that is called when you click on the button',
      control: false,
    },
  },
};

type MyStoryObj = StoryObj<typeof ConfirmDialog>;

export const DefaultActionButton: MyStoryObj = {};

export const DeleteTrackActionButton: MyStoryObj = {
  args: {
    question: 'Are you sure that you wanna delete this track?',
  },
};

export const MultiDeleteActionButton: MyStoryObj = {
  args: {
    question: 'Are you sure that you wanna delete all these tracks?',
  },
};


export default meta;
