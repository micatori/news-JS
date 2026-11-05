import AppLoader from './appLoader';
import type { NewsItem } from '../view/news/news';
import type { SourceItem } from '../view/sources/sources';

enum ApiEndpoint {
    Sources = 'mocks/sources',
    Everything = 'mocks/everything',
}

interface NewsResponse {
    articles?: NewsItem[];
}

interface SourcesResponse {
    sources?: SourceItem[];
}

type NewsCallback = (data: NewsResponse) => void;
type SourcesCallback = (data: SourcesResponse) => void;

class AppController extends AppLoader {
    getSources(callback: SourcesCallback): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: NewsCallback): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
