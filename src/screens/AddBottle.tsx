import {SafeAreaView, ScrollView, StatusBar, Text} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

interface AddBottleProps {
    navigation: NativeStackScreenProps<any>,
    route: any,
}

const AddBottle = ({navigation, route}: AddBottleProps) => {
    return <SafeAreaView>
        <StatusBar />
        <ScrollView>
            <Text>Add</Text>
        </ScrollView>
    </SafeAreaView>
}

export default AddBottle;