import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/UserProvider';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import GamePage from './pages/GamePage';
import Categories from './pages/Categories';
import AddClients from './pages/admin-routes/AddClients';
import AddCategory from './pages/admin-routes/AddCategory';
import AddTag from './pages/admin-routes/AddTag';
import AddGame from './pages/admin-routes/AddGame';
import Project from './pages/Projects';
import Contact from './pages/Contact';
import UserMessages from './pages/admin-routes/UserMessages';

function App() {
  return (

    <UserProvider>
    <BrowserRouter>
    <ToastContainer/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/projects' element={<Project/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/games/:gameId' element={<GamePage/>}/>
      <Route path='/categories/:categoryId' element={<Categories/>}/>

      {/* Private Routes */}
      <Route path='/admin' element={<PrivateRoute />}>
        <Route path='dashboard' element={<AddGame />}/>
        <Route path='add-clients' element={<AddClients/>}/>
        <Route path='add-category' element={<AddCategory/>}/>
        <Route path='add-tag' element={<AddTag/>}/>
        <Route path='messages' element={<UserMessages/>}/>

      </Route>

    </Routes>
    </BrowserRouter>
    </UserProvider>

  )
}

export default App;
