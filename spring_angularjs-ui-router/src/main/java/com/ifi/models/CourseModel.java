package com.ifi.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="course")
public class CourseModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="courseid")
	public int courseid;
	
	@Column(name="coursename")
	public String coursename;
	@JsonIgnore
	@ManyToMany(mappedBy = "coursemodels")
    private Set<StModel> stModels;
	
	public CourseModel() {
		super();
	}


	public CourseModel(String coursename) {
		super();
		this.coursename = coursename;
	}


	public CourseModel(String coursename, Set<StModel> stModels) {
		super();
		this.coursename = coursename;
		this.stModels = stModels;
	}
	public int getCourseid() {
		return courseid;
	}
	
	public void setCourseid(int courseid) {
		this.courseid = courseid;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public Set<StModel> getStModels() {
		return stModels;
	}
	public void setStModels(Set<StModel> stModels) {
		this.stModels = stModels;
	}
     
    // standard constructors/getters/setters   
}
