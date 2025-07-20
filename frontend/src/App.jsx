import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Welcome from "./pages/Welcome";
import BookList from "./pages/BookList";
import BookFormPage from "./pages/BookFormPage";
import BookForm from "./components/BookForm";


function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/add-book" element={<BookFormPage />} />
        <Route path="/book-list" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-book/:id" element={<BookForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
