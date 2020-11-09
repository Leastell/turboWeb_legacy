const axios = require("axios")
const config = require("../config.js")

const getNicknames = async userIDs => {

    let result = await axios({
        method: 'post',
        url: config.APIhostname+'/discord/nicknames',
        data : {
            userIDs: userIDs
        }
    })

    return result.data;

}

export { getNicknames }