export default class Card {
  constructor(data) {
    ({ api: this.api, userInfo: this.userInfo, rootSection: this.template, deleteCard: this.deleteCardServer } = data)
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.zoomImg = this.zoomImg.bind(this);
  }

  createCard(cardInf) {
    this.userId = cardInf.userId;
    this.cardInf = cardInf;
    this.cardElement = this.getTemplate(this.cardInf);
    this.setEventListeners();
    return this.cardElement;
  }

  setEventListeners() {
    if (this.cardElement.querySelector('.place-card__delete-icon')) { this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove); }//      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.zoomImg);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
  }

  getTemplate(data) {
    const template = document.createElement("div");
    template.classList.add('place-card');
    template.insertAdjacentHTML('afterbegin', `<div class="place-card__image">
              <button class="place-card__delete-icon"></button>
          </div>
          <div class="place-card__description">
              <h3 class="place-card__name"></h3>
              <div class="place-card__like-place">
                <button class="place-card__like-icon"></button>
                <h3 class="place-card__likes-count"></h3>
              </div>
          </div>`);

    template.querySelector(".place-card__likes-count").textContent = data.likes.length;
    template.querySelector(".place-card__name").textContent = data.name;
    template.querySelector(".place-card__image").style.backgroundImage = `url(${data.link})`;
    template.querySelector(".place-card__image").setAttribute('url', data.link);
    template.querySelector(".place-card__image").setAttribute('key', data.link);
    template.querySelector(".place-card__image").setAttribute('name', data.name);
    template.querySelector(".place-card__image").setAttribute('id', data._id);
    this.likeCount = template.querySelector(".place-card__likes-count");
    if (this.cardInf.likes.find(id => id === this.userId)) { template.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');
    const button = template.querySelector('.place-card__delete-icon');
    button.closest("div").removeChild(button); 
    };
    return template;
  }

  like(event) {
    event.stopPropagation();
    this.key = event.target;
    if (this.key.classList.contains('place-card__like-icon_liked') === false) { this.api.likeAddRemove({ id: this.cardInf._id, method: 'PUT' }).then(data => { event.target.classList.add('place-card__like-icon_liked'); this.likeCount.textContent = (data.likes.length); }) }
    if (this.key.classList.contains('place-card__like-icon_liked') === true) { this.api.likeAddRemove({ id: this.cardInf._id, method: 'DELETE' }).then(data => { event.target.classList.remove('place-card__like-icon_liked'); this.likeCount.textContent = (data.likes.length); }) }
  }

  remove(event) {
    event.stopPropagation();
    if (confirm('Вы действительно хотите удалить карту?')) {
      this.api.deleteCard({ id: this.cardInf._id }).then((data) => { this.cardElement.parentNode.removeChild(this.cardElement); });
    }
  }

  zoomImg() {
    this.value = { link: this.cardInf.link, name: this.cardInf.name };
    this.openImagePopup(this.value);
  }

};

