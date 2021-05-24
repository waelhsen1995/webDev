const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

const initialBookmark = [{ name: 'Quote Generator', url: 'https://waelhsen1995.github.io/webDev/QuoteGenerator/' },
    { name: 'Infinity Scroll Photo', url: 'https://waelhsen1995.github.io/webDev/InfinityScroll/' },
    { name: 'Picture In Picture App', url: 'https://waelhsen1995.github.io/webDev/PictureInPicture/' },
    { name: 'Joke Teller', url: 'https://waelhsen1995.github.io/webDev/JokeTeller/' },
    { name: 'Light & Dark Mode', url: 'https://waelhsen1995.github.io/webDev/LightDarkMode/' },
    { name: 'Animated Template', url: 'https://waelhsen1995.github.io/webDev/Animated/' },
    { name: 'Navigation Nation', url: 'https://waelhsen1995.github.io/webDev/AnimatedNavigation/' },
    { name: 'Music Player', url: 'https://waelhsen1995.github.io/webDev/MusicPlayer/' },
    { name: 'Custom Count Down', url: 'https://waelhsen1995.github.io/webDev/Countdown/' },
    { name: 'Book Keeper', url: 'https://waelhsen1995.github.io/webDev/BookKeeper/' },
    { name: 'Video Player', url: 'https://waelhsen1995.github.io/webDev/VideoPlayer/' }
];
let bookmarks = [];

// Show Modal focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Build a Bookmarks
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item 
        const item = document.createElement('div');
        item.classList.add('item');
        // Class Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        closeIcon.id = 'delete-bookmark';
        //Favicon Link Container 
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}
// Vaidate Form 
function validate(nameValue, urlValue) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (nameValue === '' && (urlValue === 'https://' || urlValue === 'http://')) {
        alert('Please provide to field both fields.');
        return false;
    } else if (!(urlValue.match(regex))) {
        alert('Please provide a valid web address');
        return false;
    } else if (nameValue === '') {
        alert('Please provide a website name');
        return false;
    } else {
        // Valid
        return true;
    }
}

// Fetch Bookmarks
function fetchBookmarks() {
    //get bookmarks from localStorage if avilable
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        console.log(bookmarks);
    } else {
        //Create bookmarks array in localStorge
        bookmarks = initialBookmark;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete Bookmarks
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });
    console.log(bookmarks);
    //Update bookmarks array in localStorge ,re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}


// Modal Even Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal) ? modal.classList.remove('show-modal') : false);

// Event Listenr
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load ,Fetch Bookmarks
fetchBookmarks();
