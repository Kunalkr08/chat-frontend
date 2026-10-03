import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type Props = {
  message: string;
  onChangeMessage: (value: string) => void;
  onSend: () => void;
};

export function ChatComposer({ message, onChangeMessage, onSend }: Props) {
  return (
    <View style={styles.composerWrap}>
      <Pressable style={styles.addButton} accessibilityLabel="Add attachment">
        <Text style={styles.addText}>＋</Text>
      </Pressable>
      <TextInput
        value={message}
        onChangeText={onChangeMessage}
        onSubmitEditing={onSend}
        returnKeyType="send"
        placeholder="Message"
        placeholderTextColor="#A6A096"
        style={styles.composerInput}
      />
      <Pressable
        onPress={onSend}
        style={[
          styles.sendButton,
          !message.trim() && styles.sendButtonDisabled,
        ]}
        accessibilityLabel="Send message"
      >
        <Text style={styles.sendText}>↑</Text>
      </Pressable>
    </View>
  );
}
