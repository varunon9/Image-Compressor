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
    TouchableOpacity
} from 'react-native';

import {List, ListItem, Card} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
        }
        console.log(position);
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

                <List /*containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}*/ style={{backgroundColor: 'green'}}>
                    <FlatList 
                        style={{backgroundColor: 'red', margin: 0}}
                        data={this.state.photos}
                        renderItem={({item}) => (
                            <TouchableOpacity>
                                <Card
                                    title={item.DISPLAY_NAME}
                                    image={{uri: 'file:///' + item.DATA}}
                                    /*style={styles.card}*/
                                >
                                    <Text>
                                        Size: {parseInt(item.SIZE_IN_BYTES / 1024)} KB &nbsp; | &nbsp;
                                        {new Date(parseInt(item.DATE_TAKEN)).toLocaleDateString()}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1/*,
        justifyContent: 'center',
        alignItems: 'center'*/,backgroundColor: 'yellow', padding: 0
    },
    card: {
        margin: 0,
        width: WIDTH / 3,
        height: WIDTH / 3
    },
    toolbar: {
        backgroundColor: '#3F51B5',
        height: 56,
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