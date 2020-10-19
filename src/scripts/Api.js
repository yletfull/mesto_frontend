export default class Api {
  constructor(options) {
    ({ baseUrl: this.baseUrl, email: this.email, password: this.password } = options);

    this.getBaseUrl = () => {
      return this.baseUrl;
    }
  }

  parseResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  loginUser(){
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
        headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
      })
      .then(res => {
        return this.parseResponce(res)
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        return 'Успешная авторизация';
    }).catch(err => console.log(err));
  }

  updateUser(data) {
    const { name, about, avatar } = data;
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, about, avatar })
    })
    .then(res => {
      return this.parseResponce(res)
    })
    .catch(err => {
        console.log(err)
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => data.user)
      .catch(err => {
        throw err;
      });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  editData(arg) {
    return fetch(`${this.baseUrl}/${arg.postfix}`, {
      method: arg.method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  setAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`,{
      method:"PATCH",
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => this.parseResponce(res))
    .catch(err => {
      throw err;
    });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`,{
      method:"PATCH",
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => this.parseResponce(res))
    .catch(err => {
      throw err;
    });
  }

  addCard(data) {
    const { name, link } = data;
    return fetch(`${this.baseUrl}/cards`, {
      method:"POST",
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({name,link})
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  deleteCard(arg) {
    return fetch(`${this.baseUrl}/cards/${arg.id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  likeAddRemove(arg) {
    return fetch(`${this.baseUrl}/cards/${arg.id}/likes`, {
      method: arg.method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }
};

