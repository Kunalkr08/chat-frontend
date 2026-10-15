import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type DropdownOption = {
  label: string;
  value: string;
  danger?: boolean;
};

type DropdownProps = {
  visible: boolean;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  onClose: () => void;
};

export function Dropdown({
  visible,
  options,
  onSelect,
  onClose,
}: DropdownProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text
                  style={[styles.optionText, item.danger && styles.dangerText]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 16,
  },

  menu: {
    position: "absolute",

    top: 120,
    right: 10,

    width: 180,

    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 6,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  dangerText: {
    color: "#D32F2F",
  },

  optionPressed: {
    backgroundColor: "#F0F2F5",
  },

  optionText: {
    fontSize: 16,
    color: "#111827",
  },
});
