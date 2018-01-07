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
    Dimensions,
    Text,
    FlatList
} from 'react-native';

import {List, ListItem} from 'react-native-elements';

import ToastModule from './native_modules/ToastModule';
import GalleryModule from './native_modules/GalleryModule';

const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
        this.getImagesFromGallery();
    }

    async getImagesFromGallery() {
        try {
            const images = await GalleryModule.getImages();
            this.setState({
                photos: images
            });
            console.log(images);
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.photos}
                    renderItem={({item}) => (
                       <View>
                          <Text>{item.DISPLAY_NAME}</Text>
                          <Image 
                              style={{
                                  width: WIDTH / 3,
                                  height: WIDTH / 3
                              }}
                              source={{uri: 'file:///' + item.DATA}}
                           />
                       </View>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </List>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});