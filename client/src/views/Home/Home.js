import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './../Search/SearchBox'
import HomeContent from './HomeContent'
import Footer from '../Footer'
import IngredientRecomment from './IngredientRecomment'


const Home = () => {
    return (
        <Fragment>

            <Fragment>
                <div className="col-12">
                    <div className="logo_area text-center">
                        <Link to={'/'} className="app-logo">Happy Cook</Link>
                    </div>
                </div>
                <SearchBox />

                <IngredientRecomment />

                <HomeContent title={'Công thức mới nhất'} url='/recipe/getAllRecipe' />
                <HomeContent title={'Công thức phổ biến trong tuần'} url='/recipe/getPopularRecipe' />
                <HomeContent title={'Công thức từ người đã follow'} url='/recipe/getRecipeFromFollowers' />

                <Footer />
            </Fragment>
        </Fragment>
    )
}

export default Home
