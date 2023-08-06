
import AdvertService from "../service/crud/AdvertService";
import AdvertServiceRest from "../service/crud/AdvertServiceRest";


export const advertsService: AdvertService = new AdvertServiceRest('http://localhost:8080/advert')




