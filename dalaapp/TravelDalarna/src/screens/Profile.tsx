
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View,Animated,
    TouchableOpacity, TextInput,Linking,
} from 'react-native';






function Profile({navigation}): React.JSX.Element {

    return (
        <View style={styles.profilePage}>
           <Text>Profile page is here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
profilePage:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}
});

export default Profile;