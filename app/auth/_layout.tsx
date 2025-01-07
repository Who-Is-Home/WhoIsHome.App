import {useThemeColor} from "@/hooks/useThemeColor";
import {IonIcon, MaterialIcon} from '@/components/WihIcon';
import {useRouter, Tabs} from "expo-router";
import React, {useEffect} from "react";
import {useSession} from "@/components/auth/context";
import {WihTitle} from "@/components/WihText";
import {useTranslation} from "react-i18next";
import Labels from "@/constants/locales/Labels";

const TabIconProps = {
    size: 28,
    style: {
        marginBottom: -3
    }
}

const AuthLayout = () => {
    const {t} = useTranslation();
    const {session, isSessionLoading} = useSession();
    const tint = useThemeColor("tint");
    const router = useRouter();
    const backgroundColor = useThemeColor('background');

    useEffect(() => {
        if (session && session.jwtToken && session.refreshToken) {
            router.replace("/protected/(tabs)");
        }
    }, [session]);

    if (isSessionLoading) {
        return <WihTitle>Loading...</WihTitle>
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: tint,
                headerShown: false,
                tabBarStyle: {backgroundColor: backgroundColor}
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
                        <MaterialIcon name={focused ? 'add-circle' : 'add-circle-outline'}
                                      color={color} {...TabIconProps} />
                    )
                }}
            />
        </Tabs>
    );
}

export default AuthLayout;
