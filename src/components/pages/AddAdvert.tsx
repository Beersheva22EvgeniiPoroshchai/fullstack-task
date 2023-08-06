
import { AdvertForm } from "../forms/AdvertForm";
import InputResult from "../../model/InputResult";
import { useDispatchCode } from "../hooks/hooks";
import Advert from "../../model/Advert";
import { advertsService } from "../../config/service-config";

const AddAdvert: React.FC = () => {
     let successMessage: string = '';
        let errorMessage = '';
        const dispatch = useDispatchCode();

    async function submitFn(adv: Advert): Promise<InputResult> {
       
        const res: InputResult = {status: 'success', message: ''};
        try {
            const advert: Advert = await advertsService.addAdvert(adv);
            successMessage = `advert has been added`
        } catch (error: any) {
           errorMessage = error;
        }
        dispatch(errorMessage, successMessage);
        return res;
    }
    return <AdvertForm submitFn={submitFn}/>
}
export default AddAdvert;