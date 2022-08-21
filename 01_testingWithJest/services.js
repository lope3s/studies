const {get} = require("axios")

async function getPeople(name) {
    if (!name) throw new Error('No params provided')
    
    const {data} = await get(`https://swapi.dev/api/people?search=${name}`)
    return data.results
}

function mapResults(results) {
    return results.map(person => ({height:person.height, name: person.name.toLowerCase()}))
}

module.exports = {
    getPeople,
    mapResults
}