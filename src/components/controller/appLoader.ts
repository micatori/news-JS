import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        if (!apiKey) {
            throw new Error('API_KEY is not defined');
        }

        super(apiUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
