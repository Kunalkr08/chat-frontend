import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBar: {
    height: 52,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#075E54",
    borderBottomWidth: 1,
    borderBottomColor: "#0B7165",
    paddingBottom: 0,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    height: 52,
  },
  tabLabel: { color: "#B7D9D4", fontSize: 13, fontWeight: "700" },
  activeTabLabel: { color: "#FFFFFF" },
});
