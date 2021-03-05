// https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
// https://github.com/ipfs/js-ipfs/tree/master/examples
const Ipfs = require('./libs/ipfs-0.54.3-rc.5-index.min')

class chat {

constructor(opt) {
    this.opt = opt
    if (npm_package_name)    this.name    = npm_package_name
    if (npm_package_version) this.version = npm_package_version
    if (npm_package_date)    this.date    = npm_package_date
    //
    this.ipfs = Ipfs
}

test() {
    return this.opt
}

}

module.exports = {
    Chat: opt => new chat(opt)
}