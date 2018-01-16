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
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import {List, ListItem, Card} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ToastModule from './native_modules/ToastModule';
import GalleryModule from './native_modules/GalleryModule';
import ImageCompressorModule from './native_modules/ImageCompressorModule';

import {Color} from './components/Color';

const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            areImagesSelected: false
        }
        this.getImagesFromGallery();
        this.selectedPhotos = [];

        this.onActionSelected = this.onActionSelected.bind(this);
        this.compressImages = this.compressImages.bind(this);
    }

    async getImagesFromGallery() {
        try {
            const images = await GalleryModule.getImages();

            // setting id and isSelected property
            for (let i = 0; i < images.length; i++) {
                images[i].id = i; // id is starting from 0 
                images[i].isSelected = false;
            }
            this.setState({
                photos: images
            });
            //console.log(images);
        } catch (e) {
            console.error(e);
        }
    }

    async compressImages() {
        try {
            const selectedPhotos = this.selectedPhotos.slice(); // copying array
            const compressedImages = 
                    await ImageCompressorModule.compressImages(selectedPhotos); 
            console.log(compressedImages);
        } catch (e) {
            console.error(e);
        }
    }

    onActionSelected(position) {
        if (position === 0) { // index of menu/compress
            if (this.state.areImagesSelected) {
                this.compressImages();
            }
        }
        //console.log(position);
    }

    onImagePressed(id) {
        let images = this.state.photos.slice(); // copy array
        images[id].isSelected = !images[id].isSelected;
        this.setState({
            photos: images
        });

        // add or remove this image from selected photos
        if (images[id].isSelected) {
            this.selectedPhotos.push(images[id]);
        } else {
            for (let i = 0; i < this.selectedPhotos.length; i++) {
                if (this.selectedPhotos[i].id == id) { // remove this pic
                    this.selectedPhotos.splice(i, 1);
                    break;
                }
            }
        }
        //console.log(this.selectedPhotos);
        let areImagesSelected = true;
        if (this.selectedPhotos.length == 0) {
            areImagesSelected = false;
        }
        this.setState({
            areImagesSelected: areImagesSelected
        });
    }

    render() {
        const menuIcon = require('./images/menu.png');
        const compressIcon = require('./images/compress.png');
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    actions={[
                        {
                            title: this.state.areImagesSelected ? 'Compress' : 'Menu', 
                            icon: this.state.areImagesSelected ? compressIcon : menuIcon, 
                            show: 'always'
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
                                <TouchableWithoutFeedback onPress={() => this.onImagePressed(item.id)}>
                                    <View style={item.isSelected ? styles.cardIsSelected : styles.cardIsNotSelected}>
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
                                </TouchableWithoutFeedback>
                            )}
                            keyExtractor={(item, index) => item.id}
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
    },
    cardIsSelected: {
        backgroundColor: Color.primaryLight,
        opacity: .8
    },
    cardIsNotSelected: {
        backgroundColor: 'white',
        opacity: 1
    }
});
