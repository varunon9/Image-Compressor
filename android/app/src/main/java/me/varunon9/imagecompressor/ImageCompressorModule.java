package me.varunon9.imagecompressor;

import android.os.AsyncTask;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

/**
 * Created by varun on 14/1/18.
 */

public class ImageCompressorModule extends ReactContextBaseJavaModule {

    private static final String DISPLAY_NAME = "DISPLAY_NAME";
    private static final String DATA = "DATA";
    private static final String DATE_TAKEN = "DATE_TAKEN";
    private static final String SIZE_IN_BYTES = "SIZE_IN_BYTES";

    public ImageCompressorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImageCompressorModule";
    }

    @ReactMethod
    public void compressImages(ReadableArray imagesArray, final Promise promise) {
        new CompressImagesTask(promise).execute(imagesArray);
    }

    private static class CompressImagesTask extends AsyncTask<ReadableArray, Void, Void> {

        private Promise promise;

        CompressImagesTask(Promise promise) {
            this.promise = promise;
        }

        @Override
        protected Void doInBackground(ReadableArray... readableArrays) {
            ReadableArray imagesArray = readableArrays[0];
            WritableArray compressedImagesArray = new WritableNativeArray();
            try {
                for (int i = 0; i < imagesArray.size(); i++) {
                    ReadableMap imageMap = imagesArray.getMap(0);
                    WritableMap compressedImageMap = Arguments.createMap();
                    compressedImageMap.putString(DISPLAY_NAME, imageMap.getString(DISPLAY_NAME));
                    compressedImagesArray.pushMap(compressedImageMap);
                }
                promise.resolve(compressedImagesArray);
            } catch (Exception e) {
                promise.reject(e);
            }
            return null;
        }
    }
}
