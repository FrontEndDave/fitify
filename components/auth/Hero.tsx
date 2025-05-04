import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

const AuthHero = () => {
    const { t } = useTranslation();

    return (
        <View className='w-full h-[280px] bg-black rounded-b-[32px] overflow-hidden relative'>
            <Image
                source={require("@/assets/images/auth.png")}
                className='absolute z-0'
                style={{
                    width: "130%",
                    height: "180%",
                }}
                resizeMode='cover'
            />

            <View className='p-[30px] flex justify-end items-start h-full flex-col gap-2 z-50 relative'>
                <Text className='text-white font-manrope-semibold text-5xl leading-[1] z-50'>Sign in to your Account</Text>
                <Text className='text-secondary-200 font-manrope-medium text-xl leading-[1.1] z-50'>Sign in to your Account</Text>
            </View>
        </View>
    );
};

export default AuthHero;
