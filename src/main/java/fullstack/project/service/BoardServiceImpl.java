package fullstack.project.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

import fullstack.project.model.Advert;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Service
@Slf4j

public class BoardServiceImpl implements BoardService {

	private static final long serialVersionUID = 1L;
	private HashMap <Long, Advert> adverts = new HashMap<>();
	private HashMap <String, Set <Advert>> advertsByCategory = new HashMap<>();
	private TreeMap <Integer, Set <Advert>> advertsbyPrice = new TreeMap<>();
	
	private Long genereteRandomId() {
		return (long) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
	}

	@Override
	public Long addAdvert(Advert advert) {
		Long newId = genereteRandomId();
		Set<Long> ids = adverts.keySet();
		if (!ids.contains(newId)) {
			advert.id = newId;
			adverts.put(newId, advert);
			addToOtherMaps(advertsByCategory, advert.category, advert);
			addToOtherMaps(advertsbyPrice, advert.price, advert);
			log.debug("advert with " + newId + " has been added");
	
		} else {
			log.error("advert with " + newId + "already exists. Try to add again!");
		}
			return newId;
		}
	
	
	private <T> void addToOtherMaps(Map<T, Set<Advert>> map, T key, Advert adv) {
		map.computeIfAbsent(key, k->new HashSet<>()).add(adv);
	}
	
	
	@Override
	public List<Advert> getAllAdverts() {
		return new ArrayList<>(adverts.values());
	}

	@Override
	public Advert getAdvert(long id) {
	return adverts.get(id);
	}

	@Override
	public Long updateAdvert(long id, Advert advert) {
		Set<Long> ids = adverts.keySet();
		Long res = id;
		if (ids.contains(id)) {
			deleteAdvert(id);
			advert.id = res;
			addAdvByExistId(advert);
		} else {
			log.error("advert with " + id + "does not exist");
		}
		return res;
	}

	
	@Override
	public Advert deleteAdvert(long id) {
		Advert advert = adverts.remove(id);
		if (advert != null) {
			removeFromOtherMaps(advertsByCategory, advert.category, advert);
			removeFromOtherMaps(advertsbyPrice, advert.price, advert);
			}
		
		return advert;
	}
	
	
	private <T>void removeFromOtherMaps(Map<T, Set<Advert>> map, T key, Advert adv) {
		Set<Advert> set = map.get(key);
		set.remove(adv);
		if (set.isEmpty()) {
			map.remove(key);
		}
	}
	
	@Override
	public void deleteAllAdverts() {
		if (!adverts.isEmpty()) {
		adverts.clear();
		advertsByCategory.values().clear();
		advertsbyPrice.values().clear();
		} 
	}
	
		
	
	
	
	
	@Override
	public List<Advert> getAdvertsByCategory(String category) {
		return new ArrayList<>(advertsByCategory.getOrDefault(category, Collections.emptySet()));
	}

	
	@Override
	public List<Advert> getAdvertsByPrice(Integer priceTo) {
		return advertsbyPrice.subMap(0, true, priceTo, true).values().stream().flatMap(Set::stream).toList();
	}

	@Override
	public void save(String pathName) {
		try (ObjectOutputStream output = new ObjectOutputStream(new FileOutputStream(pathName))){
			output.writeObject(getAllAdverts());
		} catch(Exception e) {
			throw new RuntimeException(e.toString());
		}

	}

	
	@SuppressWarnings("unchecked")
	@Override
	public void restore(String pathName) {	
	List<Advert> adverts = new ArrayList<>();
	try(ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(pathName))) {
		adverts = (List<Advert>) inputStream.readObject(); 
		} catch (FileNotFoundException e) {
			log.error(e.getMessage());
			} catch (IOException e) {
				log.error(e.getMessage());
				}catch (ClassNotFoundException e) {
					log.error(e.getMessage());
				}
	
		Iterator<Advert> iterator = adverts.iterator();
			while (iterator.hasNext()) {
				addAdvByExistId(iterator.next());
		
			}
			
	}


	

//	@SuppressWarnings("unchecked")
//	@Override
//	public void restore(String pathName) {
//			try (ObjectInputStream input = new ObjectInputStream(new FileInputStream(pathName))) {
//				List<Advert> allAdverts = (List<Advert>) input.readObject();
//				allAdverts.forEach(this::addExistId);
//			} catch(FileNotFoundException e) {
//			
//			} catch (Exception e) {
//				throw new RuntimeException(e.toString());
//			}
//
//	}
	
	
	
	private void addAdvByExistId(Advert adv) {
		adverts.put(adv.id, adv);
		addToOtherMaps(advertsByCategory, adv.category, adv);
		addToOtherMaps(advertsbyPrice, adv.price, adv);
	}
	
}
