const navigation = document.querySelector('.navigation-drawer');
const button = document.querySelector('.navigation-drawer-button');

button.addEventListener('click', () => {
    if (navigation.open) {
        navigation.open = false;
    } else {
        navigation.open = true;
    }
});

// If screen width is more than 600px, open the navigation drawer by default
if (window.innerWidth > 600) {
    navigation.open = true;
}