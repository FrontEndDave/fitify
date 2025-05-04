// components/auth/LoginForm.tsx
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// Typy dla formularza
export interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormProps {
    control: Control<LoginFormData>;
    handleSubmit: ReturnType<typeof useForm<LoginFormData>>["handleSubmit"];
    onSubmit: (data: LoginFormData) => void;
    errors: FieldErrors<LoginFormData>;
}

const LoginForm = ({ control, handleSubmit, onSubmit, errors }: LoginFormProps) => {
    return (
        <View className='p-8 flex flex-col gap-6'>
            <View>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder={"Enter email"}
                            keyboardType='email-address'
                            className='border-[1.8px] border-secondary-200 rounded-full w-full px-6 font-manrope-medium text-lg h-[60px] text-secondary-500'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='email'
                />
                {errors.email && <Text className='text-error-500 pt-2'>{"*To pole jest wymagane"}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 40,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry={true}
                            keyboardType='default'
                            className='border-[1.8px] border-secondary-200 rounded-full w-full h-[60px] px-6 font-manrope-medium text-lg text-secondary-500'
                            placeholder={"Enter password"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='password'
                />
            </View>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className='rounded-full bg-success-400 w-full py-4 px-6 fixed bottom-0 z-50'>
                <Text className='font-semibold text-xl text-primary text-center leading-8'>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
