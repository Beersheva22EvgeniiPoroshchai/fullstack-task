import { Observable } from "rxjs";
import Advert from "../../model/Advert";

export default interface AdvertService {
    addAdvert(adv: Advert): Promise<Advert>;
    getAllAdverts(): Observable<Advert[] | string>;
    getAllAdvertsbyCategory(category: string|undefined): Observable<Advert[] | string>;
    getAdvertsbyPrice(price: string|undefined): Observable<Advert[] | string>;
    deleteAdvert(id: any): Promise<void>;
    updateAdvert(adv: Advert): Promise<Advert>;
}
