// Patch Fetch API
const fetchAPI = require('node-fetch');
if (!global.fetch) {
    global.fetch = fetchAPI;
    global.Response = fetchAPI.Response;
    global.Headers = fetchAPI.Headers;
    global.Request = fetchAPI.Request;
}
