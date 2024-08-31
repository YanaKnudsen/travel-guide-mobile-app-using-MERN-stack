import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { observer } from "mobx-react";

function ProfileContent(): React.JSX.Element {

    return (
        <View>
          <Text>Profile content here</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default observer(ProfileContent);