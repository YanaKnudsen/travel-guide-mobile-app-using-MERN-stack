import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../../screens/Home.tsx";
import Map from "../../screens/Map.tsx";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Map} />
        </Tab.Navigator>
    );
}

export default MyTabs;