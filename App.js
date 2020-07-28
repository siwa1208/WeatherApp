import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from "./utils/APIKey";
import  Weather from "./components/Weather";


export default class App extends React.Component {

  state = {
    isLoading: false,
    temperature: 0,
    weatherConditions: null,
    error: null
  }

  /*  Récupère les données de géolocalisation */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions'
        });
      }
    );
  }

  /* fetch la data, appel de l'API en lui passant en {Param} la latitude, longitude et l'API_KEY
    Nous renvoies la temperature en °C et les conditions météorologique */

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState ({       
          temperature: json.main.temp,
          weatherConditions: json.weather[0].main,
          isLoading: false
      });
    })
  }

  render () {

    const {isLoading} = this.state;
    const {weatherConditions} = this.state;
    const {temperature} = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <Text>Wait for it sun is comming!</Text> : <Weather weather={weatherConditions} temperature={temperature} />}        
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
