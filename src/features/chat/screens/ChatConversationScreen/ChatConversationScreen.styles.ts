import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#075E54" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  messageScroll: { flex: 1 },
  messageContent: {
    backgroundColor: "#EFEAE2",
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 20,
    flexGrow: 1,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#075E54",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  backButton: {
    minWidth: 36,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backText: { color: "#FFFFFF", fontSize: 34, lineHeight: 34 },
  backLabel: { color: "#FFFFFF", fontSize: 15 },
  chatAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  avatarText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  chatHeaderCopy: { flex: 1 },
  chatName: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  chatStatus: { color: "#D7F4EF", fontSize: 12, marginTop: 2 },
  chatAction: { width: 24, height: 24, marginHorizontal: 7 },
  emptyState: { color: "#667781", textAlign: "center", padding: 30 },
});
