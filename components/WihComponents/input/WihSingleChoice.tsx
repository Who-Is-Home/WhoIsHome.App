import {StyleSheet, TouchableOpacity} from "react-native";
import {useWihTheme} from "@/components/appContexts/WihThemeProvider";
import WihView from "@/components/WihComponents/view/WihView";
import {WihText} from "@/components/WihComponents/display/WihText";
import {useTranslation} from "react-i18next";

export type WihOption<T> = {
    value?: T;
    displayTextLabel: string;
}

export interface WihSingleChoiceProps<T> {
    value?: T;
    options: Array<WihOption<T>>;
    direction?: "row" | "column";
    onChange: (value: T | undefined) => void;
    allowDeselect?: boolean;
}

export function WihSingleChoice<T>({
                                       value,
                                       options,
                                       direction,
                                       onChange,
                                       allowDeselect = true,
                                   }: WihSingleChoiceProps<T>) {
    const theme = useWihTheme();
    const {t} = useTranslation();

    const handlePress = (optionValue: T | undefined) => {
        if (value === optionValue && allowDeselect) {
            onChange(undefined);
        } else {
            onChange(optionValue);
        }
    };

    return (
        <WihView style={[styles.container, {flexDirection: direction}]}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(option.value)}
                    style={[
                        styles.option,
                        value === option.value && {
                            backgroundColor: theme.primary,
                        },
                    ]}
                >
                    <WihText
                        style={{
                            color: value === option.value ? theme.textInverse : theme.text,
                        }}
                    >
                        {t(option.displayTextLabel)}
                    </WihText>
                </TouchableOpacity>
            ))}
        </WihView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    option: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
    },
});