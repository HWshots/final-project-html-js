import homeAction from './pages/home.js'
import ticketsAction from './pages/tickets.js'
import holidaysAction from './pages/holidays.js'
import tvAction from './pages/tv.js'
import loginAction from './pages/login.js'

const routerContainer = document.querySelector('main');

const routes = {
    '/': {
        template: 'home',
        action: homeAction
    },
    '/holidays': {
        template: 'holidays',
        action: holidaysAction,
    },
    '/tickets': {
        template: 'tickets',
        action: ticketsAction,
    },
    '/tv': {
        template: 'tv',
        action: tvAction,
    },
    '/login': {
        template: 'login',
        action: loginAction,
    }
};

function init() {
    processInternalLinks(document);
    load('/');
}

function back() {
    load(window.location.pathname);
}

function processInternalLinks(container) {
    container
        .querySelectorAll('[data-internal]')
        .forEach(link => link.addEventListener('click', handleInternalLink));
}

function handleInternalLink(event) {
    event.preventDefault();
    const target = this.href;
    navigate(target);
}

function navigate(url) {
    window.history.pushState(null, null, url);
    const route = new URL(url).pathname;
    load(route);
}

function load(route) {
    const data = routes[route];
    render(data.template)
        .then((viewContent) => {
            data.action(viewContent);
            processInternalLinks(viewContent);
        });
}

function render(template) {
    return fetch(`templates/${template}.html`)
        .then(res => res.text())
        .then(display);
}

function display(content) {
    routerContainer.innerHTML = content;
    return routerContainer;
}

window.addEventListener('load', init);
window.addEventListener('popstate', back);