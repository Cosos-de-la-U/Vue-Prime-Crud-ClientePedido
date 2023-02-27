import axios from 'axios';

export default class Pedido {
    url = `http://localhost:8080/demo5_war_exploded`;

    getAll() {
        return axios.get(`${this.url}/pedido`)
    }

    save(pedido) {
        return axios.post(`${this.url}/pedido`, pedido)
    }

    edit(pedido) {
        return axios.put(`${this.url}/pedido?id=${pedido.id}`, pedido)
    }

    delete({id}) {
        return axios.delete(`${this.url}/pedido?id=${id}`)
    }
}