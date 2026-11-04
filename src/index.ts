import App from './components/app/app';
import './global.css';

const logo = document.querySelector<HTMLImageElement>('#rs-school-logo');

if (!logo) {
    throw new Error('RS School logo element was not found');
}

logo.src = new URL('./assets/rs_school.svg', import.meta.url).href;

const app = new App();
app.start();
