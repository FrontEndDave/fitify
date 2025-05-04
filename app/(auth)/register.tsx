import InfoContent from "@/components/settings/InfoContent";
import { ScrollView } from "react-native";

const Register = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <InfoContent />
        </ScrollView>
    );
};

export default Register;
