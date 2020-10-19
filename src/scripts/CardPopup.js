export default class CardPopup{
    constructor(data){
      ({cardList:this.cardList, popup: this.popup, popupOpenClose: this.popupOpenClose, form: this.form} = data)
      this.placeName = this.form.elements.name;
      this.link = this.form.elements.link;
    }
    
    addCard(event,button){
      event.preventDefault();
      this.popupOpenClose.loadingSet(button);
      this.cardList.addCard({name: this.placeName.value,link: this.link.value})
        .then(()=>{return this.popupOpenClose.loadingEnd({button,form:this.popup})
          }).catch((err) => console.log(err))
    }
};

