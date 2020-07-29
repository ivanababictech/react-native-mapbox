## Project about

I have used React Native, Redux, Redux-thunk, Mapbox.
react-nataive: 0.51.0
mapbox: 6.0.2


## Start React Native Packager

Open up another tab in your Terminal and run
```
npm start
```

## Run Android Simulator

* Open up Android Studio and build with gradle
* Start Android emulator
* Run `adb reverse tcp:8081 tcp:8081` to foward port to packager(needed for hot reloading, if you're not developing you can skip this step).
* Run `react-native run-android` from `example` directory

## Run iOS Simulator

You can run this with the react-native cli or Xcode

```
react-native run-ios
```

## Reference
https://github.com/mapbox/react-native-mapbox-gl/tree/master/example

![alt text](https://github.com/blue-sky0909/react-native-mapbox/blob/master/src/assets/images/mapbox.PNG)
