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
    FlatList,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import {List, ListItem, Card} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ToastModule from './native_modules/ToastModule';
import GalleryModule from './native_modules/GalleryModule';

import {Color} from './components/Color';

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

    onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
        }
        console.log(position);
    }

    onImagePressed(image) {
        console.log('image clicked', image);
    }

    render() {
        return (
            <View style={styles.container}>
                <Ionicons.ToolbarAndroid
                    actions={[
                        {
                            title: 'Menu', icon: require('./images/menu_icon.png'), show: 'always'
                        }
                    ]}
                    onActionSelected={this.onActionSelected}
                    style={styles.toolbar}
                    titleColor="white"
                    title="ImageCompressor" />

                <ScrollView>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                        <FlatList 
                            data={this.state.photos}
                            renderItem={({item}) => (
                                <TouchableHighlight onPress={() => this.onImagePressed(item)}>
                                    <View>
                                        <Card 
                                            title={item.DISPLAY_NAME}
                                            image={{uri: 'file:///' + item.DATA}}
                                        >
                                            <Text>
                                                Size: {parseInt(item.SIZE_IN_BYTES / 1024)} KB &nbsp; | &nbsp;
                                                {new Date(parseInt(item.DATE_TAKEN)).toLocaleDateString()}
                                            </Text>
                                        </Card>
                                    </View>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        backgroundColor: Color.primary,
        height: 56
    }
});

/*
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
    <color name="transparent">#00000000</color>
    <color name="theme_color">#4FC3F7</color>
    <color name="theme_color_dark">#3f8eb1</color>
    <color name="colorPrimaryLight">#FF586CDC</color>
</resources>
*/