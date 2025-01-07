import {useNavigation} from "expo-router";
import {PropsWithChildren, useEffect} from "react";
import {WihResponse} from "@/helper/WihApi";
import WihView from "@/components/WihView";
import {WihText} from "@/components/WihText";
import {WihButton} from "@/components/input/WihButton";
import {usePermission} from "@/hooks/usePermission";
import {EventModelBase} from "@/constants/WihTypes/Event/BaseTypes";
import {useTranslation} from "react-i18next";
import Labels from "@/constants/locales/Labels";

interface EventViewLayoutProps {
    response: WihResponse<EventModelBase | null> | null;
    onEdit: () => void;
}

export default function EventViewLayout({response, onEdit, children}: PropsWithChildren<EventViewLayoutProps>) {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const permissionCheck = usePermission();

    useEffect(() => {
        if (!response) {
            navigation.setOptions({title: "Loading..."});
            return;
        }
        if (response.hasError) {
            navigation.setOptions({title: "Error"});
            return;
        }
        navigation.setOptions({title: response.response?.title ?? "Untitled Event"});
    }, [response]);

    if (!response) {
        return null;
    }

    if (response.hasError) {
        return (
            <WihView center="full">
                <WihText>{t(Labels.errors.generic)}</WihText>
            </WihView>
        )
    }

    return (
        <WihView center="full">
            {children}

            {
                permissionCheck(response.response?.userId) ? (
                    <WihView flex="row">
                        <WihButton onPress={onEdit}>{t(Labels.actions.edit)}</WihButton>
                    </WihView>
                ) : null
            }
        </WihView>
    )
}