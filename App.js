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
    CameraRoll,
    ScrollView,
    Dimensions
} from 'react-native';

const FETCH_LIMIT = 20;
const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.lastPhotoFetched = undefined; // Using `null` would crash ReactNative CameraRoll on iOS.
        this.state = {
            photos: []
        }

        this.fetchPhotos(FETCH_LIMIT, this.lastPhotoFetched);
    }

    onPhotosFetchedSuccess(data) {
        console.log(data);
        const newPhotos = data.edges.map(asset => asset.node.image);

        this.setState({
            photos: this.state.photos.concat(newPhotos)
        });

        if (newPhotos.length) {
            this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
        }
    }

    onPhotosFetchError(err) {
        // Handle error here
        console.log(err);
    }

    fetchPhotos = (count = FETCH_LIMIT, after) => {
        CameraRoll.getPhotos({
            first: count,
            after
        }).then(this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this)); 
    }

    onEndReached() {
        this.fetchPhotos(FETCH_LIMIT, this.lastPhotoFetched);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    this.state.photos.map((photo, index) => {
                        return (
                            <Image 
                                key={index} 
                                style={{
                                    width: WIDTH / 3,
                                    height: WIDTH / 3
                                }} 
                                source={{uri: photo.uri}} 
                            />
                        );
                    })
                }
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
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