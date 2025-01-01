import { View, Text } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const CustomBottomSheet = forwardRef<BottomSheet>((_, ref) => {
    return (
        <View>
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={["50%", "90%"]}
                enablePanDownToClose={true}>
                <BottomSheetView style={{ flex: 1, padding: 36, alignItems: "center" }}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
});

export default CustomBottomSheet;
