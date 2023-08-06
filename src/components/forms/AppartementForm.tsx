import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import InputResult from "../../model/InputResult"
import Advert from "../../model/Advert"
import { useState } from "react"
import { advertsService } from "../../config/service-config"

import additPropConf from "../../config/additional-properties-config.json"
import { useSelectorAdv } from "../../redux/store"
import { AppartmentDetails } from "../../model/AppartmentDetails"

const {appartementTypes} = additPropConf;

type Props = {
    submitFn: (adv: Advert) => Promise<Advert>
    //advertUpdated?: Advert
}



export const AppartementForm: React.FC<Props> = ({submitFn}) => {

     const baseObj:Advert = useSelectorAdv()
     const [taxProp,setTaxProp] = useState<"yes"|"no">("yes");
     const [offerType,setOfferType] = useState<"rent"|"sale">("rent");
     const [appartType,setAppartype] = useState("");
     
    
    async function onSubmitFn(event: any) {

        event.preventDefault();
        const copyBaseObj:Advert = JSON.parse(JSON.stringify(baseObj));
      //  const data = new FormData(event.currentTarget);
        const detailObj: AppartmentDetails = {
            tax:taxProp,
            offerType:offerType,
            appartementTypes:appartType 
        }
        copyBaseObj.data = JSON.stringify(detailObj);
        submitFn(copyBaseObj)
        window.location.href = "http://localhost:3000/";
       
   
     }



return <Box sx={{ marginTop: { sm: "8vh" } }}>
        <form
          onSubmit={onSubmitFn} 
        //   onReset={onResetFn}
         >
            <Grid container spacing={3} justifyContent="center">
             <Grid item xs={12} >
                    <Typography className="shopTitle"
                        variant="h6"
                        component="div"
                        fontSize={25}
                >
                        Additional properties for appartements advert 
                        
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Appartements type</InputLabel>
                        <Select labelId="select-appartements-type-id" label="Appartements type"
                            // defaultValue={advert.category}
                             onChange={(event:SelectChangeEvent)=> setAppartype(event.target.value)}
                            >
                            {/* <MenuItem value=''>None</MenuItem> */}
                            {appartementTypes.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={4} sm={4} md={4}>
                    <FormControl 
                    // required error={!!errorMessage}
                    >
                        <FormLabel id="offer-type-group-label">Offer Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="offer-type-group-label"
                            defaultValue=""
                            value={offerType || ''}
                            name="radio-buttons-group"
                        //    row onChange={genderHandler}
                        >
                            <FormControlLabel onClick={()=>setOfferType("rent")} value="rent" control={<Radio />} label="Rent"
                            // disabled = {!!employeeUpdated}
                             />
                            <FormControlLabel onClick={()=>setOfferType("sale")} value="sale" control={<Radio />} label="Sale"
                            //  disabled = {!!employeeUpdated}
                             />
                            <FormHelperText>
                                {/* {errorMessage} */}
                                </FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
        </Grid>



        <Grid item xs={4} sm={4} md={4} sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                    <FormControl 
                    // required error={!!errorMessage}
                    >
                        <FormLabel id="tax-type-group-label">Tax</FormLabel>
                        <RadioGroup
                            aria-labelledby="tax-type-group-label"
                            defaultValue=""
                            value={taxProp || ''}
                            name="radio-buttons-group"
                        //    row onChange={genderHandler}
                        >
                            <FormControlLabel onClick={()=>setTaxProp("yes")} value="yes" control={<Radio />} label="Yes"
                            // disabled = {!!employeeUpdated}
                             />
                            <FormControlLabel onClick={()=>setTaxProp("no")} value="no" control={<Radio />} label="No"
                            //  disabled = {!!employeeUpdated}
                             />
                            <FormHelperText>
                                {/* {errorMessage} */}
                                </FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
    


        <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
            <Button type="submit" >Submit</Button>
            <Button type="reset">Reset</Button>
        </Box>



    </form>

    </Box >
   
   

}

