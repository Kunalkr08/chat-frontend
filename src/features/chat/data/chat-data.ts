export type Conversation = {
  id: string;
  name: string;
  initials: string;
  color: string;
  preview: string;
  time: string;
  unread?: number;
  online?: boolean;
  label?: string;
};

export const filters = ["All", "Unread", "Groups"];
export const tabs = [
  { label: "Chats", icon: "" },
  { label: "Updates", icon: "" },
  { label: "Calls", icon: "" },
];
