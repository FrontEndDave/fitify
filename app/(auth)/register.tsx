import AuthHero from "@/components/auth/Hero";
import RegisterForm from "@/components/auth/RegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const createSchema = (t: (key: string) => string) =>
    z
        .object({
            name: z.string().min(2, t("errors.nameTooShort")).max(50, t("errors.nameTooLong")),
            email: z.string().email(t("errors.invalidEmail")),
            password: z.string().min(8, t("errors.passwordTooShort")).regex(/[A-Z]/, t("errors.passwordMissingUppercase")).regex(/[0-9]/, t("errors.passwordMissingNumber")),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("errors.passwordsDontMatch"),
            path: ["confirmPassword"],
        });

export type RegisterFormData = z.infer<ReturnType<typeof createSchema>>;

const Register = () => {
    const { t } = useTranslation();
    const schema = createSchema(t);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            // await registerWithEmail(data.email, data.password, { displayName: data.name });
            router.replace("/");
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                setError("email", { message: t("errors.emailInUse") });
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
                bounces={false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <AuthHero
                    title={t("auth.register.title")}
                    description={t("auth.register.description")}
                />

                <RegisterForm
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                />

                {errors.root && <Text className='text-error-500 text-center mt-4'>{errors.root.message}</Text>}
            </ScrollView>

            <View className='w-full flex-row items-center justify-center py-8'>
                <Text className='font-manrope-medium text-lg text-secondary-400'>{t("auth.alreadyHaveAccount")}</Text>
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/login")}
                    activeOpacity={0.7}>
                    <Text className='font-manrope-bold text-lg text-information-400 ml-1'>{t("auth.login.title")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Register;
