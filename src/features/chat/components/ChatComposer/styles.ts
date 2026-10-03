import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  composerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: "#F0F2F5",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  addText: { color: "#54656F", fontSize: 24, fontWeight: "300", marginTop: -2 },
  composerInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    minHeight: 42,
    maxHeight: 100,
    paddingHorizontal: 16,
    color: "#111B21",
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00A884",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  sendButtonDisabled: { backgroundColor: "#AEB8BE" },
  sendText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: -3,
  },
});
