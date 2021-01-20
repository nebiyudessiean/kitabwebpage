import http from "../http-common";

class AuthorDataService {
  getAll(token) {
    return http.get("/authors",token);
  }
getAuthorByToken(token){
  return http.get("/authors",token)
}
  get(id) {
    return http.get(`/authors/${id}`);
  }

  create(data) {
    return http.post("/api/register", data);
  }

  update(token, author) {
    return http.put(`/authors/`, author,token);
  }

  delete(token) {
    return http.delete(`/authors/${token}`);
  }

  deleteAll(token) {
    return http.delete(`/authors`,token);
  }

  findByName(name) {
    return http.get(`/authors?name=${name}`);
  }
}

export default new AuthorDataService();