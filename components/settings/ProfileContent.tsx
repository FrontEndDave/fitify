import { useUser } from "@/hooks/useUser";
import { updateUsername } from "@/services/firebase/user";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

const ProfileContent = () => {
    const { t } = useTranslation();
    const { user, loading, refreshUser } = useUser();

    const [newUsername, setNewUsername] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.displayName) {
            setNewUsername(user.displayName);
        }
    }, [user]);

    const handleSave = async () => {
        if (!newUsername.trim()) {
            setError(t("errors.usernameRequired"));
            return;
        }

        try {
            const trimmedName = newUsername.trim();

            setIsUpdating(true);
            setError("");

            await updateUsername(trimmedName);
            await refreshUser();
        } catch (err) {
            setError(err.message || t("errors.updateFailed"));
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading || !user) {
        return (
            <View>
                <Text>laduje sie</Text>
            </View>
        );
    }

    return (
        <View className='flex flex-col mt-8 gap-5'>
            <View className='relative'>
                <Text className='absolute left-6 -top-3 z-10 bg-white px-1 text-secondary-300 font-manrope-medium'>{t("profile.username")}</Text>

                <TextInput
                    placeholder={t("profile.username-placeholder")}
                    placeholderTextColor='#ACB5BB'
                    className='border border-secondary-200 rounded-full p-5 pt-4 h-15 font-manrope-medium text-lg text-secondary-500 overflow-hidden'
                    value={newUsername}
                    onChangeText={(text) => {
                        setNewUsername(text);
                        setError("");
                    }}
                    autoCapitalize='none'
                />
            </View>

            {error && <Text className='text-error-400 text-center mt-2'>{error}</Text>}
            <TouchableOpacity
                onPress={handleSave}
                disabled={isUpdating}
                className='bg-success-500 rounded-full h-16 p-4 mt-4 items-center justify-center'>
                {isUpdating ? (
                    <ActivityIndicator
                        size='small'
                        color='#ffffff'
                    />
                ) : (
                    <Text className='text-white font-manrope-bold text-lg'>{t("profile.saveChanges")}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default ProfileContent;
