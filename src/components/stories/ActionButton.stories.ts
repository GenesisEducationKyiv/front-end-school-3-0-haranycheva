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
      description: 'Id of the card'
    },
    actionOnClick: {
      description: 'The function that is called when you click on the button',
      control: false,
    },
    iconName: {
      control: 'select',
      options: ['none', 'delete', 'edit', 'upload'],
      mapping: {
        none: undefined,
        delete: 'delete',
        edit: 'edit',
        upload: 'upload',
      },
      description: "Type of icon that is showed"
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
