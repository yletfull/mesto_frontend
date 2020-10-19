export default class UserInfo {
  constructor(data) {
    ({
      api: this.api,
      formEdit: this.formEdit,
      popupOpenClose: this.popupOpenClose,
      nameInp: this.nameInp,
      aboutInp: this.aboutInp,
      name: this.name,
      about: this.about,
      postfix: this.postfix,
      method: this.method,
    } = data);
    this.nameInp.value = this.name.textContent;
    this.aboutInp.value = this.about.textContent;
  }

  setUserInfo(event, button) {
    this.button = button,
    event.preventDefault();
    const data = { name: this.nameInp.value, about: this.aboutInp.value };
    this.popupOpenClose.loadingSet(button);
    this.api.setUserInfo(data)
      .then((data) => { this.updateUserInfo(data.data) })
      .then(() => { this.popupOpenClose.loadingEnd({ button: this.button, form: this.formEdit }); })
      .catch((err) => console.log(err))
  }

  updateUserInfo(data) {
    this.nameInp.value = data.name;
    this.aboutInp.value = data.about;
    this.name.textContent = data.name;
    this.about.textContent = data.about;
    this.id = data._id;
  }
};

