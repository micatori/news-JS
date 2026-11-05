import News, { type NewsItem } from './news/news';
import Sources, { type SourceItem } from './sources/sources';

interface NewsResponse {
    articles?: NewsItem[];
}

interface SourcesResponse {
    sources?: SourceItem[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
