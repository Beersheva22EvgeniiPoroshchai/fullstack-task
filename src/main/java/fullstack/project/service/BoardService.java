package fullstack.project.service;

import java.io.Serializable;
import java.util.List;

import fullstack.project.model.Advert;

public interface BoardService extends Serializable {

	Long addAdvert (Advert advert);
	List <Advert> getAllAdverts();
	Advert getAdvert(long id);
	Long updateAdvert(long id, Advert advert);
	Advert deleteAdvert(long id);
	void deleteAllAdverts();
	List<Advert> getAdvertsByCategory(String category);
	List<Advert> getAdvertsByPrice(Integer priceTo);
	void save(String pathName);
	void restore(String pathName);

}
