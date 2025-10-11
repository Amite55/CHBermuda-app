import { Text, TouchableOpacity, View } from "react-native";
import tw from "../lib/tailwind";

interface TextButtonProps {
    buttonContainerStyle?: any,
    buttonText?: string,
    buttonTextStyle?: any,
    onPress?: () => void;
    disabled?: boolean;


}


export default function TextButton({
    buttonContainerStyle,
    buttonText,
    buttonTextStyle,
    onPress,
    disabled
}: TextButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            delayPressIn={0}
            delayPressOut={0}
            onPress={onPress}
            disabled={disabled}
            style={[tw`h-12 bg-primaryBtn rounded-full justify-center items-center flex-row gap-3`, buttonContainerStyle]}
        >
            <View>
                <Text style={[tw`text-white text-center`, buttonTextStyle]}>
                    {buttonText}
                </Text>
            </View>
        </TouchableOpacity>
    )
}