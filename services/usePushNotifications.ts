import { useState, useEffect, useRef } from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    async function registerForPushNotificationsAsync() {
        let token;

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                console.log("Failed to get push token for push notification!");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.projectId,
            });

            return token;
        } else {
            console.log("Must use physical device for Push Notifications");
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current!);
            Notifications.removeNotificationSubscription(responseListener.current!);
        };
    }, []);

    return { expoPushToken, notification };
};
