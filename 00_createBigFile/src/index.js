import { randomUUID } from 'node:crypto';
import { Readable, Transform } from 'node:stream'
import { createWriteStream } from 'node:fs'

function* createData() {
    for (let index = 0; index < 1e7; index++) {
        const data = {
            id: randomUUID(),
            name: `Luan Lopes-${index}`
        }

        yield data
    }
}

const readable = Readable({
    read() {
        for (const data of createData()) {
            this.push(JSON.stringify(data))
        }
        this.push(null)
    }
})

const transform = Transform({
    transform(chunk, enc, cb) {
        const data = JSON.parse(chunk.toString())
        data.time = new Date()

        cb(null, JSON.stringify(data).concat('\n'))
    }
})

readable
.pipe(transform)
.pipe(createWriteStream('fakeBigFile.txt'))