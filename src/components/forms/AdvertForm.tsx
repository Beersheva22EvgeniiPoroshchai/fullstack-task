import React, { ReactNode, useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert, Typography } from '@mui/material';


import InputResult from "../../model/InputResult";
import Advert from "../../model/Advert"
import {categoryConfig} from "../../config/category-config";
import { advActions } from "../../redux/slices/objectSlice";
import { useDispatch } from "react-redux";

let categories: any[] = [];
categoryConfig.forEach((__, key) => {
    categories.push(key);
}) 
    
type Props = {
    submitFn: (adv: Advert) => Promise<InputResult>,
    advertUpdated?: Advert
}

const initialAdvert: Advert = {
     id: 0, name: '', category: '', price: 0, data: ''
 };

export const AdvertForm: React.FC<Props> = ({ advertUpdated }) => {
    
    const [advert, setAdvert] = useState<Advert>(advertUpdated || initialAdvert);
    const [detailForm, setDetailForm] = useState<ReactNode>();
    const dispatch = useDispatch();
    

    function handlerName(event: any) { 
        const name = event.target.value;
        const advCopy = { ...advert };
        advCopy.name = name;
        setAdvert(advCopy);
    }

    function handlerPrice(event: any) {
        const price = event.target.value;
        const advCopy = { ...advert };
        advCopy.price = price;
        setAdvert(advCopy);
    }

    function handlerCategory(event: any) { 
        const category = event.target.value;
        const advCopy = { ...advert };
        advCopy.category = category;
        setAdvert(advCopy);
    }


    function onSubmitFn (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const baseObj: Advert = {
            category: advert.category,
            name: `${data.get("name")}`,
            price: +`${data.get("price")}`
        }
        if (advert) {
        baseObj.id = advert.id;
        baseObj.data = advert.data;    
    }

    dispatch(advActions.set(baseObj));
    setDetailForm(categoryConfig.get(advert.category));
}

    function onResetFn(event: any) {
        setAdvert(advertUpdated || initialAdvert);
        setDetailForm(<Box></Box>)
    }

    return <Box sx={{ marginTop: { sm: "8vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={3} justifyContent="center">
             <Grid item xs={12} >
                    <Typography className="shopTitle"
                       
                        variant="h6"
                        component="div"
                        fontSize={25}
                        
                    >
                        {advertUpdated ? 'Update advert form' : 'Add Advert form' }
                        
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={5} >
                    <TextField name = "name" type="text" required fullWidth label="Name of advert"
                        helperText={!advert.name.length ? 'name is required' : "enter a name of advert"}
                        onChange={handlerName}
                        defaultValue={advert.name}
                        />
                </Grid>


                <Grid item xs={8} sm={4} md={5} >
                    <TextField name = "price" label="Price" fullWidth required
                        type="number" onChange={handlerPrice}
                        defaultValue={advert.price || ''}
                        helperText={`enter a price of advert`}
                        />
                </Grid>

                 <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Category</InputLabel>
                        <Select labelId="select-department-id" label="Category"
                            defaultValue={advert.category} onChange={handlerCategory}>
                              {categories.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

            
        </Grid>

        <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
            <Button type="submit" >Submit</Button>
            <Button type="reset">Reset</Button>
        </Box>



    </form>
    {detailForm}
    </Box >
}


