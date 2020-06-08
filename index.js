'use strict';

const Lookup = require("node-yeelight-wifi").Lookup;
const Yeelight = require("node-yeelight-wifi").Yeelight;
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));




let look = new Lookup();

look.on("detected", (light) => {
    console.log("Yeelight detected: host=" + light.host + " type=" + light.type);
});

let lights;
setTimeout(() => {
    lights = look.getLights();

    if (lights.length == 0) {
        console.log("no yeelight found");
        return;
    }

    let light = lights[0];

    light.on("connected", () => {
        console.log("connected");
    });

    light.on("disconnected", () => {
        console.log("disconnected");
    });

    light.on("stateUpdate", (light) => {
    });

    light.on("failed", (error) => {
        console.log(error);
    });

    /*setInterval(() => {
        console.log("TEST DELAY");
        let RGB = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
        light.setRGB(RGB)
            .then(() => {
                console.log("SUCCES!, the selected rgb is", RGB)
            })
    }, 1500)*/

}, 1500);

app.get('/', (req, res) => res.sendfile(__dirname + '/public/index.html'));
app.get('/off', (req, res) => {
    if (lights.length) {
        lights[0].setPower(false)
        lights[1].setPower(false)
        lights[2].setPower(false)
    }
    res.end();
})
app.get('/on', (req, res) => {
    if (lights.length) {
        lights[0].setPower(true)
        lights[1].setPower(true)
        lights[2].setPower(true)
    }
    res.end();
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
