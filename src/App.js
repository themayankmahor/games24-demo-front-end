import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/UserProvider';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/admin-routes/UserDashboard';
import GamePage from './pages/GamePage';
import Categories from './pages/Categories';

function App() {
  return (

    <UserProvider>
    <BrowserRouter>
    <ToastContainer/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/games/:gameId' element={<GamePage/>}/>
      <Route path='/categories/:categoryId' element={<Categories/>}/>

      {/* Private Routes */}
      <Route path='/admin' element={<PrivateRoute />}>
        <Route path='dashboard' element={<UserDashboard />}/>

      </Route>

    </Routes>
    </BrowserRouter>
    </UserProvider>

  )
}

export default App;
