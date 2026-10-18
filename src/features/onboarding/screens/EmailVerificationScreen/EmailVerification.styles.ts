import { StyleSheet } from "react-native"; 

const GREEN = "#25D366";
const DARK_GREEN = "#075E54";
const TEXT = "#111B21";
const MUTED = "#667781";
const LIGHT_GREEN = "#E7F8ED";
const BACKGROUND = "#F7F9FA";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 24,
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  brandIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  brandIconText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  brandName: {
    fontSize: 23,
    fontWeight: "800",
    color: DARK_GREEN,
    letterSpacing: -0.5,
  },

  illustrationContainer: {
    alignItems: "center",
    marginTop: 42,
    marginBottom: 28,
  },

  illustrationCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  envelopeIcon: {
    fontSize: 52,
    color: DARK_GREEN,
  },

  checkBadge: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GREEN,
    borderWidth: 3,
    borderColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },

  checkBadgeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: TEXT,
    textAlign: "center",
    letterSpacing: -0.6,
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: MUTED,
    textAlign: "center",
  },

  email: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: DARK_GREEN,
    textAlign: "center",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginTop: 34,
  },

  otpInput: {
    width: 56,
    height: 62,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DCE3E6",
    backgroundColor: "#FFFFFF",
    color: TEXT,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    padding: 0,
  },

  otpInputFilled: {
    borderColor: GREEN,
    backgroundColor: "#F0FFF5",
  },

  helperText: {
    marginTop: 16,
    fontSize: 13,
    lineHeight: 20,
    color: MUTED,
    textAlign: "center",
  },

  errorText: {
    marginTop: 12,
    color: "#D93025",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },

  verifyButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: DARK_GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  verifyButtonDisabled: {
    backgroundColor: "#A7C9BE",
  },

  verifyButtonPressed: {
    opacity: 0.85,
  },

  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 24,
    gap: 3,
  },

  resendText: {
    color: MUTED,
    fontSize: 13,
  },

  resendButton: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
  },

  footer: {
    marginTop: 42,
    alignItems: "center",
  },

  footerLine: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDE5E7",
    marginBottom: 14,
  },

  footerText: {
    color: MUTED,
    fontSize: 11,
    textAlign: "center",
  },

  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  successIcon: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  successCheck: {
    color: DARK_GREEN,
    fontSize: 48,
    fontWeight: "700",
  },

  successTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
  },

  successDescription: {
    marginTop: 12,
    color: MUTED,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  successLoader: {
    marginTop: 28,
  },
});
