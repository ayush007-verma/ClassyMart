import NavBar from './NavBar'
import Banner from './Banner'
import Slide from './Slide'
import MidSlide from './MidSlide'
import MidSection from './MidSection'


import { Box, styled } from '@mui/material'

import { getProducts } from '../../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import Products from '../../Constants/data copy'

const Component = styled(Box)`
    padding : 10px;
    background : #F2F2F2;
`
const Home = () => {
  // const { products } = useSelector(state => state.getProducts)
  // console.log("products1 : ", products)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getProducts())
  // }, [dispatch])
  
  let products1 = Products

  return (
    <>
      <NavBar />

      <Component>
        <Banner />
        <MidSlide products={products1} title="Deal of the Day" timer={true} />
        <MidSection />
        <Slide products={products1} title="Top Selection" timer={false} />
        <Slide products={products1} title="Season's Top Picks" timer={false} />
        <Slide products={products1} title="Discounts For You" timer={false} />
        <Slide products={products1} title="Trending Offers" timer={false} />
        <Slide products={products1} title="Recommended Items" timer={false} />
        <Slide products={products1} title="Top Deals on Apparels" timer={false} />
      </Component>
    </>
  )
}

export default Home