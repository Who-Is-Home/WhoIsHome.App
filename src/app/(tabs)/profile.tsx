import { WihAvatar } from "@/components/WihAvatar";
import { WihText, WihTitle } from "@/components/WihText";
import WihView from "@/components/WihView";
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

const Profile = () => {
    const dim = Dimensions.get("screen");
    var viewStyle: ViewStyle = {
        marginLeft: dim.width / 8,
        marginTop: dim.height / 12
    }

    const avatarStyle = {
        marginRight: dim.width / 20
    }

    const textStyle = {
        fontSize: dim.fontScale * 24
    }

    return (
        <>
            <WihView style={[viewStyle, styles.view]}>
                <WihAvatar name="Darki" size={dim.scale * 14} style={avatarStyle} />
                <WihText style={[styles.text, textStyle]}>Darki</WihText>
            </WihView >
            <WihView center="horizontal">
                <WihTitle>Hi</WihTitle>
            </WihView>
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontWeight: "bold"
    }
})

export default Profile;