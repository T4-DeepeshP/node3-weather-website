const request = require('request');
const express = require('express');


const getWeather = (address, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=3156c3c756ca4bccad2103446240208&q=${encodeURIComponent(address)}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(`unable to connect...`);
        }
        else if (body.error) {
            callback(`unable to find location. Try again...`)
        }
        else {
            //const str = `TTTemprature at ${body.location.name}, ${body.location.region}, ${body.location.country} is ${body.current.temp_c} degree but feels like ${body.current.feelslike_c}.`
            const obj = {
                location: `${body.location.name}, ${body.location.region}, ${body.location.country}`,
                forcast: `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out and feels like ${body.current.feelslike_c}. Humidity is ${body.current.humidity}% with wind speed of ${body.current.wind_kph} kilometer per hour.`
            }
            callback(undefined, obj);
        }
    })
}

module.exports = getWeather;