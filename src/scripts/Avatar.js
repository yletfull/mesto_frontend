export default class Avatar {
  constructor(data) {
    ({
      api: this.api,
      formAvatar: this.formAvatar,
      popupOpenClose: this.popupOpenClose,
      method: this.method,
      postfix: this.postfix,
      photo: this.photoElement,
      linkPhoto: this.linkPhoto,
    } = data);
  }

  setAvatar(event, button) {
    event.preventDefault();
    const data = { avatar: this.linkPhoto.value };
    this.popupOpenClose.loadingSet(button);
    this.api.setAvatar(data)
    .then((data) => this.updateAvatar(data.data))
    .then((data) => { this.popupOpenClose.loadingEnd({ button, form: this.formAvatar }); this.linkPhoto.value = ''; })
    .catch((err) => console.log(err));
  }

  updateAvatar(data) {
    this.photoElement.setAttribute('style', `background-image:url(${data.avatar})`);
  }
}