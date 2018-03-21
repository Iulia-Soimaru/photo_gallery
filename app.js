// https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ebc7e0bc0d4517a47c79db1e1bc449b1&photoset_id=72157650609588450&format=json
class Flickr {
  constructor() {
    this.photo = [];
    this.stat = null;
  }

  static api() {
    const restApi = 'https://api.flickr.com/services/rest/';
    const method = 'flickr.photosets.getPhotos';
    const apiKey = '8fbbeac186b0ccc02fac8f1d27ec85e8';
    const photosetId = '72157646084694683';
    const format = 'json';
    const callback = 'jsonFlickrApi';
    return restApi.concat(`?method=${method}&api_key=${apiKey}&photoset_id=${photosetId}&format=${format}&callback=${callback}`)
  }

  init = () => {
    let elm = document.createElement('script');
    elm.setAttribute('type', 'text/javascript');
    elm.src = Flickr.api();
    document.body.appendChild(elm);
  }

  jsonFlickrApi = (json) => {
    console.log(json)
    this.photo.push(json['photoset']['photo']);
    this.stat = json['stat'];
  }
}

class Gallery {
  constructor() {
    this.flickr = new Flickr();
    window.jsonFlickrApi = this.flickr.jsonFlickrApi;
    this.flickr.init();
  }

  buildImageUrl = (photoObj) => {
    const src = `http://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`;
    return src;
  }
}

let gallery = new Gallery();
console.log('gallery: ', gallery)
