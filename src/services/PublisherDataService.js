import http from "../http-common";

class PublisherDataService {
  getAll() {
    return http.get("/publisher");
  }

  get(id) {
    return http.get(`/publishers/${id}`);
  }

  create(data) {
    return http.post("/api/register", data);
  }

  update(id, data) {
    return http.put(`/publishers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/publishers/${id}`);
  }

  deleteAll() {
    return http.delete(`/publishers`);
  }

  findByName(name) {
    return http.get(`/publishers?name=${name}`);
  }
}

export default new PublisherDataService();