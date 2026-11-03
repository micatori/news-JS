interface RequestConfig {
    endpoint: string;
    options?: RequestOptions;
}

type RequestOptions = Record<string, string>;

type ResponseCallback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams(urlOptions);

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: ResponseCallback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data: unknown) => callback(data as T))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
