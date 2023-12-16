import React from "react";
import {ProgressCircle} from "../components/ProgressCircle.tsx";
import {SafeAreaView, ScrollView, StatusBar} from "react-native";
import CellarFill from "../components/CellarFill.tsx";
import WineRowSummary from "../components/WineRowSummary.tsx";

export const Home = () => {
    return <SafeAreaView>
        <StatusBar/>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <CellarFill />
            <ProgressCircle
                size={150}
                progress={0.7}
                duration={1000}
            />
            <WineRowSummary/>
        </ScrollView>
    </SafeAreaView>

}