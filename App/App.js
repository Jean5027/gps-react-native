import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import Mapview, {Marker} from 'react-native-maps'


export default function App() {

    const [location, setLocation] = useState()

    async function requestLocationPermissions(){
        const {granted} = await requestForegroundPermissionsAsync()

        if(granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition) 

        }

    }

    useEffect(() =>{
        requestLocationPermissions()
        console.log(location)
    },[])

    useEffect(() =>{
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval:1000,
            distanceInterval:1,
        }, (Response) =>{
            console.log('Nova localização')
            setLocation(Response)
        })
    },[])
    return (
        <View style={styles.container}>
            
            {location &&
                <Mapview style={styles.map}
                    initialRegion={{
                        latitude:location.coords.latitude,
                        longitude:location.coords.longitude,
                        latitudeDelta:0.005,
                        longitudeDelta:0.005
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude:location.coords.latitude,
                            longitude:location.coords.longitude,
                        }}
                    >

                    </Marker>
                </Mapview>
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    flex:1,
    width:'100%'
  }
});
