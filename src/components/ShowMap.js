import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ListView,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    AsyncStorage
} from "react-native";
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import _ from 'lodash';

MapboxGL.setAccessToken('pk.eyJ1IjoiYW50b24xOTkyMDExNSIsImEiOiJjamZzanRqZG0yemxhMzNtc2c1NnpsdThtIn0.jJQ9iYKDqxpcVehdm8uIjg');

export default class Position extends Component {
    static navigationOptions = {
        title: "ShowMap",
        //    header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            route: {},
            maxPosition: []
        }
    }

    componentWillMount() {
        const params = this.props.navigation.state.params;
        this.setState({ location: params.location });
    }

    componentDidMount() {
        const params = this.props.navigation.state.params;
        const location = params.location;
        let coordinates = [];
        const length = Math.sqrt(Math.pow(location.lat1 - location.lat2, 2) + Math.pow(location.lng1 - location.lng2, 2));
        const alph = Math.atan2(location.lng2 - location.lng1, location.lat2 - location.lat1);
        const cosAlph = Math.cos(alph);
        const sinAlph = Math.sin(alph);
        for (let x = 0; x < Math.PI; x += 0.01) {
            let y = Math.sin(x) * 0.7;
            let xx = (cosAlph * x - sinAlph * y) * length / Math.PI + location.lat1;
            let yy = (sinAlph * x + cosAlph * y) * length / Math.PI + location.lng1;
            const temp = [xx, yy];
            coordinates.push(temp)
        }

        const maxPosition = [
            (cosAlph * Math.PI / 2 - sinAlph * 0.7) * length / Math.PI + location.lat1,
            (sinAlph * Math.PI / 2 + cosAlph * 0.7) * length / Math.PI + location.lng1
        ]
        console.log(coordinates)

        const route = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coordinates
                    }
                }
            ]
        }
        this.setState({ maxPosition })
        this.setState({ route });
    }

    renderAnnotations(lat, lng, key) {
        const { location } = this.state;
        console.log(lat, lng)
        return (
            <MapboxGL.PointAnnotation
                key={key}
                id={key}
                coordinate={[lat, lng]}>

                <View style={styles.annotationContainer}>
                    <View style={styles.annotationFill} />
                </View>

            </MapboxGL.PointAnnotation>
        )
    }

    render() {
        const { location, route, maxPosition } = this.state;
        if (!_.isEmpty(location) && !_.isEmpty(route)) {
            return (
                <View style={styles.showMap}>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Light}
                        zoomLevel={5}
                        centerCoordinate={maxPosition}
                        style={styles.showMap}>
                        {this.renderAnnotations(location.lat1, location.lng1, 'start')}
                        {this.renderAnnotations(location.lat2, location.lng2, 'end')}
                        <MapboxGL.PointAnnotation
                            key="middle"
                            id="middle"
                            coordinate={maxPosition}>

                            <View>
                                <Image source={require('../assets/images/airplane.png')} style={styles.logoImg} />
                            </View>

                        </MapboxGL.PointAnnotation>
                        <MapboxGL.ShapeSource
                            id='line1'
                            shape={route}>
                            <MapboxGL.LineLayer
                                id='linelayer1'
                                sourceLayerID='road'
                                style={{
                                    lineColor: 'blue',
                                    lineWidth: 2,
                                    lineOpacity: 0.50,
                                    lineJoin: MapboxGL.LineJoin.Bevel,
                                    lineCap: MapboxGL.LineCap.Butt,
                                    lineDasharray: [2, 2],
                                    lineRoundLimit: 2.5,
                                    linePattern: 2
                                }} />
                        </MapboxGL.ShapeSource>
                    </MapboxGL.MapView>
                </View>
            )
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    showMap: {
        flex: 1
    },
    annotationContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    annotationFill: {
        width: 10,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: 'orange'
    },
    imageView: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: 'transparent'
    },
    logoImg: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    }
})