import http from "../http-common";

class BookDataService {
  getTopRead(token) {
    return http.get("/topBooks",token);
  }
   async getAll(token){
    return await http.get("/books",token);
  }
async getBookByTitle(title){
  return await http.get('/books',title);
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

  findByTitle(title) {
    return http.get(`/books?title=${title}`);
  }
}

export default new BookDataService();