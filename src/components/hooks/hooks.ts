import { useDispatch } from "react-redux";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";
import { useEffect, useState } from "react";

import { Subscription } from "rxjs";
import { advertsService } from "../../config/service-config";
import Advert from "../../model/Advert";


export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                CodeType.OK;
            message = error;
        
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}


export function useSelectorAdverts() {
    const dispatch = useDispatchCode();
    const [adverts, setAdverts] = useState<Advert[]>([]);
    useEffect(() => {

        const subscription: Subscription = advertsService.getAllAdverts()
            .subscribe({
                next(advArray: Advert[] | string) {
                    let errorMessage: string = '';
                    if (typeof advArray === 'string') {
                        errorMessage = advArray;
                    } else {
                        setAdverts(advArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return adverts;
}



export function useSelectorAdvertsByCategory(category: string) {
    const dispatch = useDispatchCode();
    const [adverts, setAdverts] = useState<Advert[]>([]);
    useEffect(() => {

        const subscription: Subscription = advertsService.getAllAdvertsbyCategory(category)
            .subscribe({
                next(advArray: Advert[] | string) {
                    let errorMessage: string = '';
                    if (typeof advArray === 'string') {
                        errorMessage = advArray;
                    } else {
                        setAdverts(advArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, [category]);
    return adverts;
}


export function useSelectorAdvertsByPrice(price: string) {
    const dispatch = useDispatchCode();
    const [adverts, setAdverts] = useState<Advert[]>([]);
    useEffect(() => {

        const subscription: Subscription = advertsService.getAdvertsbyPrice(price)
            .subscribe({
                next(advArray: Advert[] | string) {
                    let errorMessage: string = '';
                    if (typeof advArray === 'string') {
                        errorMessage = advArray;
                    } else {
                        setAdverts(advArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, [price]);
    return adverts;
}