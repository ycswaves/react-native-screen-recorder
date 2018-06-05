package com.screenrecorder;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.screenrecorder.MainActivity;

import java.lang.ref.WeakReference;




public class RecorderManager extends ReactContextBaseJavaModule {

  private static WeakReference<MainActivity> mWeakActivity;

  public RecorderManager(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  public static void updateActivity(MainActivity activity) {
    mWeakActivity = new WeakReference<MainActivity>(activity);
  }


  @Override
  public String getName() {
    return "RecorderManager";
  }

  @ReactMethod
  public void start() {
    mWeakActivity.get().startRecording();
    Toast.makeText(getReactApplicationContext(), "started", Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void stop() {
    mWeakActivity.get().stopRecording();
    String filePath = mWeakActivity.get().getVideoPath();
    getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("updateFilePath", filePath);

    Toast.makeText(getReactApplicationContext(), "stopped", Toast.LENGTH_SHORT).show();

  }
}