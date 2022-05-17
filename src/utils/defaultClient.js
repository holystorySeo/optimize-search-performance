import axios from 'axios';

const defaultClient = axios.create({
  baseURL:
    'https://daground-proxy.herokuapp.com/https://api.clinicaltrialskorea.com',
});

export default defaultClient;
