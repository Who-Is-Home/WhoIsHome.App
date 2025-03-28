import {IonIcon, WihMaterialIcon} from '@/components/WihComponents/icon/WihIcon';
import {useRouter, Tabs} from "expo-router";
import React, {useEffect} from "react";
import {useSession} from "@/components/appContexts/AuthContext";
import {useTranslation} from "react-i18next";
import Labels from "@/constants/locales/Labels";
import {useWihTheme} from "@/components/appContexts/WihThemeProvider";
import {WihLoading} from "@/components/WihComponents/feedback/WihLoading";

const TabIconProps = {
    size: 28,
    style: {
        marginBottom: -3
    }
}

const AuthLayout = () => {
    const {t} = useTranslation();
    const {session, isSessionLoading} = useSession();
    const theme = useWihTheme();
    const router = useRouter();

    useEffect(() => {
        if (session && session.jwtToken && session.refreshToken) {
            router.replace("/(app)/(tabs)");
        }
    }, [session]);

    if (isSessionLoading) {
        return <WihLoading />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.tint,
                headerShown: false,
                tabBarStyle: {backgroundColor: theme.background}
            }}>
            <Tabs.Screen
                name="login"
                options={{
                    title: t(Labels.tabs.login),
                    tabBarIcon: ({color, focused}) => (
                        <IonIcon name={focused ? 'home' : 'home-outline'} color={color} {...TabIconProps} />
                    )
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: t(Labels.tabs.register),
                    tabBarIcon: ({color, focused}) => (
                        <WihMaterialIcon name={focused ? 'add-circle' : 'add-circle-outline'}
                                         color={color} {...TabIconProps} />
                    )
                }}
            />
        </Tabs>
    );
}

export default AuthLayout;
