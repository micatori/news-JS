import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;

        if (!apiUrl) {
            throw new Error('API_URL is not defined');
        }

        super(apiUrl, {});
    }
}

export default AppLoader;
