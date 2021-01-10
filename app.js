#!/usr/bin/env node
const mainService = require('./src/mainService')

function app(){
    mainService.start()
}

app()