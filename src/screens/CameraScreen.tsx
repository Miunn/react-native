import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";
import {StyleSheet, Text} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {useAppState} from "@react-native-community/hooks";
import {useCallback, useState} from "react";

const CameraScreen = () => {

    const device = useCameraDevice('back');
    const isFocused = useIsFocused();
    const appState = useAppState();
    const isActive = isFocused && appState === "active";
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);

    const onInitialized = useCallback(() => {
        console.log('Camera initialized!')
        setIsCameraInitialized(true)
    }, []);

    if (device == null) return <Text>No camera</Text>
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onInitialized={onInitialized}
            photo={true}
        />
    )
}

export default CameraScreen;