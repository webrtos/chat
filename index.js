// https://github.com/ipfs/js-ipfs/tree/master/examples
// https://www.jsdelivr.com/package/npm/ipfs
// https://cdnjs.com/libraries/ipfs
//const Ipfs = require('./libs/ipfs-0.54.3-rc.5-index.min')

// Node.js --> https://github.com/ipfs/js-ipfs/blob/master/examples/http-client-browser-pubsub/index.js
// node.js --> const IpfsHttpClient = require('ipfs-http-client')
// const uint8ArrayToString = require('uint8arrays/to-string') --> new TextDecoder().decode(data)

const lib = {

rand58: len => String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(len)).map(x => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.charCodeAt(x % 58))),
generateKey: () => window.crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-384'}, false, ['deriveBits']),
deriveBits: (privateKey, publicKey) => window.crypto.subtle.deriveBits({name: 'ECDH', namedCurve: 'P-384', public: publicKey}, privateKey, 256)

}

class chat {

constructor(ipfs) {
    if (!(typeof ipfs === 'object' && ipfs && 'create' in ipfs && typeof ipfs.create === 'function')) throw new Error('invalid Ipfs object')
    this.ipfs = ipfs
    if (npm_package_name)    this.name    = npm_package_name
    if (npm_package_version) this.version = npm_package_version
    if (npm_package_date)    this.date    = npm_package_date
}

async create(repo) {
    this.repo = typeof repo === 'string' && repo.trim().length === 12 ? repo.trim() : lib.rand58(12)
    this.node = await this.ipfs.create({repo: this.repo})
    //const status = this.node.isOnline() ? 'online' : 'offline'
    //const { cid } = await this.node.add('Hello world!')
    //const data = await this.node.cat('QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY') // 'Hello world!'
    //console.log(data) // data[0].toString()
    const { id } = await this.node.id()
    this.id = id
    return {repo: this.repo, id: id}
}

subscribe(topic, cb) {
    return this.node.pubsub.subscribe(topic, msg => cb(msg.from, new TextDecoder().decode(msg.data)))
}

unsubscribe(topic) {
    return this.node.pubsub.unsubscribe(topic)
}

publish(topic, data) {
    return this.node.pubsub.publish(topic, data)
}


}

module.exports = {
    Chat: ipfs => new chat(ipfs)
}