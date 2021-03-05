// https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
// https://github.com/ipfs/js-ipfs/tree/master/examples
// https://www.jsdelivr.com/package/npm/ipfs
// https://cdnjs.com/libraries/ipfs
//const Ipfs = require('./libs/ipfs-0.54.3-rc.5-index.min')

const lib = {

rand58: len => String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(len)).map(x => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.charCodeAt(x % 58))),

}

class chat {

constructor(opt) {
    this.opt = opt
    if (npm_package_name)    this.name    = npm_package_name
    if (npm_package_version) this.version = npm_package_version
    if (npm_package_date)    this.date    = npm_package_date
}

async create(room) {
    this.room = typeof room === 'string' ? room : lib.rand58(20) //'QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY' // 46
    this.repo = lib.rand58(12) // ipfs-' + Math.random()
    console.log(this)
    this.node = await this.opt.ipfs.create({
        repo: this.repo, 
        EXPERIMENTAL: {pubsub: true},
        /*
        config: {
            Addresses: {
                Swarm: [
                    '/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star/ipfs/' + this.room
                ]
            }
        }
        */
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

// (async () => { for await (const data of chat.node.cat('QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY') ) console.log(data.toString()) } )()

/*
{
        repo: this.repo, // this.node.repo.stat().then(console.log) - repoPath
        EXPERIMENTAL: {pubsub: true},
        /*
        init: {algorithm: 'ed25519'},
        config: {
            Addresses: {
                Swarm: [
                    '/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star/ipfs/' + room.id,
                // This is a public webrtc-star server
                '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                '/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star'
              ]
            },
            // If you want to connect to the public bootstrap nodes, remove the next line
            Bootstrap: []
        },
        libp2p: {
            config: {
              transport: {
                // This is added for local demo!
                // In a production environment the default filter should be used
                // where only DNS + WSS addresses will be dialed by websockets in the browser.
                [transportKey]: {
                  filter: filters.all
                }
              }
            }
        }
    }
*/