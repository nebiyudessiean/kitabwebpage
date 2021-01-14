import http from "../http-common";

class BookDataService {
  getTopRead(token) {
    return http.get("/topBooks",token);
  }
  getAll(token){
    return http.get("books",token);
  }

 
  addBook(data,token) {
    return http.post("/books", data,token);
  }

  update(id, data) {
    return http.put(`/books/${id}`, data);
  }

  delete(id) {
    return http.delete(`/books/${id}`);
  }

  deleteAll() {
    return http.delete(`/books`);
  }

  findByName(title) {
    return http.get(`/books?title=${title}`);
  }
}

export default new BookDataService();