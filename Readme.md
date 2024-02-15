# Navigation on the water with Google Maps

## Overview

The WaterLine app provides an overlay for Google Maps where it's easy to place markers and draw lines between them.

Distance between the markers will also be shown. Markers can be moved or deleted at will, as can the whole route.
Line color and thickness can be customized, as can the geoloc update distance and time interval.
The route can be locked via a UI switch, so that accidental editing is not possible.

The route is persisted locally via AsyncStorage; in the future, multiple routes may be saved remotely.

## Installation

You will need to obtain a google maps API key and put it under android/apikey.properties, with 'API_KEY="your-key"' inside it.
Also, in android/local.properties, put:

KEYSTORE_FILE=appkey.keystore  
APP_KEY_ALIAS=appkey  
KEYSTORE_PASSWORD=your-password  
APP_KEY_PASSWORD=your-password

Then generate an APK and load it up on your Android phone.

## Notes

The app is meant to center the view automatically after moving a certain distance, but this does not always happen correctly (bug).