import DetailsHero from "@/components/common/DetailsHero";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <DetailsHero text={t("profile.subtitle")} />
        </ScrollView>
    );
};

export default Profile;
