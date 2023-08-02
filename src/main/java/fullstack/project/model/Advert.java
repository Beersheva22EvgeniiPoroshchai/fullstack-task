package fullstack.project.model;

import java.io.Serializable;



import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION)

@Data
public class Advert implements Serializable {
		private static final long serialVersionUID = 1L;
		public Long id;
		@NotEmpty
		public String name;
		@NotEmpty
		public String category;
		@NotEmpty
		public Integer price;
		@NotEmpty
		public String data;
		
		
	}


