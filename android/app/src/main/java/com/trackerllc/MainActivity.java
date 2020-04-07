package com.trackerllc;

import android.os.Bundle;
import android.os.PersistableBundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

import androidx.annotation.Nullable;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState, persistentState);

  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TrackerLLC";
  }
}
