const request = require('request');
const express = require('express');


const getWeather = (address, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=3156c3c756ca4bccad2103446240208&q=${encodeURIComponent(address)}`

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback(`unable to connect...`);
        }
        else if (body.error) {
            callback(`unable to find location. Try again...`)
        }
        else {
            const str = `Temprature at ${body.location.name}, ${body.location.region}, ${body.location.country} is ${body.current.temp_c} degree but feels like ${body.current.feelslike_c}.`
            callback(undefined, str);
        }
    })
}

module.exports = getWeather;