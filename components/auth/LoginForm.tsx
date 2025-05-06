import { LoginFormData } from "@/app/(auth)/login";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface LoginFormProps {
    control: Control<LoginFormData>;
    handleSubmit: ReturnType<any>;
    onSubmit: (data: LoginFormData) => void;
    errors: FieldErrors<LoginFormData>;
    isSubmitting: boolean;
}

const LoginForm = ({ control, handleSubmit, onSubmit, errors, isSubmitting }: LoginFormProps) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className='p-8 mt-5 flex-col gap-6 w-full'>
            <View className='relative'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.login.email")}</Text>
                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={t("auth.login.email-placeholder")}
                            placeholderTextColor='#ACB5BB'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            className='border border-secondary-200 rounded-full px-6 py-5 h-15 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text className='text-error-500 mt-1'>{errors.email.message as string}</Text>}
            </View>

            <View className='relative h-16'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.login.password")}</Text>
                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder={t("auth.login.password-placeholder")}
                            placeholderTextColor='#ACB5BB'
                            autoCapitalize='none'
                            className='border border-secondary-200 rounded-full px-6  h-16 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <TouchableOpacity
                    onPress={() => setShowPassword((v) => !v)}
                    className='absolute right-6 top-1/2 transform -translate-y-1/2'
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <MaterialCommunityIcons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color='#666'
                    />
                </TouchableOpacity>

                {errors.password && <Text className='text-error-500 mt-1'>{errors.password.message as string}</Text>}
            </View>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className={`rounded-full w-full mt-8 py-4 ${isSubmitting ? "bg-success-200" : "bg-success-400"}`}>
                {isSubmitting ? (
                    <ActivityIndicator
                        size='small'
                        color='#fff'
                    />
                ) : (
                    <Text className='text-center font-semibold text-xl text-primary'>{t("auth.login.button")}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
