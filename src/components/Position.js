import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from "react-native";
import Dimensions from 'Dimensions';

export default class Position extends Component {
    static navigationOptions = {
        title: "Postion",
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            lat1: "",
            lng1: "",
            lat2: "",
            lng2: "",
        }
    }

    showMap() {
        console.log(this.state)
        const { lat1, lng1, lat2, lng2 } = this.state;
        if (lat1.length > 0 && lng1.length > 0 && lat2.length > 0 && lng2.length > 0) {
            const navigate = this.props.navigation.navigate;
            const data = {
                lat1: parseFloat(lat1),
                lng1: parseFloat(lng1),
                lat2: parseFloat(lat2),
                lng2: parseFloat(lng2),
            }
            navigate('ShowMap', { title: 'Show Map', location: data });
        } else {
            alert("please fill all fields");
        }
    }

    checkNum(field, value) {
        let newText = '';
        const numbers = '-0123456789.';

        for (let i = 0; i < value.length; i++) {
            if (numbers.indexOf(value[i]) > -1) {
                newText = newText + value[i];
            }
            else {
                alert("please enter numbers only");
            }
        }

        if (newText == "--" || newText == ".." || newText == ".-") {
            alert("please insert correct position");
            this.setState({ [field]: "" });
            return;
        }

        if (field == 'lat1' || field == 'lat2') {
            if (Math.abs(parseFloat(value)) > 180) {
                alert('latitude must be between -180 and 180');
                this.setState({ [field]: "" });
            } else
                this.setState({ [field]: value });
        }

        if (field == 'lng1' || field == 'lng2') {
            if (Math.abs(parseFloat(value)) > 90) {
                alert('Longitudes must be between -90 and 90');
                this.setState({ [field]: "" });
            } else
                this.setState({ [field]: value });
        }

        this.setState({ [field]: value });
    }

    render() {
        const { lat1, lng1, lat2, lng2 } = this.state;

        return (
            <View style={styles.position}>
                <View style={styles.textView}>
                    <TextInput
                        keyboardType="default"
                        value={lat1}
                        onChangeText={(lat1) => this.checkNum('lat1', lat1)}
                        style={styles.text}
                        placeholder="Latitude"
                        underlineColorAndroid='transparent'
                        maxLength={6}
                    />
                    <TextInput
                        keyboardType="default"
                        value={lng1}
                        onChangeText={(lng1) => this.checkNum('lng1', lng1)}
                        style={styles.text}
                        placeholder="Longitude"
                        underlineColorAndroid='transparent'
                        maxLength={6}
                    />
                </View>
                <View style={styles.textView}>
                    <TextInput
                        keyboardType="default"
                        value={lat2}
                        onChangeText={(lat2) => this.checkNum('lat2', lat2)}
                        style={styles.text}
                        placeholder="Latitude"
                        underlineColorAndroid='transparent'
                        maxLength={6}
                    />
                    <TextInput
                        keyboardType="default"
                        value={lng2}
                        onChangeText={(lng2) => this.checkNum('lng2', lng2)}
                        style={styles.text}
                        placeholder="Longitude"
                        underlineColorAndroid='transparent'
                        maxLength={6}
                    />
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => this.showMap()}>
                        <View style={styles.showMapBtn}>
                            <Text style={styles.showMapText}>Find Postion</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    position: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    text: {
        borderRadius: 7,
        borderColor: '#dddddd',
        borderWidth: 1,
        height: 50,
        paddingLeft: 10,
        color: '#000000',
        width: Dimensions.get('window').width / 2 - 40,
        textDecorationLine: "underline",
        textDecorationColor: "transparent",
        margin: 5
    },
    btnView: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    showMapBtn: {
        backgroundColor: '#007eff',
        borderRadius: 60,
        height: 60,
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showMapText: {
        color: '#ffffff',
        fontSize: 16
    },
})
