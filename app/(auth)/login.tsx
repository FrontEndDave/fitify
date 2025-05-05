import AuthHero from "@/components/auth/Hero";
import LoginForm, { LoginFormData } from "@/components/auth/LoginForm";
import { initializeUser } from "@/services/firebase/user";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);
            initializeUser(data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            edges={["left", "right"]}
            className='bg-background flex-1 w-full'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <AuthHero
                    title={t("auth.login.title")}
                    description={t("auth.login.description")}
                />
                <LoginForm
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                />
            </ScrollView>
            <View className='w-full flex flex-row gap-1 items-center justify-center bottom-[30px] fixed'>
                <Text className='font-manrope-medium text-lg text-secondary-400'>Dont’t have an account?</Text>
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/register")}
                    activeOpacity={0.7}>
                    <Text className='font-manrope-bold text-lg text-information-400'>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;
