import {
    Camera, CameraRuntimeError,
    PhotoFile,
    useCameraDevice,
    useCameraFormat,
    VideoFile
} from "react-native-vision-camera";
import {StyleSheet, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {useAppState} from "@react-native-community/hooks";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Reanimated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useSharedValue
} from "react-native-reanimated";
import {PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler} from "react-native-gesture-handler";
import {
    CONTENT_SPACING,
    CONTROL_BUTTON_SIZE,
    MAX_ZOOM_FACTOR,
    SAFE_AREA_PADDING,
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} from "../Constants.ts";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {CaptureButton} from "../components/camera/CaptureButton.tsx";
import { PressableOpacity } from 'react-native-pressable-opacity';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
    zoom: true,
});

const SCALE_FULL_ZOOM = 3;

const CameraScreen = ({navigation}: NativeStackScreenProps<any>) => {

    const camera = useRef<Camera>(null);
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const device = useCameraDevice(cameraPosition);
    const isFocused = useIsFocused();
    const appState = useAppState();
    const [isActive, setIsActive] = useState(false);
    const [enableHdr, setEnableHdr] = useState(false);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off')
    const [targetFps, setTargetFps] = useState(60)
    const zoom = useSharedValue(0);
    const [enableNightMode, setEnableNightMode] = useState(false);
    const isPressingButton = useSharedValue(false);

    const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
    const format = useCameraFormat(device, [
        { fps: targetFps },
        { videoAspectRatio: screenAspectRatio },
        { videoResolution: 'max' },
        { photoAspectRatio: screenAspectRatio },
        { photoResolution: 'max' },
    ]);

    const fps = Math.min(format?.maxFps ?? 1, targetFps);

    const minZoom = device?.minZoom ?? 1;
    const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

    const supportsFlash = device?.hasFlash ?? false;
    const supportsHdr = format?.supportsPhotoHdr
    const supports60Fps = useMemo(() => device?.formats.some((f) => f.maxFps >= 60), [device?.formats])
    const canToggleNightMode = device?.supportsLowLightBoost ?? false

    const cameraAnimatedProps = useAnimatedProps(() => {
        const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
        return {
            zoom: z,
        }
    }, [maxZoom, minZoom, zoom]);

    const onInitialized = useCallback(() => {
        console.log('Camera initialized!')
        setIsCameraInitialized(true);
        setIsActive(isFocused && appState === "active");
        console.log("Set active to", isFocused && appState === "active");
    }, [isFocused, appState]);

    const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, { startZoom?: number }>({
        onStart: (_, context) => {
            context.startZoom = zoom.value
        },
        onActive: (event, context) => {
            // we're trying to map the scale gesture to a linear zoom here
            const startZoom = context.startZoom ?? 0
            const scale = interpolate(event.scale, [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM], [-1, 0, 1], Extrapolate.CLAMP)
            zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolate.CLAMP)
        },
    });

    const setIsPressingButton = useCallback(
        (_isPressingButton: boolean) => {
            isPressingButton.value = _isPressingButton;
        },
        [isPressingButton.value],
    );

    const onFlipCameraPressed = useCallback(() => {
        setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
    }, []);
    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === 'off' ? 'on' : 'off'))
    }, []);

    const onDoubleTap = useCallback(() => {
        onFlipCameraPressed()
    }, [onFlipCameraPressed]);

    const onMediaCaptured = useCallback(
        (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
            console.log(`Media captured! ${JSON.stringify(media)}`)
            /*navigation.navigate('MediaPage', {
                path: media.path,
                type: type,
            });*/
        },
        [/*navigation*/],
    );

    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error);
    }, []);

    const neutralZoom = device?.neutralZoom ?? 1;
    useEffect(() => {
        // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
        zoom.value = neutralZoom;
    }, [neutralZoom, zoom]);

    useEffect(() => {
        const f =
            format != null
                ? `(${format.photoWidth}x${format.photoHeight} photo / ${format.videoWidth}x${format.videoHeight}@${format.maxFps} video @ ${fps}fps)`
                : undefined
        console.log(`Camera: ${device?.name} | Format: ${f}`)
    }, [device?.name, format, fps])

    if (device == null) return <Text>No camera</Text>
    return (
        <View style={styles.container}>
            {(
                <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
                    <Reanimated.View style={StyleSheet.absoluteFill}>
                        <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                            <ReanimatedCamera
                                ref={camera}
                                style={StyleSheet.absoluteFill}
                                device={device}
                                format={format}
                                fps={fps}
                                photoHdr={enableHdr}
                                videoHdr={enableHdr}
                                lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                                isActive={isActive}
                                onInitialized={onInitialized}
                                onError={onError}
                                enableZoomGesture={false}
                                animatedProps={cameraAnimatedProps}
                                exposure={0}
                                enableFpsGraph={true}
                                orientation="portrait"
                                photo={true}
                            />
                        </TapGestureHandler>
                    </Reanimated.View>
                </PinchGestureHandler>
            )}

            <CaptureButton
                style={styles.captureButton}
                camera={camera}
                onMediaCaptured={onMediaCaptured}
                cameraZoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                flash={supportsFlash ? flash : 'off'}
                enabled={isCameraInitialized && isActive}
                setIsPressingButton={setIsPressingButton}
            />

            {/*<StatusBarBlurBackground />*/}

            <View style={styles.rightButtonRow}>
                <PressableOpacity style={styles.button} onPress={onFlipCameraPressed} disabledOpacity={0.4}>
                    <IonIcon name="camera-reverse" color="white" size={24} />
                </PressableOpacity>
                {supportsFlash && (
                    <PressableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
                        <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
                    </PressableOpacity>
                )}
                {supports60Fps && (
                    <PressableOpacity style={styles.button} onPress={() => setTargetFps((t) => (t === 30 ? 60 : 30))}>
                        <Text style={styles.text}>{`${targetFps}\nFPS`}</Text>
                    </PressableOpacity>
                )}
                {supportsHdr && (
                    <PressableOpacity style={styles.button} onPress={() => setEnableHdr((h) => !h)}>
                        <MaterialIcon name={enableHdr ? 'hdr' : 'hdr-off'} color="white" size={24} />
                    </PressableOpacity>
                )}
                {canToggleNightMode && (
                    <PressableOpacity style={styles.button} onPress={() => setEnableNightMode(!enableNightMode)} disabledOpacity={0.4}>
                        <IonIcon name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
                    </PressableOpacity>
                )}
                <PressableOpacity style={styles.button} onPress={() => navigation.navigate('Devices')}>
                    <IonIcon name="settings-outline" color="white" size={24} />
                </PressableOpacity>
                <PressableOpacity style={styles.button} onPress={() => navigation.navigate('CodeScannerPage')}>
                    <IonIcon name="qr-code-outline" color="white" size={24} />
                </PressableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    captureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: SAFE_AREA_PADDING.paddingBottom,
    },
    button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        top: SAFE_AREA_PADDING.paddingTop,
    },
    text: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CameraScreen;