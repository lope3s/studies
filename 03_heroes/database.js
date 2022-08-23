const { readFile, writeFile } = require('node:fs/promises')

class Database {
    constructor(FILE_NAME) {
        this.FILE_NAME = FILE_NAME
        this.list = this.list.bind(this)
        this.getDatabaseData = this.getDatabaseData.bind(this)
        this.create = this.create.bind(this)
        this.remove = this.remove.bind(this)
        this.update = this.update.bind(this)
    }

    async getDatabaseData() {
        const dbData = await readFile(this.FILE_NAME, 'utf-8')
        return JSON.parse(dbData.toString())
    }

    async list(where) {
        const heroes = await this.getDatabaseData()

        if (where) {
            const filteredHeroes = heroes.filter(hero => {
                let filter = false
                Object.entries(where).forEach(([key, value]) => {
                    if (hero[key] === value) return filter = true
                    filter = false
                })

                return filter
            })

            return filteredHeroes
        }

        return heroes
    }

    async create(hero) {
        const heroes = await this.getDatabaseData()
        const updatedHeroes = [...heroes, hero]
        writeFile(this.FILE_NAME, JSON.stringify(updatedHeroes))
    }

    async remove(id) {
        if (id) {
            const databaseData = await this.getDatabaseData()
            const newDatabaseData = databaseData.filter(hero => hero.id !== id)
            writeFile(this.FILE_NAME, JSON.stringify(newDatabaseData))
            return
        }

        writeFile(this.FILE_NAME, JSON.stringify([]))
    }

    async update(id, data) {
        if (!id) throw new Error('No id provided.')
        if (!data) throw new Error ('No data provided.')

        const databaseData = await this.getDatabaseData()
        let updatedData = false
        const newDatabaseData = databaseData.map(hero => {
            if (hero.id === id){
                updatedData = true
                return {...hero, ...data}
            }
            return hero
        })

        if (!updatedData) throw new Error('No Hero found.')

        writeFile(this.FILE_NAME, JSON.stringify(newDatabaseData))
    }
}

module.exports = Database;