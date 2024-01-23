
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Update from './Pages/Update';
import AdminForm from './Pages/AdminForm';
import ProtectedRoute from './ProtectedRoute';
import UserComp from './Pages/UserComp';
import ProfilePage from './Pages/ProfilePage';

function App() {

  <ProtectedRoute/>

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/update' element={<ProtectedRoute><Update/></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute><AdminForm/></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
