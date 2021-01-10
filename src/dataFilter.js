let self = module.exports = {
    filter: function(data){
        let countryMap = self.constructMapFromValidData(data)
        return self.filterFromMap(countryMap)
    },

    constructMapFromValidData: function(data){
        let countryMap = new Map() // country String : date Map
        for(let participant of data.partners){
            let participantCountry = participant.country
            let participantEmail = participant.email
            // sorting each partner's dates descending
            let participantDatesInfo = participant.availableDates.sort((dateAInfo,dateBInfo)=>{
                let dateA = Date.parse(dateAInfo)
                let dateB = Date.parse(dateBInfo)
                if(dateA < dateB){
                    return -1
                }else{
                    return 1
                }
            })
            if(!countryMap.has(participantCountry)){
                countryMap.set(participantCountry, new Map())
            }
            if(participantDatesInfo.length > 1) {
                let dateMap = countryMap.get(participantCountry) // date String : email array
                let previousDateInfo = undefined
                for (let participantDateInfo of participantDatesInfo) {
                    if(previousDateInfo === undefined){ //for the first loop
                        previousDateInfo = participantDateInfo
                        continue
                    }

                    // the 3 lines below checks for whether the two dates are continuous
                    let previousDate = new Date(previousDateInfo)
                    let currentDate = new Date(participantDateInfo)
                    previousDate.setDate(previousDate.getDate() + 1)

                    if(previousDate.toUTCString() === currentDate.toUTCString()){ //if the two days are continuous
                        if (!dateMap.has(previousDateInfo)) {
                            dateMap.set(previousDateInfo, [])
                        }
                        dateMap.get(previousDateInfo).push(participantEmail)
                    }
                    previousDateInfo = participantDateInfo
                }
            }
        }
        return countryMap
    },

    filterFromMap: function(map){
        let result = {countries : []}
        map.forEach((value, key, map)=>{ //for each country
            let name = key
            let sortedData = [...value].sort((dateAInfo,dateBInfo)=>{
                //sort the entry by the number of participant email first, then by chronological order
                let numOfParticipantDateA = dateAInfo[1].length
                let numOfParticipantDateB = dateBInfo[1].length

                if(numOfParticipantDateA === numOfParticipantDateB){
                    let dateA = Date.parse(dateAInfo[0])
                    let dateB = Date.parse(dateBInfo[0])
                    if(dateA < dateB){
                        return -1
                    }else{
                        return 1
                    }
                }else{
                    return numOfParticipantDateB - numOfParticipantDateA
                }
            })
            let startDate = null
            let attendeeCount = 0
            let attendees = []
            if(sortedData.length > 0){
                let startDateEntry = sortedData[0] //earliest valid date entry
                startDate = startDateEntry[0]
                attendeeCount = startDateEntry[1].length
                attendees = startDateEntry[1].sort()
            }
            result.countries.push({ //construct json object for each country
                attendeeCount : attendeeCount,
                attendees : attendees,
                name : name,
                startDate : startDate
            })
        })
        return result
    }
}




