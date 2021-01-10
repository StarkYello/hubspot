const constants = require('./constants')
const bent = require('bent')
//https://github.com/mikeal/bent is very useful for small project like this

let self = module.exports = {
    // making dataArchive into another module to separate the data access layer from the main service
    getData: async function(){
        const getJSON = bent('GET', 'json')
        return await getJSON(constants.GET_ENDPOINT)
    },

    postData: async function(data){
        const postJSON = bent('POST', 'json', 200) //only 200 is acceptable as response code
        return await postJSON(constants.POST_ENDPOINT, data)
    }
}