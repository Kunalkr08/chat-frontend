import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Only handles the TOP safe area.
  // Bottom is intentionally excluded.
  safeArea: {
    flex: 1,
    backgroundColor: "#075E54",
  },

  // This makes the area below the header white.
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#075E54",
  },

  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 4,
  },

  content: {
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 28,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  cameraButton: {
    position: "absolute",
    right: "38%",
    bottom: 84,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#00A884",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  name: {
    marginTop: 18,
    fontSize: 23,
    fontWeight: "600",
    color: "#111B21",
  },

  username: {
    marginTop: 4,
    fontSize: 15,
    color: "#667781",
  },

  section: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 14,
    color: "#008069",
    fontWeight: "500",
    marginBottom: 6,
  },

  infoRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },

  infoContent: {
    flex: 1,
  },

  infoText: {
    fontSize: 16,
    color: "#111B21",
  },

  infoLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#667781",
  },

  actions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  actionRow: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  actionText: {
    fontSize: 16,
    color: "#111B21",
  },
});
