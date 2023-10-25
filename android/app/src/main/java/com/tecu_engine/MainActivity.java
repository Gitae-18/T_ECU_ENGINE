package com.tecu_engine;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.view.WindowManager;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
       super.onCreate(savedInstanceState);
      // 상태 바(상단 바)를 숨깁니다.
      getWindow().setFlags(
      WindowManager.LayoutParams.FLAG_FULLSCREEN,
      WindowManager.LayoutParams.FLAG_FULLSCREEN
    );
    int uiOptions = getWindow().getDecorView().getSystemUiVisibility();
            int newUiOptions = uiOptions;
            boolean isImmersiveModeEnabled = ((uiOptions | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY) == uiOptions);
            newUiOptions ^= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
            newUiOptions ^= View.SYSTEM_UI_FLAG_FULLSCREEN;
            newUiOptions ^= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            getWindow().getDecorView().setSystemUiVisibility(newUiOptions);
           /*  newUiOptions &= ~View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            newUiOptions |= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
            newUiOptions |= View.SYSTEM_UI_FLAG_FULLSCREEN;
            newUiOptions |= View.SYSTEM_UI_FLAG_IMMERSIVE;

            getWindow().getDecorView().setSystemUiVisibility(newUiOptions); */
    }
  
/*   @Override 
  protected void onResume() {
    super.onResume();
    int uiOptions = getWindow().getDecorView().getSystemUiVisibility();
    int newUiOptions = uiOptions;
    boolean isImmersiveModeEnabled = ((uiOptions | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY) == uiOptions);
    if(isImmersiveModeEnabled){
      Log.i("Is on?","Turning immersive mode off");
    } else {
      Log.i("Is on?","Turning immersive mode on");
    }
     newUiOptions ^= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
    newUiOptions ^= View.SYSTEM_UI_FLAG_FULLSCREEN;
    newUiOptions ^= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
    getWindow().getDecorView().setSystemUiVisibility(newUiOptions);
  } */
  @Override
  protected String getMainComponentName() {
    return "TECU_ENGINE";
  }
 /*  @Override
  protected void onCreate(Bundle savedInstanceState) {
    StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
    StrictMode.setVmPolicy(builder.build());
    super.onCreate(null);
  } */
  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
