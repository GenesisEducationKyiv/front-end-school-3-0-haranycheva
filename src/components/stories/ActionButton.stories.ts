import { ActionButton } from '../ui/trackCard/ActionButton';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ActionButton> = {
  title: 'TrackCard/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: {
    id: '1',
    actionOnClick: () => alert('action'),
  },
  argTypes: {
    id: {
      control: false,
      table: { disable: true },
    },

    iconName: {
      control: 'select',
      options: ['none', 'delete', 'edit', 'upload'],
      mapping: {
        none: undefined,
        Delete: 'delete',
        Edit: 'edit',
        Upload: 'upload',
      },
    },
  },
};

type MyStoryObj = StoryObj<typeof ActionButton>;

export const DefaultActionButton: MyStoryObj = {};

export const UploadActionButton: MyStoryObj = {
  args: {
    iconName: 'upload',
  },
};

export const DeleteActionButton: MyStoryObj = {
  args: {
    iconName: 'delete',
  },
};
export const EditActionButton: MyStoryObj = {
  args: {
    iconName: 'edit',
  },
};

export default meta;
