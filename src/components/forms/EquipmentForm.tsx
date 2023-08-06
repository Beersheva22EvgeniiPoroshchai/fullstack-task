import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import InputResult from "../../model/InputResult"
import Advert from "../../model/Advert"
import { useState } from "react"

import equipmTypeConf from "../../config/additional-properties-config.json"
import { useSelectorAdv } from "../../redux/store"
import { EquipmentDetails } from "../../model/EquipmentDetails"


const {equipmentType} = equipmTypeConf;


type Props = {
    submitFn: (adv: Advert) => Promise<Advert>
    //advertUpdated?: Advert
}

export const EquipmentForm: React.FC<Props> = ({submitFn}) => {

     const baseObj:Advert = useSelectorAdv();
     const [stateProp,setStateProp] = useState<"new"|"used">("new");
     const [eqType,setEqType] = useState("");
     
    
    async function onSubmitFn(event: any) {

        event.preventDefault();
        const copyBaseObj:Advert = JSON.parse(JSON.stringify(baseObj));
      //  const data = new FormData(event.currentTarget);
        const detailObj: EquipmentDetails = {
            state :stateProp,
            equipmentmentTypes:eqType 
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
                        Additional properties for equipment advert 
                        
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Equipmen type</InputLabel>
                        <Select labelId="select-appartements-type-id" label="Appartements type"
                            // defaultValue={advert.category}
                             onChange={(event:SelectChangeEvent)=> setEqType(event.target.value)}
                            >
                            {/* <MenuItem value=''>None</MenuItem> */}
                            {equipmentType.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={4} sm={4} md={4}>
                    <FormControl 
                    // required error={!!errorMessage}
                    >
                        <FormLabel id="offer-type-group-label">State</FormLabel>
                        <RadioGroup
                            aria-labelledby="offer-type-group-label"
                            defaultValue=""
                            value={stateProp || ''}
                            name="radio-buttons-group"
                        //    row onChange={genderHandler}
                        >
                            <FormControlLabel onClick={()=>setStateProp("new")} value="new" control={<Radio />} label="New"
                            // disabled = {!!employeeUpdated}
                             />
                            <FormControlLabel onClick={()=>setStateProp("used")} value="used" control={<Radio />} label="Used"
                            //  disabled = {!!employeeUpdated}
                             />
                            <FormHelperText>
                                {/* {errorMessage} */}
                                </FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
        </Grid>

        <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
            <Button type="submit" >Submit</Button>
            <Button type="reset">Reset</Button>
        </Box>



    </form>

    </Box >
   
   

}

