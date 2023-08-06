import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"

import Advert from "../../model/Advert";
type Props = {
    adv: Advert
    
}


function getProperty(adv: Advert): any {
     const res = [];
      const advertData = JSON.parse(adv.data!); 
      for(const key in advertData){
         res.push(
          <Typography  variant="h5" ml={7} >{`${key}: ${advertData[key]}`}</Typography>
         )  
      }
      return res
}


const AdvertCard: React.FC<Props> = ({adv}) => {
   
    
      return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent> 

          <Typography variant="h5" ml={7}>
                   id: {adv.id}
              </Typography>

              <Typography variant="h5" ml={7} >
                   name: {adv.name}
              </Typography>
             
              <Typography variant="h5" ml={7} >
                   category: {adv.category}
              </Typography>

              <Typography variant="h5" ml={7}>
                   price: {adv.price}
              </Typography>

              <Typography >
                   {getProperty(adv)}
              </Typography>
              
          </CardContent>
         
        </Card>
      );
    }
    export default AdvertCard;