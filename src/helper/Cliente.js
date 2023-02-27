import axios from 'axios';

export default class Cliente {
    url = `http://localhost:8080/demo5_war_exploded`;

    getAll() {
        return axios.get(`${this.url}/cliente`)
    }

    save(cliente) {
        return axios.post(`${this.url}/cliente`, cliente)
    }

    edit(cliente) {
        return axios.put(`${this.url}/cliente?id=${cliente.id}`, cliente)
    }

    delete({id}) {
        return axios.delete(`${this.url}/cliente?id=${id}`)
    }
}