
export default class CardList {

  constructor(data) {
    ({api:this.api, cardContainer: this.cardContainer, createCard: this.createCard}=data);
    this.addCard = this.addCard.bind(this);
  }

  render(data) {
    this.userId = data.user._id;
    this.cardArray = data.cards;
    console.log(this.cardArray)
    this.cardArray.forEach(function (value) {
      value.userId = data.user._id;
        const card = this.createCard(value);
        this.cardContainer.appendChild(card);
    }, this);
  }

  addCard(data) {
    const id = this.userId;
    this.name = data.name;
    this.link = data.link;
    this.value = { name: this.name, link: this.link };
   return this.api.addCard(this.value)
      .then((value) => {
        let card = this.createCard(value[0]);
        card = this.cardContainer.appendChild(card);
        return card;
      })
      .catch((err) => console.log(err))
  }
};
