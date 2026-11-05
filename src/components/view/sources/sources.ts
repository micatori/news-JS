import './sources.css';

export interface SourceItem {
    id: string;
    name: string;
}

class Sources {
    draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Source template was not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceElement = sourceClone.querySelector('.source__item');

            if (!sourceName || !sourceElement) {
                throw new Error('One or more source template elements were not found');
            }

            sourceName.textContent = item.name;
            sourceElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');

        if (!sourcesContainer) {
            throw new Error('Sources container was not found');
        }

        sourcesContainer.append(fragment);
    }
}

export default Sources;
