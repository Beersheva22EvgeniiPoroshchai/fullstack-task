import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import Advert from "../../model/Advert"
import { useSelectorAdv } from "../../redux/store"
import { useState } from "react"
import { VehicleDetails } from "../../model/VehicleDetails"
import { BrandingWatermark } from "@mui/icons-material"

 
    type Props = {
        submitFn: (adv: Advert) => Promise<Advert>
    }
    
    export const AutoForm: React.FC<Props> = ({submitFn}) => {

    
         const baseObj:Advert = useSelectorAdv();
         const [brandProp,setBrandProp] = useState("");
         const [modelProp,setModelProp] = useState("");
         const [yearProp,setYearProp] = useState("");
         const [colorProp,setColorProp] = useState("");
         const [odoProp,setOdoProp] = useState("");
         
        
        async function onSubmitFn(event: any) {
    
            event.preventDefault();
            const copyBaseObj:Advert = JSON.parse(JSON.stringify(baseObj));
            const data = new FormData(event.currentTarget);
           
            const detailObj: VehicleDetails = {
               
                carBrand: `${data.get("carBrand")}`,
                model: `${data.get("model")}`,
                year: `${data.get("year")}`,
                color: `${data.get("color")}`,
                odometer: `${data.get("odometer")}`,
               
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
                            Additional properties for auto advert 
                            
                        </Typography>
                    </Grid>


                    <Grid item xs={8} sm={5} >
                    <TextField name="carBrand" type="text" required fullWidth label="Brand name"
                        helperText= {"enter a name of the brand"}
                        onChange={(event) => setBrandProp(event.target.value)}
                        value={brandProp}

                        />
                </Grid>


                <Grid item xs={8} sm={5} >
                    <TextField name="model" type="text" required fullWidth label="Car model"
                        helperText= {"enter a model of the car"}
                        onChange={(event) => setModelProp(event.target.value)}
                        value={modelProp}

                        />
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField name="year" type="text" required fullWidth label="Year"
                        helperText= {"enter a year of car production"}
                        onChange={(event) => setYearProp(event.target.value)}
                        value={yearProp}

                        />
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField name="color" type="text" required fullWidth label="Color"
                        helperText= {"enter a color of the car"}
                        onChange={(event) => setColorProp(event.target.value)}
                        value={colorProp}

                        />
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField name="odometer" type="text" required fullWidth label="Odometer"
                        helperText= {"enter an odometer value"}
                        onChange={(event) => setOdoProp(event.target.value)}
                        value={odoProp}

                        />
                </Grid>
            </Grid>
    
    
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit" >Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>
    
    
    
        </form>
    
        </Box >
       
       
    
    }



