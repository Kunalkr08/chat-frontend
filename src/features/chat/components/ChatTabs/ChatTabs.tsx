import { Pressable, Text, View } from "react-native";
import { tabs } from "../../data/chat-data";
import { styles } from "./ChatTabs.styles";

type Props = { activeTab: string; onChangeTab: (tab: string) => void };

export function ChatTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.label}
          onPress={() => onChangeTab(tab.label)}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.label && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
