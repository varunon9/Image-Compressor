/**
 * @author Varun Kumar<varunon9@gmail.com>
 * 30 December, 2017
 * A react-native app to compress images
 */

import React from 'react';

import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';

import ToastModule from './native_modules/ToastModule';

const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        ToastModule.show('Cool...', ToastModule.SHORT);
    }

    render() {
        return (
            <Text>Hello world!</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});