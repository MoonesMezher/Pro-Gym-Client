import api from './config';

const apiService = {
    get: (url, params) => api.get(url, { params }),
    post: (url, data, config) => api.post(url, data, config),
    put: (url, data) => api.put(url, data),
    delete: url => api.delete(url),
    postFile: (url, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default apiService;