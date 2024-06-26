import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Profile from './pages/Profile/Profile';
import Carts from './pages/Carts/Carts';
import Search from './pages/Search/Search';
//style
import "./assets/scss/style.scss";
// set up react router dom
import { unstable_HistoryRouter as HistoryBrowser, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import { history } from './util/config';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrowser history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='detail' >
            <Route path=':id' element={<Detail />} />
          </Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='carts' element={<Carts />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='*' element={<Navigate to={''} />}></Route>
        </Route>
      </Routes>
    </HistoryBrowser>
  </Provider>
);
