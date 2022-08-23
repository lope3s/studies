const Database = require('./database')
const { writeFile, rm } = require('node:fs/promises');
const { randomUUID } = require('node:crypto')

describe('Testing heroes manipulation', () => {
    const FILE_NAME = 'test_database.json';

    const DEFAULT_HERO = {
        "name": "Flash",
        "power": "Speed",
        "id": randomUUID()
    };

    const {getDatabaseData, list, remove, create, update} = new Database(FILE_NAME)

    beforeAll(async() => {
        const data = [DEFAULT_HERO]
        await writeFile(FILE_NAME, JSON.stringify(data))
    })

    afterAll(async() => {
        await rm(FILE_NAME, {force: true})
    })

    it("Should return all data from database", async() => {
        const expected = [
            DEFAULT_HERO
        ]

        const databaseData = await getDatabaseData()

        expect(databaseData).toStrictEqual(expected)
    })

    it('Should list all heroes using files', async() => {
        const expected = [
            DEFAULT_HERO
        ]
        const heroes = await list()
        expect(heroes).toStrictEqual(expected)
    })

    it('Should list heroes that match the filter', async () => {
        const expected = [DEFAULT_HERO]
        const heroes = await list({name: "Flash"})
        expect(heroes).toStrictEqual(expected)
    })

    it('Should create a hero in the database', async() => {
        const id = randomUUID()
        const newHero = {id, name: 'Batman', power: 'Money'}

        await create(newHero)

        const expected = [
            newHero
        ]

        const received = await list({id})

        expect(received).toStrictEqual(expected)
    })

    it('Should throw an error if no id is provided', async () => {
        expect.assertions(1)
        try {
            await update()
        } catch (error) {
            expect(error.message).toMatch('No id provided.')
        }
    })

    it('Should throw an error if no data is provided', async () => {
        expect.assertions(1)
        try {
            await update('asdf')
        } catch (error) {
            expect(error.message).toMatch('No data provided.')
        }
    })

    it('Should throw an error if no hero with the provided id is found', async() => {
        expect.assertions(1)
        try {
            await update('çalskdjfaçdslf', {test: 'asdf'})
        } catch (error) {
            expect(error.message).toMatch('No Hero found.')
        }
    })

    it('Should update a Hero in the database with the provided id', async() => {
        const updatingData = {power: "Ultra Speed"}
        await update(DEFAULT_HERO.id, updatingData)
        const expected = [
            {...DEFAULT_HERO, power: 'Ultra Speed'}
        ]
        const received = await list({id: DEFAULT_HERO.id})

        expect(received).toStrictEqual(expected)
    })

    it('Should delete a hero from the database with the provided id', async() => {
        const expected = await list({name: 'Batman'})
        await remove(DEFAULT_HERO.id)
        const received = await list()

        expect(received).toStrictEqual(expected)
    })

    it('Should delete all heroes of the database', async() => {
        const expected = []
        await remove()
        const received = await list()

        expect(received).toStrictEqual(expected)
    })
})