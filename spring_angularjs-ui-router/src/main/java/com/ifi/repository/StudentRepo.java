package com.ifi.repository;
import org.springframework.data.repository.CrudRepository;

import com.ifi.models.StModel;
public interface StudentRepo extends CrudRepository<StModel, Integer>{
}
