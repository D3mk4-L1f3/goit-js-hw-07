import { galleryItems } from './gallery-items.js';
// Change code below this line

const ulElement = document.querySelector('.gallery');
function galleryCreate(items) {
    return items
        .map(({ preview, original, description }) => ` 

    <li class="gallery__item">
     <a class="gallery__link" href="${original}">
        <img class="gallery__image "
         src="${preview}" 
         alt="${description}" 
         data-source="${original}">
     </a>
    </li>`

        ).join('');
};

ulElement.insertAdjacentHTML('beforeend', galleryCreate(galleryItems));
ulElement.addEventListener('click', handleTargetButtonClick);

function handleTargetButtonClick(event) {
    event.preventDefault();
    const { target } = event;
    if (!target.classList.contains('gallery__image')) {
        return;
    
    };

    const largeImg = target.dataset.source;
    const description = target.alt;
    
    const instance = basicLightbox.create(
    `<img src="${largeImg}" alt="${description}">`,
        {
            onShow: () => document.addEventListener('keydown', handleTargetPressKey),
            onClose: () => document.removeEventListener('keydown', handleTargetPressKey)
        }
    );

    instance.show();

    function handleTargetPressKey(event) {
        if (event.code === 'Escape') {
            instance.close();
        }
    }
};
