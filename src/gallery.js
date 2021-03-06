export default class Gallery {
  constructor(json) {
    this.stat = json.stat;
    this.photo = json.photoset.photo;
    this.currentIndex = null;
  }

  // @params {object} photo object
  // @return {string} photo src url
  buildImageUrl = (photoObj) => {
    return `http://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`;
  }

  // @params {object} photo object
  // @return {object} photo object with {id, src, alt}
  buildImageObjForDom = (photoObj) => {
    return {
      id: photoObj['id'],
      src: this.buildImageUrl(photoObj),
      alt: photoObj['title']
    }
  }

  // @return {HTMLElement} ul, gallery list
  createGalleryList = () => {
    // create DOM elements with classNames
    const main = document.getElementById('gallery');
    const ul = document.createElement('ul');
    ul.className = 'c-gallery--list';

    main.appendChild(ul);
    return ul;
  }

  // @params {object} photo object
  // @return {HTMLElement} li, photo list item
  createGalleryItem = (photoObj) => {
    // create DOM elements with classNames
    let li = document.createElement('li');
    let img = document.createElement('img');
    li.className = 'c-gallery--item';
    img.className = 'c-gallery--image';

    let imageObj = this.buildImageObjForDom(photoObj);

    // add attributes to gallery images
    img.src = imageObj['src'];
    img.alt = imageObj['alt'];
    img.id = imageObj['id'];
    img.addEventListener('click', this.previewImage);

    li.appendChild(img);
    return li;
  }

  // @return {undefined}
  addGalleryToView = () => {
    if(this.stat === 'ok') {
      // create gallery list
      const ul = this.createGalleryList();

      // add images to gallery items
      this.photo.forEach((photoObj) => {
        let li = this.createGalleryItem(photoObj);
        ul.appendChild(li);
      });

      // add click functions to arrow in modal (prev and next)
      document.querySelector('.c-modal-arrow--left').addEventListener('click', this.previewPrev);
      document.querySelector('.c-modal-arrow--right').addEventListener('click', this.previewNext);
    } else {
      alert('Something went wrong, please refresh the page');
    }
  }

  // @params {HTMLElement} domObj
  // @params {object} photoObj
  // @return {undefined}
  changePreviewImage = (domObj, photoObj) => {
    // get DOM elements
    const modalImage = document.querySelector('.c-modal-image');
    const imageTitle = document.querySelector('.c-modal-image--title');
    const photo = domObj || this.buildImageObjForDom(photoObj);

    // update image attributes
    modalImage.src = photo.src;
    modalImage.alt = photo.alt;
    imageTitle.innerHTML = photo.alt;
    modalImage.addEventListener('click', this.closeModal);
  }

  // @params {MouseEvent} click event
  // @return {undefined}
  previewImage = (evt) => {
    const modal = document.querySelector('.c-modal');
    this.currentIndex = this.photo.findIndex(function(photoObj) {
      return photoObj.id === evt.target.id;
    });

    this.checkToDisableArrow();

    // update image src
    this.changePreviewImage(evt.target);

    // display modal
    modal.style.display = 'flex';
  }

  // @params {MouseEvent} click event
  // @return {undefined}
  closeModal = (evt) => {
    const modal = document.querySelector('.c-modal');
    modal.style.display = 'none';
  }

  // @params {HTMLElement} button, arrow element
  // @return {undefined}
  checkToDisableArrow = (element) => {
    const left = document.querySelector('.c-modal-arrow--left');
    const right = document.querySelector('.c-modal-arrow--right');

    if(this.currentIndex === 0) {
      left.classList.add('disabled');
      right.classList.remove('disabled');
      return;
    } else if(this.currentIndex === this.photo.length - 1) {
      right.classList.add('disabled');
      left.classList.remove('disabled');
      return;
    }

    left.classList.remove('disabled');
    right.classList.remove('disabled');
  }

  // @params {number} index
  // @return {undefined}
  swapImage = (index) => {
    const photoObj = this.photo[index];
    if (photoObj) {
      this.changePreviewImage(null, photoObj);
    }
  }

  // @return {undefined}
  previewPrev = () => {
    this.swapImage(this.currentIndex - 1);
    this.currentIndex -= 1;
    this.checkToDisableArrow();
  }

  // @return {undefined}
  previewNext = () => {
    this.swapImage(this.currentIndex + 1);
    this.currentIndex += 1;
    this.checkToDisableArrow();
  }
}
