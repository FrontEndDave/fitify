import DetailsHero from "@/components/common/DetailsHero";
import LanguageContent from "@/components/settings/LanguageContent";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

export default function LanguageSettings() {
    const { t } = useTranslation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            <DetailsHero text={t("language.subtitle")} />
            <LanguageContent />
        </ScrollView>
    );
}
