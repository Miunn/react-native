import {Image, Linking, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {Appbar, useTheme, Text} from "react-native-paper";
import React, {useCallback, useEffect} from "react";
import {BottleType} from "../models/BottleType.tsx";
import {useCameraPermission} from "react-native-vision-camera";

const Bottle = ({navigation, route}: any) => {

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

            <ScrollView>
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
                        <Text>{bottle.name}</Text>
                        <Text>{bottle.vintageYear}</Text>
                    </View>
                </View>
                <Text>Description</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Bottle;