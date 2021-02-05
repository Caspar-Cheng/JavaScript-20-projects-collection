const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

let count = 5
const apiKey = 'Your_api_key'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 15;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
};


// Function to set attributes on DOM elments
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};


// Display photos provided via unsplash

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach(photo => {
        // create <a> to link the unsplash images
        const item = document.createElement('a');

        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');  //same as below
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create image for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // use event listener to check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> and then put both of them inside imageContainer 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};


// Get photos from unsplash api

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        
    }
}

// Check if scrolling near bottom of the page and then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
