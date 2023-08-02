package fullstack.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fullstack.project.model.Advert;
import fullstack.project.service.BoardService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("advert")
@RequiredArgsConstructor    //constructor for obj final fields
@Slf4j
@Validated


public class BoardController {
	
	private static final String FILE_PATH  = "advBoard.data";
	
	final BoardService boardSevice;
	
	
	@PostMapping   //post request
	public Long add (@RequestBody Advert advert) {    //@params in the body of request
		log.debug("received " + advert);
		return boardSevice.addAdvert(advert);
	}
	
	
	
	@PutMapping("/{id}")
	public Long update (@PathVariable long id, @RequestBody Advert adv) {    //@params in the body of request
		log.debug("received " + adv);
		return boardSevice.updateAdvert(id, adv);
	} 
	

	
	@GetMapping
	public List<Advert> getall() {
		List<Advert> res = new ArrayList<>();
		res = boardSevice.getAllAdverts();
		log.debug("received all ads: " + res);
		return res;
	}
	
	
	@GetMapping("/{id}")
	public Advert getById(@PathVariable long id) {
		Advert res = new Advert();
		res = boardSevice.getAdvert(id);
		log.debug("received ad with id: " + res.id);
		return res;
	}
	
	@GetMapping ("category/{categoryName}")
	public List<Advert> getByCategory(@PathVariable(name="categoryName") String category) {
		List<Advert> res = new ArrayList<>();
		res = boardSevice.getAdvertsByCategory(category);
		log.debug("received all ads with category " + category);
		return res;
	}
	
	
	@GetMapping ("price/{priceSize}")
	public List<Advert> getByPrice(@PathVariable(name="priceSize") Integer price) {
		List<Advert> res = new ArrayList<>();
		res = boardSevice.getAdvertsByPrice(price);
		log.debug("received all ads with price from zero to " + price);
		return res;
	}
		
	
	@DeleteMapping ("/{id}")
	public Advert deleteById (@PathVariable long id) {
		Advert res = new Advert();
		res = boardSevice.deleteAdvert(id);
		log.debug("ad " + res.name + "with id: " + res.id + " has been removed");
		return res;
	}
	
	
	@DeleteMapping
	public void deleteAll() {
		log.debug("removing all adverts");
		boardSevice.deleteAllAdverts();
	}
	
	
	
	
	
	@PostConstruct
	public void restore() {
		log.debug("all adverts were restored from " + FILE_PATH);
		boardSevice.restore(FILE_PATH);
	}
	
	@PreDestroy
	public void save() {
		log.debug("all adverts were saved to " + FILE_PATH + " and context closed");
		boardSevice.save(FILE_PATH);
	}
	

}


	






