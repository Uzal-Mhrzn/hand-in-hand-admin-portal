import Axios from "./admin-axios-interceptor";

export async function Fetch(url: string, params: any = null, query: any = {}) {
    // Build query string if there are query parameters
    if (Object.keys(query).length > 0) {
        const queryString = Object.entries(query)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');
        url += `?${queryString}`;
    }

    // Make the GET request using axios
    return Axios.get(url, params)
        .then(response => response.data)
        .catch(error => {
            console.error('Error in GET request:', error);
            throw error;
        });
}

export async function Post(url: string, body: any = {}, params: any = null) {
    console.log(body);
    // Make the GET request using axios
    return Axios.post(url, body, params)
        .then(response => response.data)
        .catch(error => {
            console.error('Error in POST request:', error);
            throw error;
        });
}

export async function Delete(url: string, params: any =null) {
    return Axios.delete(url, params)
        .catch(error => {
            console.error('Error in DELETE request:', error);
            throw error;
        });

}