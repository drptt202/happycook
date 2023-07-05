import React, { useState, useEffect, Fragment } from 'react'
import './styles/App.scss';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import UpdateAccount from './components/Profile/UpdateAccount';
import UpdatePassword from './components/Profile/UpdatePassword';
import RecipeDetails from './components/Recipes/RecipeDetails';
import RecipesList from './components/Recipes/RecipesList';
import AddRecipe from './components/AddRecipe/AddRecipe';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';


import {
  Routes,
  Route
} from 'react-router-dom';
import SearchResult from './components/Search/SearchResult';
import EditRecipe from './components/AddRecipe/EditRecipe';

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
