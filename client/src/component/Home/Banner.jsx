import Carausel from 'react-multi-carousel'

import { bannerData } from './../../Constants/data'
import { styled } from '@mui/material'
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const BannerImg = styled('img')( ({theme}) =>({
    width: "100%",
    height: 280,
    [theme.breakpoints.down('md')] : {
        objectFit : 'cover',
        height : 180
    }
}))

const Banner = () => {
    return (
        <Carausel 
            responsive={responsive} 
            swipeable={false}
            draggable={false} 
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px" 
            containerClass="carousel-container"
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            slidesToSlide={1}
            keyBoardControl={true}
        >
            {
                bannerData.map((data, idx) => (
                    <BannerImg key={idx} src={data.url} alt="banner" />
                ))
            }
        </Carausel>
    )
}

export default Banner