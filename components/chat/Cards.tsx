import { FlatList, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

const data = [
    {
        title: "chat.workout",
        description: "chat.workout_description",
        icon: "💪",
    },
    {
        title: "chat.nutrition",
        description: "chat.nutrition_description",
        icon: "🥗",
    },
    {
        title: "chat.progress",
        description: "chat.progress_description",
        icon: "📈",
    },
    {
        title: "chat.exercise_tutorials",
        description: "chat.exercise_tutorials_description",
        icon: "🏋️",
    },
];

export default function Cards() {
    const { t } = useTranslation();

    const renderItem = ({ item }) => (
        <View className='justify-start items-start rounded-3xl h-[160px] w-[49%] mb-2 p-6 bg-white'>
            <Text className='text-3xl mb-2'>{item.icon}</Text>
            <Text className='text-lg font-bold text-start mb-1'>{t(item.title)}</Text>
            <Text className='text-sm text-start text-gray-600'>{t(item.description)}</Text>
        </View>
    );

    return (
        <View className='flex-1 p-7'>
            <FlatList
                scrollEnabled={false}
                data={data}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
