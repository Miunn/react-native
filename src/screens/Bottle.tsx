import {DeviceEventEmitter, Image, Linking, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {Appbar, useTheme, Text, Icon} from "react-native-paper";
import React, {useEffect, useRef, useState} from "react";
import {BottleType} from "../models/BottleType.tsx";
import {useCameraPermission} from "react-native-vision-camera";
import {useTranslation} from "react-i18next";
import {MediaType} from "../models/MediaType.tsx";
import {getDBConnection, updateBottle} from "../services/db-interface.ts";

const Bottle = ({navigation, route}: any) => {

    const {t} = useTranslation();
    const theme = useTheme();
    const [bottle, setBottle] = useState<BottleType>(route.params.bottle);
    const {hasPermission, requestPermission} = useCameraPermission();

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });
    }, []);

    const cameraCallback = async (data: any) => {
        const media = data.media;
        setBottle({
            id: bottle.id,
            name: bottle.name,
            signature: bottle.signature,
            vintageYear: bottle.vintageYear,
            color: bottle.color,
            imageUri: media.path
        });

        DeviceEventEmitter.removeAllListeners("event.mediaCaptured");
    }

    const getCameraView = async () => {
        DeviceEventEmitter.removeAllListeners("event.mediaCaptured");
        DeviceEventEmitter.addListener("event.mediaCaptured", cameraCallback);
        if (hasPermission) {
            navigation.navigate("camera");
        } else {
            const permission = await requestPermission();

            if (permission) {
                navigation.navigate("camera");
            } else {
                await Linking.openSettings();
            }
        }
    };

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    useEffect(() => {
        getDBConnection()
            .then(db => {
                updateBottle(db, bottle);
            });
    }, [bottle]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title={bottle.name}/>
            </Appbar.Header>

            <ScrollView style={{
                margin: 10
            }}>
                <Text style={{
                    fontFamily: "AlexBrush-Regular",
                    fontSize: 40
                }}>{bottle.name}</Text>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}>

                    <Pressable
                        onPress={getCameraView}
                        style={{
                            width: 175,
                            height: 175,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {bottle.imageUri !== null ?
                            <Image style={{width: '100%', height: '100%'}} source={{uri: 'file://' + bottle.imageUri}} />
                            :
                            <Icon source={"camera"} size={50}/>
                        }
                    </Pressable>

                    <View>
                        {bottle.signature ? <Text>{bottle.signature}</Text> : <Text style={{fontStyle: "italic"}}>{t('emptySignature')}</Text>}
                        <Text>{bottle.vintageYear}</Text>
                    </View>
                </View>
                <Text style={{margin: 20}}>Description</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Bottle;