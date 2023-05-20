import { Grid, styled } from "@mui/material";
import { imageURL } from "../../Constants/data";

const GridWrapper = styled(Grid)`
    margin-top : 10px;
    justify-content : space-between;
`

const Image = styled('img')(({theme})=> ({
    marginTop : 10,
    width : '100%',
    display : 'flex',
    justifyContent : 'space-between',
    [theme.breakpoints.down('md')] : {
        objectFit : 'cover',
        height : 120
    }
}))

const MidSection = () => {
    const imageUrl = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
            {/* <Box style={{ display: 'flex' }}> */}
            <GridWrapper lg={12} sm={12} md={12} xs={12} container>
                {
                    imageURL.map((image, key) => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <img src={image} alt={`image - ${key}`} style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
            </GridWrapper>
            <Image src={imageUrl} alt="image" />
            {/* </Box> */}
        </>
    )
}

export default MidSection;