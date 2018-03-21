export default class Flickr {
  constructor(callback) {
    this.callback = callback;
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
    this.callback(json);
  }
}
