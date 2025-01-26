import {useLocalSearchParams, useNavigation} from "expo-router";
import WihView from "@/components/WihView";
import {WihText, WihTitle} from "@/components/WihText";
import useWihApi from "@/hooks/wihApi/useWihApi";
import {UserOverview, UserOverviewDto} from "@/constants/WihTypes/WihTypes";
import WihLoading from "@/components/WihLoading";
import WihEventList from "@/components/wihEvent/WihEventList";
import {useEffect} from "react";
import useWihApiFocus from "@/hooks/wihApi/useWihApiFocus";
import {User} from "@/constants/WihTypes/User";
import {Endpoints} from "@/constants/endpoints";
import {useTranslation} from "react-i18next";
import Labels from "@/constants/locales/Labels";
import {WihCollapsible} from "@/components/WihCollapsible";
import {ScrollView, StyleSheet} from "react-native";

const EVENT_COUNT_THRESHOLD = 4;

export default function UserView() {
    const {t} = useTranslation();
    const {id} = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const user = useWihApi<User | null>({
        endpoint: Endpoints.user.withId(id),
        method: "GET",
    });
    const response = useWihApiFocus<UserOverviewDto>({
        endpoint: Endpoints.userOverview.withId(id),
        method: "GET"
    });

    useEffect(() => {
        if (!user) {
            navigation.setOptions({title: t(Labels.headers.unknown)});
            return;
        }
        if (user.hasError) {
            navigation.setOptions({title: t(Labels.errors.header)});
            return;
        }
        navigation.setOptions({title: user.response?.userName});
    }, [user]);

    if (!response || !user) {
        return <WihLoading/>
    }

    if (response.hasError) {
        console.log(response.error);
        return (
            <WihView center="full">
                <WihText>{t(Labels.errors.generic)}</WihText>
            </WihView>
        )
    }

    if (user.hasError || !response.response) {
        console.log(user.error);
        return (
            <WihView center="full">
                <WihText>{t(Labels.errors.generic)}</WihText>
            </WihView>
        )
    }

    const overview = new UserOverview(response.response);
    return (
        <WihView style={styles.container}>
            <ScrollView>
                {/* Event Lists */}
                <WihView style={styles.eventLists}>
                    {/* Today */}
                    {overview.Today.length > 0 && (
                        <WihCollapsible
                            title={t(Labels.sections.today)}
                            isDefaultOpen={overview.Today.length < EVENT_COUNT_THRESHOLD}
                        >
                            <WihEventList events={overview.Today}/>
                        </WihCollapsible>
                    )}

                    {/* This Week */}
                    {overview.ThisWeek.length > 0 && (
                        <WihCollapsible
                            title={t(Labels.sections.thisWeek)}
                            isDefaultOpen={overview.ThisWeek.length < EVENT_COUNT_THRESHOLD}
                        >
                            <WihEventList events={overview.ThisWeek}/>
                        </WihCollapsible>
                    )}

                    {/* Future Events */}
                    {overview.FutureEvents.length > 0 && (
                        <WihCollapsible
                            title={t(Labels.sections.other)}
                            isDefaultOpen={overview.FutureEvents.length < EVENT_COUNT_THRESHOLD}
                        >
                            <WihEventList events={overview.FutureEvents}/>
                        </WihCollapsible>
                    )}
                </WihView>
            </ScrollView>
        </WihView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    eventLists: {
        flex: 1
    }
});