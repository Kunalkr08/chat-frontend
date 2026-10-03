import type { User } from "../../auth/auth.types";
import type { Conversation } from "../data/chat-data";

const avatarColors = ["#00897B", "#D66B37", "#5374B8", "#8B6AAE", "#548A50"];

export function toConversation(user: User): Conversation {
  const nameParts = user.name.trim().split(/\s+/).filter(Boolean);
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const colorIndex =
    Array.from(user.id).reduce(
      (value, character) => value + character.charCodeAt(0),
      0,
    ) % avatarColors.length;

  return {
    id: user.id,
    name: user.name,
    initials: initials || user.email.slice(0, 1).toUpperCase(),
    color: avatarColors[colorIndex],
    preview: user.email,
    time: "",
  };
}

export function filterConversations(
  conversations: Conversation[],
  search: string,
  activeFilter: string,
) {
  const normalizedSearch = search.trim().toLowerCase();

  return conversations.filter((conversation) => {
    const matchesSearch = conversation.name
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && Boolean(conversation.unread)) ||
      (activeFilter === "Groups" && conversation.label === "Group");

    return matchesSearch && matchesFilter;
  });
}
