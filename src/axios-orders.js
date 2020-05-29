import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://sandwich-maker-4929b.firebaseio.com/'
});

export default instance