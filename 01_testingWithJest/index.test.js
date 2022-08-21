const {mapResults, getPeople} = require("./services")

// as getPeople makes an external call, we should assume that with the right params the return will be
// the expected, so we need to test the param passed to the function, and prevent the function of making
// a external call to guarantee that our test is offline.

// a test to verify if the function will fail if no params if provided
test("getPeople throws an error if no parameter if provided", async () => {
    try {
        await getPeople()
    } catch (error) {
        expect(error.message).toMatch('No params provided')
    }
})

// create a mock function to simulate a sucessful call with the right params, and use this to test the
// mapResults function
test("Parse data correctly", async () => {
    const getPeople = jest.fn(async name => {
        return (
            [
                {
                    birth_year: "33BBY",
                    created: "2014-12-10T15:11:50.376000Z",
                    edited: "2014-12-20T21:17:50.311000Z",
                    eye_color: "red",
                    films: [
                        "https://swapi.dev/api/films/1/",
                        "https://swapi.dev/api/films/2/",
                        "https://swapi.dev/api/films/3/",
                        "https://swapi.dev/api/films/4/",
                        "https://swapi.dev/api/films/5/",
                        "https://swapi.dev/api/films/6/",
                    ],
                    gender: "n/a",
                    hair_color: "n/a",
                    height: "96",
                    name: "r2-d2",
                    homeworld: "https://swapi.dev/api/planets/8/",
                    mass: "32",
                    name: "R2-D2",
                    skin_color: "white, blue",
                    species: [
                        "https://swapi.dev/api/species/2/",
                    ],
                    starships: [],
                    url: "https://swapi.dev/api/people/3/",
                    vehicles: [],
                }
            ]
        )
    })
    const data = await getPeople('r2-d2')
    const dataMapped = mapResults(data)
    const expected = [{name: 'r2-d2', height: '96'}]
    expect(dataMapped).toStrictEqual(expected)
})