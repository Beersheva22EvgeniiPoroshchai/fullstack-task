
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { categoryConfig } from "../../config/category-config";
import { useEffect, useMemo, useRef, useState } from "react";
import Adverts from "./Adverts";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatchCode, useSelectorAdverts, useSelectorAdvertsByCategory } from "../hooks/hooks";
import Advert from "../../model/Advert";
import { advertsService } from "../../config/service-config";
import InputResult from "../../model/InputResult";
import { Confirmation } from "../common/Confirmation";
import { AdvertForm } from "../forms/AdvertForm";
import { Subscription } from "rxjs";


const columnsCommon: GridColDef[] = [
     {
         field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
         align: 'center', headerAlign: 'center'
     },
     {
         field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
         align: 'center', headerAlign: 'center'
     },
     {
         field: 'category', headerName: "Category", flex: 0.8, headerClassName: 'data-grid-header',
         align: 'center', headerAlign: 'center'
     },
     {
         field: 'price', headerName: 'Price, $', flex: 0.8, headerClassName: 'data-grid-header',
         align: 'center', headerAlign: 'center'
     }
    
    ];
    
 const style = {
     position: 'absolute' as 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
 };
 
 const AdvertsbyCategory: React.FC = () => {
     const columnsActions: GridColDef[] = [
         {
             field: 'actions', headerName: 'Actions', headerClassName: 'data-grid-header', type: "actions", getActions: (params) => {
                 return [
     <GridActionsCellItem label="details" icon={<Visibility />}
                         // onClick={() => showAdvertDetails(params.id)}
                          />,
 
                     <GridActionsCellItem label="remove" icon={<Delete />}
                         onClick={() => removeAdvert(params.id)
                         } />,
                     <GridActionsCellItem label="update" icon={<Edit />}
                         onClick={() => {
                             advertId.current = params.id as any;
                             if (params.row) {
                                 const adv = params.row;
                                 adv && (advert.current = adv);
                                 setFlEdit(true)
                             }
      }
                         } />
                 ] ;
             }
         }
        ]


        let categories: any[] = [];
        categoryConfig.forEach((__, key) => {
            categories.push(key);
        }) 

     const dispatch = useDispatchCode();

     
     
const [curCategory, setCurCategory] = useState("");

        
  const adverts = useSelectorAdvertsByCategory(curCategory);
 
     const columns = useMemo(() => getColumns(), [adverts]);     
 
     const [openConfirm, setOpenConfirm] = useState(false);
     const [openEdit, setFlEdit] = useState(false);
     const title = useRef('');
     const content = useRef('');
     const advertId = useRef('');
     const confirmFn = useRef<any>(null);
     const advert = useRef<Advert | undefined>();
     function getColumns(): GridColDef[] {
         let res: GridColDef[] = columnsCommon;
        
             res = res.concat(columnsActions);
         
         return res;
     }
     function removeAdvert(id: any) {
         title.current = "Remove Advert object?";
         const advert = adverts.find(adv => adv.id == id);
         content.current = `You are going to remove advert with id ${advert?.id}`;
         advertId.current = id;
         confirmFn.current = actualRemove;
         setOpenConfirm(true);
     }
     async function actualRemove(isOk: boolean) {
         let errorMessage: string = '';
         if (isOk) {
             try {
                 await advertsService.deleteAdvert(advertId.current);
             } catch (error: any) {
                 errorMessage = error;
             }
         }
         dispatch(errorMessage, '');
         setOpenConfirm(false);
     }
 
     function updateAdvert(adv: Advert): Promise<InputResult> {
         setFlEdit(false)
         const res: InputResult = { status: 'error', message: '' };
         if (JSON.stringify(advert.current) != JSON.stringify(adv)) {
             title.current = "Update Advert object?";
             advert.current = adv;
             content.current = `You are going to update advert with id ${adv.id}`;
             confirmFn.current = actualUpdate;
             setOpenConfirm(true);
         }
         return Promise.resolve(res);
     }
     async function actualUpdate(isOk: boolean) {
        
         let errorMessage: string = '';
 
         if (isOk) {
             try {
                 await advertsService.updateAdvert(advert.current!);
             } catch (error: any) {
                 errorMessage = error
             }
         }
         dispatch(errorMessage, '');
         setOpenConfirm(false);
 
     }



     function handlerCategory(event: any) { 
        setCurCategory(event.target.value)
    
      }


     return <Grid> 
      <Grid item xs={5} sm={5} md={5} >
     <FormControl sx={{width: '25vw', justifyContent: 'center', alignContent: 'center'}} required>
         <InputLabel id="select-category-id">Choose</InputLabel>
         <Select placeholder="All adverts" labelId="select-department-id" label="Category"
             onChange={handlerCategory}>
             {/* <MenuItem value=''>None</MenuItem> */}
             {categories.map(cat => <MenuItem value={cat} key={cat}>{cat}</MenuItem>)}
         </Select>
     </FormControl>

 </Grid>
     

     <Box sx={{
         display: 'flex', justifyContent: 'center',
         alignContent: 'center'
     }}>

         <Box sx={{ height: '80vh', width: '95vw' }}>
             <DataGrid columns={columns} rows={adverts} />
         </Box>
         <Confirmation confirmFn={confirmFn.current} open={openConfirm}
             title={title.current} content={content.current}></Confirmation>
         
         <Modal
             open={openEdit}
             onClose={() => setFlEdit(false)}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
         >
             <Box sx={style}>
                 <AdvertForm submitFn={updateAdvert} advertUpdated={advert.current} />
             </Box>
         </Modal>
 
 
     </Box>

     </Grid>

 }



export default AdvertsbyCategory;