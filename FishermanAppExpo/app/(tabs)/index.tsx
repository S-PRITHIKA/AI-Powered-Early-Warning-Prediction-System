import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  Vibration,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// ------------------- Notification Handler -------------------
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationHandlerResponse> => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ------------------- Types -------------------
type Alert = {
  id: string;
  message: string;
  time: string;
  type: "danger" | "warning" | "info";
  expiresAt?: number;
};

// ------------------- Push Notification Setup -------------------
const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    console.log("Push notifications not supported on web.");
    return null;
  }

  if (!Device.isDevice) {
    alert("Must use a physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token!");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  // Android channel setup
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

// ------------------- Main App Component -------------------
export default function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const bannerAnim = useRef(new Animated.Value(-100)).current;
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [bannerType, setBannerType] = useState<"danger" | "warning" | "info">("info");

  // Load stored alerts
  useEffect(() => {
    const loadAlerts = async () => {
      const stored = await AsyncStorage.getItem("alerts");
      if (stored) {
        const saved: Alert[] = JSON.parse(stored);
        const now = Date.now();
        const valid = saved.filter(a => !a.expiresAt || a.expiresAt > now);
        setAlerts(valid);
      }
    };
    loadAlerts();
  }, []);

  // Register notifications & listener
  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        const msg = notification.request.content.body || "⚠️ New Alert!";
        triggerAlert(msg, "danger");
      }
    );

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  // Add alert
  const addAlert = async (message: string, type: "danger" | "warning" | "info") => {
    const expiresAt = Date.now() + 3 * 60 * 60 * 1000; // 3 hours
    const newAlert: Alert = {
      id: Date.now().toString(),
      message,
      time: new Date().toLocaleTimeString(),
      type,
      expiresAt,
    };
    const updatedAlerts = [newAlert, ...alerts];
    setAlerts(updatedAlerts);
    await AsyncStorage.setItem("alerts", JSON.stringify(updatedAlerts));
    showBanner(message, type);
    sendSMSFallback(newAlert);
  };

  // Trigger alert manually
  const triggerAlert = (message: string, type: "danger" | "warning" | "info") => {
    addAlert(message, type);
    Vibration.vibrate([500, 500, 500]);
  };

  // Show banner
  const showBanner = (message: string, type: "danger" | "warning" | "info") => {
    setBannerMessage(message);
    setBannerType(type);
    Animated.sequence([
      Animated.timing(bannerAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(bannerAnim, {
        toValue: -100,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setBannerMessage(null));
  };

  // SMS fallback (mock)
  const sendSMSFallback = (alert: Alert) => {
    console.log("[SMS Fallback]", alert.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Fisherman Alerts</Text>

      <Button
        title="Test Danger Alert"
        color="#d00000"
        onPress={() => triggerAlert("🌊 Cyclone Warning! Return to shore.", "danger")}
      />
      <Button
        title="Test Warning Alert"
        color="#f48c06"
        onPress={() => triggerAlert("⚠️ Rough sea expected in Zone 2.", "warning")}
      />
      <Button
        title="Test Info Alert"
        color="#0077b6"
        onPress={() => triggerAlert("ℹ️ Weather is clear in Zone 1.", "info")}
      />
      <Button
        title="Test Local Notification"
        color="#023e8a"
        onPress={async () => {
          await Notifications.scheduleNotificationAsync({
            content: { title: "Test Notification", body: "This should appear on your phone!" },
            trigger: { seconds: 5 },
          });
        }}
      />

      {bannerMessage && (
        <Animated.View
          style={[
            styles.banner,
            bannerType === "danger"
              ? styles.danger
              : bannerType === "warning"
              ? styles.warning
              : styles.info,
            { transform: [{ translateY: bannerAnim }] },
          ]}
        >
          <Text style={styles.bannerText}>{bannerMessage}</Text>
        </Animated.View>
      )}

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.alertCard,
              item.type === "danger"
                ? styles.danger
                : item.type === "warning"
                ? styles.warning
                : styles.info,
            ]}
          >
            <Text style={styles.alertMessage}>{item.message}</Text>
            <Text style={styles.alertTime}>{item.time}</Text>
          </View>
        )}
        style={{ marginTop: 20, width: "100%" }}
      />
    </View>
  );
}

// ------------------- Styles -------------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f0f8ff" },
  title: { fontSize: 26, fontWeight: "bold", color: "#023e8a", marginBottom: 20, textAlign: "center" },
  alertCard: { padding: 15, borderRadius: 10, marginBottom: 12, borderLeftWidth: 6 },
  danger: { backgroundColor: "#ffdddd", borderLeftColor: "#d00000" },
  warning: { backgroundColor: "#fff3cd", borderLeftColor: "#f48c06" },
  info: { backgroundColor: "#d1ecf1", borderLeftColor: "#0077b6" },
  alertMessage: { fontSize: 18, fontWeight: "600" },
  alertTime: { fontSize: 14, color: "#555", marginTop: 5 },
  banner: { position: "absolute", top: 0, left: 0, right: 0, padding: 15, zIndex: 10 },
  bannerText: { fontSize: 16, fontWeight: "bold", color: "#000" },
});
