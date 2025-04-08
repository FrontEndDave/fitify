import { Platform } from "react-native";
import { getApps, initializeApp } from "firebase/app";
import * as Device from "expo-device";
//@ts-ignore
import { initializeAuth, getReactNativePersistence, connectAuthEmulator } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectDatabaseEmulator, enableLogging, getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCTChmI02op57hk0asCAY4MXxdqnjGXSa4",
    authDomain: "fitapp-e4fe2.firebaseapp.com",
    databaseURL: "https://fitapp-e4fe2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitapp-e4fe2",
    storageBucket: "fitapp-e4fe2.firebasestorage.app",
    messagingSenderId: "981660846876",
    appId: "1:981660846876:web:d4bc9486452849a37108d9",
    measurementId: "G-XH49R13361",
};

function isDevMode() {
    return __DEV__;
}

function isSimulator() {
    return !Device.isDevice;
}

function detectPlatform() {
    isDevMode();
    if (isSimulator()) {
        switch (Platform.OS) {
            case "android":
                return "android-simulator";
            default:
                return "ios-simulator";
        }
    } else {
        switch (Platform.OS) {
            case "android":
                return "android-device";
            default:
                return "ios-device";
        }
    }
}

const FIREBASE_APP = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const FIREBASE_DATABASE = getDatabase(FIREBASE_APP, "https://fitapp-e4fe2-default-rtdb.europe-west1.firebasedatabase.app/");

let emulatorHost = "";

async function getEmulatorHost(): Promise<string> {
    const platform = await detectPlatform();
    console.log("Setting emulatorHost to", platform);
    switch (platform) {
        case "ios-device":
            emulatorHost = location.hostname;
            break;
        case "ios-simulator":
            emulatorHost = "127.0.0.1";
            break;
        default:
            emulatorHost = "localhost";
            break;
    }
    console.log("emulatorHost:", emulatorHost);
    return emulatorHost;
}

async function initializeEmulators() {
    try {
        await getEmulatorHost();

        if (FIREBASE_AUTH) {
            connectAuthEmulator(FIREBASE_AUTH, `http://${emulatorHost}:9099`);
            console.log(`Connected to Auth Emulator at http://${emulatorHost}:9099`);
        } else {
            console.error("FIREBASE_AUTH is not initialized");
        }

        connectDatabaseEmulator(FIREBASE_DATABASE, emulatorHost, 9000);
        console.log(`Connected to Database Emulator at http://${emulatorHost}:9000`);
    } catch (error) {
        console.error("Error initializing emulators:", error);
    }
}

if (isSimulator()) {
    initializeEmulators();
} else {
    enableLogging(false);
}

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE };
