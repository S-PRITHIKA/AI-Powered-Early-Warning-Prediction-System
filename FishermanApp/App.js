import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SMS from "expo-sms";

export default function App() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const sendSMS = async () => {
    if (!recipient || !message) {
      Alert.alert("Error", "Please enter recipient number and message.");
      return;
    }

    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync([recipient], message);
        Alert.alert("SMS Status", result);

        if (result === "sent") {
          setHistory([{ recipient, message }, ...history]);
          setMessage(""); // clear message after sending
        }
      } else {
        Alert.alert("SMS Not Available", "Your device does not support sending SMS.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.header}>📨 SMS</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Recipient Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={recipient}
          onChangeText={setRecipient}
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendSMS}>
          <Text style={styles.buttonText}>Send SMS</Text>
        </TouchableOpacity>
      </View>

      {history.length > 0 && (
        <View style={styles.historyCard}>
          <Text style={styles.historyHeader}>Recent Messages</Text>
          <FlatList
            data={history}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyRecipient}>{item.recipient}</Text>
                <Text style={styles.historyMessage}>{item.message}</Text>
              </View>
            )}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  historyCard: {
    marginTop: 30,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  historyHeader: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  historyItem: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  historyRecipient: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 14,
  },
  historyMessage: {
    color: "#fff",
    fontSize: 14,
  },
});
