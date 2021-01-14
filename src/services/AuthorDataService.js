import http from "../http-common";

class AuthorDataService {
  getAll(token) {
    return http.get("/authors",token);
  }

  get(id) {
    return http.get(`/authors/${id}`);
  }

  create(data) {
    return http.post("/authors", data);
  }

  update(id, data) {
    return http.put(`/authors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/authors/${id}`);
  }

  deleteAll() {
    return http.delete(`/authors`);
  }

  findByName(name) {
    return http.get(`/authors?name=${name}`);
  }
}

export default new AuthorDataService();