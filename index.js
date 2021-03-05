// https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
// https://github.com/ipfs/js-ipfs/tree/master/examples
// https://www.jsdelivr.com/package/npm/ipfs
// https://cdnjs.com/libraries/ipfs
//const Ipfs = require('./libs/ipfs-0.54.3-rc.5-index.min')

class chat {

constructor(opt) {
    this.opt = opt
    if (npm_package_name)    this.name    = npm_package_name
    if (npm_package_version) this.version = npm_package_version
    if (npm_package_date)    this.date    = npm_package_date
}

async create(room) {
    this.room = typeof room === 'string' ? room : 'room-' + Math.floor(Math.random() * 1e15).toString(36)
    this.repo = Math.floor(Math.random() * 1e15).toString(36) + Math.floor(Math.random() * 1e15).toString(36)
    this.node = await this.opt.ipfs.create({
        repo: this.repo,
        //init: {algorithm: 'ed25519'}
    })
    //const status = this.node.isOnline() ? 'online' : 'offline'
    //const { cid } = await node.add('Hello world!')
    //const data = await node.cat('QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY') // 'Hello world!'
    //console.log(data) // data[0].toString()
    return {room: this.room, repo: this.repo}
}

}

module.exports = {
    Chat: opt => new chat(opt)
}