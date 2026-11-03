import './news.css';

export interface NewsItem {
    author: string | null;
    source: {
        name: string;
    };
    urlToImage: string | null;
    publishedAt: string;
    title: string;
    description: string | null;
    url: string;
}

class News {
    draw(data: NewsItem[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News template was not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');
            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author = newsClone.querySelector('.news__meta-author');
            const date = newsClone.querySelector('.news__meta-date');
            const title = newsClone.querySelector('.news__description-title');
            const source = newsClone.querySelector('.news__description-source');
            const description = newsClone.querySelector('.news__description-content');
            const link = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (!newsItem || !photo || !author || !date || !title || !source || !description || !link) {
                throw new Error('One or more news template elements were not found');
            }

            if (idx % 2) newsItem.classList.add('alt');

            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            description.textContent = item.description;
            link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');

        if (!newsContainer) {
            throw new Error('News container was not found');
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
