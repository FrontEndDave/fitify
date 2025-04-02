import DetailsHero from "@/components/common/DetailsHero";
import InfoContent from "@/components/settings/InfoContent";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

const info = () => {
    const { t } = useTranslation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <DetailsHero text={t("info.title")} />
            <InfoContent />
        </ScrollView>
    );
};

export default info;
