import { View, Text, ActivityIndicator } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import WorkoutCard from "./WorkoutCard";

interface Episode {
    name: string;
    duration: number;
    thumbnail: string;
}

interface CustomBottomSheetProps {
    episodes: Episode[];
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(({ episodes }, ref) => {
    if (!episodes || episodes.length === 0)
        return (
            <ActivityIndicator
                size='large'
                color='#0000ff'
            />
        );
    console.log(episodes[0].duration);

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={["65%"]}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: "#131619" }}
            handleStyle={{ borderTopStartRadius: 20, borderTopEndRadius: 20 }}
            handleIndicatorStyle={{ backgroundColor: "#FFF" }}>
            <BottomSheetView>
                <Text className='font-manrope-semibold text-xl text-primary text-center pb-2.5'>More Episodes</Text>
            </BottomSheetView>
            <BottomSheetScrollView className='flex-1 px-8 pt-2.5 bg-secondary-600'>
                <View className='flex flex-col gap-3 items-center justify-center pb-10'>
                    {episodes.map((episode, key) => (
                        <WorkoutCard
                            key={key}
                            title={episode.name}
                            time={episode.duration * 60 * 1000}
                            completed={false}
                            thumbnail={episode.thumbnail}
                        />
                    ))}
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
});

export default CustomBottomSheet;
