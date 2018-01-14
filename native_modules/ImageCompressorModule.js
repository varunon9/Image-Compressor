/**
 * This module asynchronously compress images and returns array of compressed images
 * void compressImages(Promise, imagesArray);
 */

import {NativeModules} from 'react-native';

module.exports = NativeModules.ImageCompressorModule;