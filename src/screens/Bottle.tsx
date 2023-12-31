import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Appbar} from "react-native-paper";
import React from "react";
import {BottleType} from "../models/BottleType.tsx";
import {useTheme} from "@react-navigation/native";

const Bottle = ({navigation, route}: any) => {

    const {colors} = useTheme();
    const bottle: BottleType = route.params.bottle;
    const imageUri = bottle.imageUri !== undefined ? bottle.imageUri : "";

    return (
        <SafeAreaView style={{flex: 1}}>
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
                    <View style={{
                        width: 175,
                        height: 175,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require('../assets/add_a_photo.png')}/>
                    </View>

                    <View>
                        <Text style={{
                            color: colors.text
                        }}>{bottle.name}</Text>
                        <Text style={{
                            color: colors.text
                        }}>{bottle.vintageYear}</Text>
                    </View>
                </View>
                <Text style={{
                    color: colors.text
                }}>Description</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Bottle;