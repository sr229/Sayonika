import CONFIG from './config';

function createAPIFunction(path, method){
    return function(body, arg) {
        let headers = {
            "content-type": "application/json",
        };

        if (API.env.token) {
            headers["Authorization"] = API.env.token
        }

        return fetch(
            `${CONFIG.BASE_URL}/api/${CONFIG.API_VERSION}/${path}`.replace('{0}', arg),
            {
                method,
                body: (method === "POST" ? body : null),
                headers
            }
        ).then(
            r => r.json()
        ).catch(console.error)
    }
}


let API = {
    env: {},

    login: createAPIFunction("login", "POST"),
    signup: createAPIFunction("users", "POST"),
    getUser: createAPIFunction("users/{0}", "GET"),

};

export default API;
