import {Image, Linking, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {Appbar, useTheme, Text} from "react-native-paper";
import React, {useCallback, useEffect} from "react";
import {BottleType} from "../models/BottleType.tsx";
import {useCameraPermission} from "react-native-vision-camera";
import {useTranslation} from "react-i18next";
import {useFont} from "@shopify/react-native-skia";

const Bottle = ({navigation, route}: any) => {

    const {t} = useTranslation();
    const theme = useTheme();
    const bottle: BottleType = route.params.bottle;
    const imageUri = bottle.imageUri !== undefined ? bottle.imageUri : "";
    const {hasPermission, requestPermission} = useCameraPermission();

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });
        console.log("Hide");
    }, []);

    const getCameraView = async () => {
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
                        <Image source={require('../assets/add_a_photo.png')}/>
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