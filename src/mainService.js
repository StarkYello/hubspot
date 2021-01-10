const constants = require('./constants')
const dataArchive = require('./dataArchive')
const dataFilter = require('./dataFilter')

let self = module.exports = {
    start: function(){
        (
            async()=>{
                let participantData = await dataArchive.getData() //read in data from source
                let filteredData = dataFilter.filter(participantData) //filter data with json manipulation
                let postResponse = await dataArchive.postData(filteredData) //post formatted result
                console.log(postResponse.message) //output result of the post
            }
        )()
    }
}