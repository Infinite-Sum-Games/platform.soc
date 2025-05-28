import type { Meta, StoryObj } from '@storybook/react';
import LogTable from './Logtable';

const meta: Meta<typeof LogTable> = {
  title: 'Components/LogTable',
  component: LogTable,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LogTable>;

export const Default: Story = {
  render: () => (
    <div className="fixed flex h-screen w-screen items-center justify-center overflow-hidden bg-linear-to-br from-yellow-100 via-sky-100 to-teal-100">
      <div className="h-full w-1/2 overflow-auto p-4">
        <LogTable />
      </div>
    </div>
  ),
};
