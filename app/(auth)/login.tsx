import AuthHero from "@/components/auth/Hero";
import LoginForm from "@/components/auth/LoginForm";
import { useUser } from "@/hooks/useUser";
import { loginUser } from "@/services/firebase/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const createSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().email(t("errors.invalidEmail")),
        password: z.string().min(8, t("errors.passwordTooShort")),
    });

export type LoginFormData = z.infer<ReturnType<typeof createSchema>>;

const Login = () => {
    const { t } = useTranslation();
    const { refreshUser } = useUser();
    const schema = createSchema(t);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await loginUser({ email: data.email.toLowerCase(), password: data.password });
            router.replace("/(tabs)");
        } catch (err: any) {
            if (err === "INVALID_LOGIN_CREDENTIALS") {
                setError("password", { message: t("errors.invalidCredentials") });
            } else {
                setError("root", { message: t("errors.serverError") });
            }
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
                    isSubmitting={isSubmitting}
                />
            </ScrollView>
            <View className='w-full flex flex-row gap-1 items-center justify-center bottom-[30px] fixed'>
                <Text className='font-manrope-medium text-lg text-secondary-400'>{t("auth.dontHaveAccount")}</Text>
                <TouchableOpacity
                    disabled={isSubmitting}
                    onPress={() => router.push("/(auth)/register")}
                    activeOpacity={0.7}>
                    <Text className='font-manrope-bold text-lg text-information-400'>{t("auth.register.title")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;
