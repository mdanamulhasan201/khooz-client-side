//axios input (root)
//http request handle (axios bar bar input korar dorkar probe na )

import axios from "axios";
const api = axios.create({// function
    baseURL: 'http://localhost:5000/api' //backend url

});

export default api
