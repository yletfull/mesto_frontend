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

  getToken(){
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
        localStorage.setItem('token', data.token)
    })
  }

  loginUser(){
    this.getToken();
    return fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
      }  
    })
    .then(res => this.parseResponce(res))
  }


  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => this.parseResponce(res))
      .catch(err => {
        throw err;
      });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
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
    return fetch(`${this.baseUrl}/cards/like/${arg.id}`, {
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

