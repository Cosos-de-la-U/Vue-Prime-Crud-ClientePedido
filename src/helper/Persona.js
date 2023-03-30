import axios from "axios";

export default class persona {
  url = `http://localhost:8080/JPA-JAVA-1.0-SNAPSHOT`;

  getAll() {
    return axios.get(`${this.url}/persona`);
  }

  save(persona) {
    return axios.post(`${this.url}/persona`, persona);
  }

  edit(persona) {
    return axios.put(`${this.url}/persona`, persona);
  }

  delete({ id }) {
    return axios.delete(`${this.url}/persona?id=${id}`);
  }
}
