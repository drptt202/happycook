import axiosCustom from "../utils/axiosCustom";

export const getIngredientBySeason = axiosCustom.get('/ingredient/getIngredientBySeason')

export const getAuthor = axiosCustom.get('/auth')

export const getRecipeList = axiosCustom.get('/recipeList/getRecipeList')

export const getAllRecipe = axiosCustom.get('/recipe/getAllRecipe')

export const getRecipeByUserId = (Id) => axiosCustom.get(`/recipe/getRecipeByUserId/${Id}`)

export const getRecipeBySlug = (slug) => axiosCustom.get(`/recipe/getRecipeByIngredient/${slug}`, {
    charset: 'utf-8',
    responseEncoding: 'utf8',
})

export const searchRecipe = (name) => axiosCustom.get(`/recipe/search?q=${name}`, {
    charset: 'utf-8',
    responseEncoding: 'utf8',
})

export const searchRecipeByName = (name) => axiosCustom.get(`/recipe/searchRecipe?q=${name}`, {
    charset: 'utf-8',
    responseEncoding: 'utf8',
})

export const likeClick = (item) => {
    if (item.isFavorite === false) {
        axiosCustom.post(`/favorite/create/${item.recipeId}`)
    } else {
        axiosCustom.delete(`/favorite/delete/${item.recipeId}`)
    }
}

export const bookmarkClick = (isMarked) => {
    if (isMarked) {
        alert('Bỏ món khỏi danh sách')
    } else {
        alert('Thêm món vào danh sách')
    }
}
const authId = localStorage.getItem('authId')

export const getFollowing = (Id) => axiosCustom.get(`/user/getUserFollowing/${Id}`)
export const getFollower = (Id) => axiosCustom.get(`/user/getUserFollow/${Id}`)


export const deleteRecipeList = (recipeListId) => axiosCustom.delete(`/recipeList/deleteRecipeList/${recipeListId}`)

export const deleteRecipe = (recipeId) => axiosCustom.delete(`/recipe/deleteRecipe/${recipeId}`)

export const followClick = (item) => {
    if (item.isFollow === false) {
        axiosCustom.post(`/follow/create/${item.userId}`)
    } else {
        axiosCustom.delete(`/follow/delete/${item.userId}`)
    }
}




