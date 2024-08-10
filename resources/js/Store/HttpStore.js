import { defineStore } from 'pinia'
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const useHttpStore = defineStore('http', {
  actions: {
    httpRequest(method='GET', url, headers={}, data={}, authRoute=false) {
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
                    localStorage.clear()
                    location.reload();
                    return
                }
                reject(error);
            });

        })
    },
  },
})
