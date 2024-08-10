import axios from 'axios';
window.axios = axios;

window.

window.$http = {
    httpRequest: (method='GET', headers={}, url, data={}, authRoute=false) => {
        return new Promise((resolve, reject) => {

            let config = {
                method: method,
                url: url
            }

            if(Object.keys(headers).length > 0) {
                config.headers = headers;
            }

            if(Object.keys(data).length > 0) {
                config.data = data;
            }

            axios(config).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                if(error.response.status == 401 && authRoute) {

                }
                reject(error);
            });

        })
    }
};
