import AuthHero from "@/components/auth/Hero";
import LoginForm, { LoginFormData } from "@/components/auth/LoginForm";
import { auth } from "@/services/firebase/config";
import { initializeUser } from "@/services/firebase/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";

const Login = () => {
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
            console.log("User logged in successfully");

            const user = auth.currentUser;

            console.log("User data:", user);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            className='bg-background'
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <AuthHero />
            <LoginForm
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
            />
        </ScrollView>
    );
};

export default Login;
