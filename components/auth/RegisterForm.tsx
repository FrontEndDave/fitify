import { RegisterFormData } from "@/app/(auth)/register";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface RegisterFormProps {
    control: Control<RegisterFormData>;
    handleSubmit: ReturnType<any>;
    onSubmit: (data: RegisterFormData) => void;
    errors: FieldErrors<RegisterFormData>;
    isSubmitting: boolean;
}

const RegisterForm = ({ control, handleSubmit, onSubmit, errors, isSubmitting }: RegisterFormProps) => {
    const { t } = useTranslation();

    const renderError = (field: keyof RegisterFormData) => {
        if (!errors[field]) return null;
        return <Text className='text-error-500 mt-1'>{errors[field]?.message as string}</Text>;
    };

    return (
        <View className='p-8 mt-5 flex-col gap-6 w-full'>
            <View className='relative'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.register.full-name")}</Text>
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={t("auth.register.full-name-placeholder")}
                            placeholderTextColor='#ACB5BB'
                            className='border border-secondary-200 rounded-full p-5 h-15 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {renderError("name")}
            </View>

            <View className='relative'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.register.email")}</Text>
                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={t("auth.register.email-placeholder")}
                            keyboardType='email-address'
                            placeholderTextColor='#ACB5BB'
                            className='border border-secondary-200 rounded-full p-5 h-15 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize='none'
                        />
                    )}
                />
                {renderError("email")}
            </View>

            <View className='relative'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.register.password")}</Text>
                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry
                            placeholder={t("auth.register.password-placeholder")}
                            placeholderTextColor='#ACB5BB'
                            className='border border-secondary-200 rounded-full p-5 h-15 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {renderError("password")}
            </View>

            <View className='relative'>
                <Text className='absolute left-6 -top-2 z-10 bg-background px-1 text-secondary-300 font-manrope-medium'>{t("auth.register.confirm-password")}</Text>
                <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry
                            placeholder={t("auth.register.confirm-password-placeholder")}
                            placeholderTextColor='#ACB5BB'
                            className='border border-secondary-200 rounded-full p-5  h-15 font-manrope-medium text-lg text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {renderError("confirmPassword")}
            </View>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className={`rounded-full w-full py-4 ${isSubmitting ? "bg-success-200" : "bg-success-400"}`}>
                {isSubmitting ? (
                    <ActivityIndicator
                        size='small'
                        color='#fff'
                    />
                ) : (
                    <Text className='text-center font-semibold text-xl text-primary'>{t("auth.register.button")}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default RegisterForm;
