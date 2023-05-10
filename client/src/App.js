import React, { useState, useEffect, Fragment } from 'react'
import './styles/App.scss';
import Login from './views/Account/Login';
import Register from './views/Account/Register';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';
import UpdateAccount from './views/Profile/UpdateAccount';
import UpdatePassword from './views/Profile/UpdatePassword';
import RecipeDetails from './views/Recipes/RecipeDetails';
import RecipesList from './views/Recipes/RecipesList';
import AddRecipe from './views/AddRecipe/AddRecipe';
import { ToastContainer } from 'react-toastify';
import NavBar from './views/NavBar';


import {
  Routes,
  Route
} from 'react-router-dom';
import SearchResult from './views/Search/SearchResult';
import EditRecipe from './views/AddRecipe/EditRecipe';

function App() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('isLogin')) {
      setIsLogin(false)
    } else {
      setIsLogin(sessionStorage.getItem('isLogin') !== "false")
    }
  }, [isLogin])
  return (
    <div className="App add-recipe-body">
      {isLogin && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLogin ? <Home /> : <Login />} />
        <Route path="/home" element={isLogin ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:authId" element={<Profile />} />
        <Route path="/updateID" element={<UpdateAccount />} />
        <Route path="/changepassword" element={<UpdatePassword />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path='/recipedetails/:recipeId' element={<RecipeDetails />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/search/:search" element={<SearchResult />} />
        <Route path="/editrecipe/:recipeId" element={<EditRecipe />} />
      </Routes>
      <ToastContainer theme='colored' />

    </div>
  );
}

export default App;
