import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as SMS from "expo-sms";

export default function App() {
  // Function to send SMS
  const sendSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();

      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          ["+919940555923"], // Replace with the recipient number
          "Hello from Expo!" // Your message
        );

        Alert.alert("SMS Status", result); // result: 'sent', 'cancelled', etc.
      } else {
        Alert.alert(
          "SMS Not Available",
          "Your device does not support sending SMS."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Hello Expo App!</Text>
      <Button title="Click Me" onPress={() => Alert.alert("Hello!")} />
      <View style={{ marginTop: 20 }}>
        <Button title="Send SMS" onPress={sendSMS} />
      </View>
    </View>
  );
}
