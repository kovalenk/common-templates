import type { Meta, StoryObj } from "@storybook/vue3";
import CustomToolTipPage from "../stories/CustomToolTipPage.vue";
import { Positions } from "../constants/positions";

const meta: Meta<typeof CustomToolTipPage> = {
  title: "Common/Tooltip",
  component: CustomToolTipPage,
  tags: ["autodocs"],
  argTypes: {
    isClick: {
      description: "Whether the tooltip should appear on click.",
    },
    position: {
      description: Object.values(Positions).join(", "),
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A custom tooltip component.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomToolTipPage>;
export const Primary: Story = {};
