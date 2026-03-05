const width = 900;

const navigation = document.querySelector('.navigation-drawer');
const button = document.querySelector('.navigation-drawer-button');

function openNavigationDrawerForce() {
    navigation.open = true;
}

function freshNavigationDrawer() {
    navigation.setAttribute('open', window.innerWidth > width);
}

button.addEventListener('click', () => openNavigationDrawerForce());

freshNavigationDrawer();

const resizeObserverNavigation = new ResizeObserver(entries => {
  freshNavigationDrawer();
});

resizeObserverNavigation.observe(document.body);