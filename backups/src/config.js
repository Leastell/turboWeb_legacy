var config = {}

// turboSQL
config.connectionInfo = 
{
    host: "turboaf.net",
    user: "turbo",
    password: "Powell4842",
    database: "turbodata"
}

const apiToken = '901a418e-ac38-4377-863c-96f88ab7c6f4'

// turboAPI
const APIport = 1016
config.APIhostname = 'http://192.168.1.16:'+APIport+'/api'
// config.APIhostname = 'http://turboaf.net:'+APIport+'/api'

module.exports = config;