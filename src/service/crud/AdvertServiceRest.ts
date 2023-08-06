import { Observable, Subscriber } from "rxjs";
import Advert from "../../model/Advert";
import AdvertService from "./AdvertService";
const POLLER_INTERVAL = 3000;
class Cache {
    cacheString: string = '';
    set(ads: Advert[]): void {
        this.cacheString = JSON.stringify(ads);
    }
    reset() {
        this.cacheString = ''
    }
    isEqual(ads: Advert[]): boolean {
        return this.cacheString === JSON.stringify(ads)
    }
    getCache(): Advert[] {
        return !this.isEmpty() ? JSON.parse(this.cacheString) : []
    }
    isEmpty(): boolean {
        return this.cacheString.length === 0;
    }
}

function getResponseText(response: Response): string {
    let res = '';
    if (!response.ok) {
        const { status, statusText } = response;
        res = status == 401 || status == 403 ? 'Authentication' : statusText;
    }
    return res;
}

function getHeaders(): HeadersInit {
    const res: HeadersInit = {
        'Content-Type': 'application/json',
       // Authorization: `Bearer`
    }
    return res;
}


async function fetchRequest(url: string, options: RequestInit, adv?: Advert): Promise<Response> {
    options.headers = getHeaders();
    if (adv) {
        options.body = JSON.stringify(adv);
    }
    let flUpdate = true;
    let responseText = '';
    try {
        if (options.method == "DELETE" || options.method == "PUT") {
            flUpdate = false;
            await fetchRequest(url, {method: "GET"});
            flUpdate = true;
        }

        const response = await fetch(url, options);
        responseText = getResponseText(response);
        if (responseText) {
            throw responseText;
        }
        return response;
    } catch (error: any) {
        if (!flUpdate) {
            throw error;
        }
        throw responseText ? responseText : "Server is unavailable. Repeat later on";
    }
}


async function fetchAllAdverts(url: string):Promise<Advert[]|string> {
    const response = await fetchRequest(url, {});
    return await response.json()
}



export default class AdvertServiceRest implements AdvertService {
    private observable: Observable<Advert[] | string> | null = null;
    private cache: Cache = new Cache();
    constructor (private url: string) {}


    private getUrlWithId(id: any): string {
        return `${this.url}/${id}`;
    }

    private subscriberNext(url: string, subscriber: Subscriber<Advert[] | string>): void {
        
        fetchAllAdverts(url).then(ads => {
            if (this.cache.isEmpty() || !this.cache.isEqual(ads as Advert[])) {
                this.cache.set(ads as Advert[]);
                subscriber.next(ads);
            }
            
        })
        .catch(error => subscriber.next(error));
    }


    async addAdvert(adv: Advert): Promise<Advert> {
        const response = await fetchRequest(this.url, {
            method: 'POST',
           }, {...adv} as any);
       return response.json();
    }


    getAllAdverts(): Observable<string | Advert[]> {
        let intervalId: any;
        // if (!this.observable) {
            this.observable = new Observable<Advert[] | string>(subscriber => {
                this.cache.reset();
                this.subscriberNext(this.url, subscriber);
                intervalId = setInterval(() => this.subscriberNext(this.url, subscriber), POLLER_INTERVAL);
                return () => clearInterval(intervalId)
            })
       // }
        return this.observable;
    }

    getAllAdvertsbyCategory(category: string): Observable<Advert[] | string> {
    let intervalId: any;
    this.observable = new Observable<Advert[] | string>(subscriber => {
        this.cache.reset();
        this.subscriberNext(`${this.url}${category ? `/category/${category} `: ""}`, subscriber);
        intervalId = setInterval(() => this.subscriberNext(`${this.url}${category ? `/category/${category} `: ""}`, subscriber), POLLER_INTERVAL);
        return () => clearInterval(intervalId)
    })
        return this.observable;
    }



    getAdvertsbyPrice(price: string|undefined): Observable<Advert[] | string> {

        let intervalId: any;
        this.observable = new Observable<Advert[] | string>(subscriber => {
            this.cache.reset();
            this.subscriberNext(`${this.url}${price ? `/price/${price} `: ""}`, subscriber);
            intervalId = setInterval(() => this.subscriberNext(`${this.url}${price ? `/price/${price} `: ""}`, subscriber), POLLER_INTERVAL);
            return () => clearInterval(intervalId)
        })
            return this.observable;
     }


    async deleteAdvert(id: any): Promise<void> {
     const response = await fetchRequest(this.getUrlWithId(id), {
    method: 'DELETE',
    });
    return await response.json();
    }
    

    async updateAdvert(adv: Advert): Promise<Advert> {
        const response = await fetchRequest(this.getUrlWithId(adv.id!),
            { method: 'PUT' }, adv);
        return await response.json();

    }

}