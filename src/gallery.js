export default class Gallery {
  constructor(json) {
    this.stat = json.stat;
    this.title = json.photoset.title;
    this.photo = json.photoset.photo;
  }

  buildImageUrl = (photoObj) => {
    const src = `http://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`;
    return src;
  }

  buildImageSettings = (photoObj) => {
    return {
      id: photoObj['id'],
      src: this.buildImageUrl(photoObj),
      title: photoObj['title']
    }
  }

  createGalleryList = () => {
    const main = document.getElementById('gallery');
    const ul = document.createElement('ul');
    ul.className = 'c-gallery__list';
    main.appendChild(ul);
    return ul;
  }

  createGalleryItem = (photoObj) => {
    console.log('here')
    let li = document.createElement('li');
    let img = document.createElement('img');
    let imageSettings = this.buildImageSettings(photoObj);
    li.className = 'c-gallery__item';
    img.src = imageSettings['src'];
    img.alt = imageSettings['title'];
    img.id = imageSettings['id'];
    li.appendChild(img);
    return li;
  }

  addGalleryToView = () => {
    if(this.stat === 'ok') {
      const ul = this.createGalleryList();

      this.photo.forEach((photoObj) => {
        let li = this.createGalleryItem(photoObj);
        ul.appendChild(li);
      })
    }
  }
}
