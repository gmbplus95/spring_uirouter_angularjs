package com.ifi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ifi.models.CourseModel;

public interface CourseRepo extends CrudRepository<CourseModel, Integer>,JpaRepository<CourseModel, Integer>{
	@Query("select size(u.stModels) from CourseModel u where u.courseid=:courseid")
	int findStudentByCourseId(@Param("courseid")Integer courseid);
}
