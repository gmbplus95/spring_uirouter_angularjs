package com.ifi.models;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="student")
public class StModel {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="studentid")
	public int studentid;

	@Column(name="studentname")
	public String studentName;
	@Column(name="studentage")
	public String studentAge;
	@Column(name="studentlocation")
	public String studentLocation;
	private Set<CourseModel> coursemodels;
	
	@Access(AccessType.PROPERTY)
	@JsonIgnore
	@ManyToMany(
		fetch = FetchType.LAZY,
		cascade = { 
			    CascadeType.PERSIST, 
			    CascadeType.MERGE})
    @JoinTable(
        name = "room", 
        joinColumns = { @JoinColumn(name = "studentid") }, 
        inverseJoinColumns = { @JoinColumn(name = "courseid") }
    )
	public Set<CourseModel> getCoursemodels() {
		return coursemodels;
	}
	public void setCoursemodels(Set<CourseModel> coursemodels) {
		this.coursemodels = coursemodels;
	}
	public StModel() {
		super();
	}
	
	public StModel(String studentName, String studentAge, String studentLocation) {
		super();
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentLocation = studentLocation;
	}
	public StModel(String studentName, String studentAge, String studentLocation, Set<CourseModel> coursemodels) {
		super();
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentLocation = studentLocation;
		this.coursemodels = coursemodels;
	}
	public int getStudentid() {
		return studentid;
	}
	public void setStudentid(int studentid) {
		this.studentid = studentid;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getStudentAge() {
		return studentAge;
	}
	public void setStudentAge(String studentAge) {
		this.studentAge = studentAge;
	}
	public String getStudentLocation() {
		return studentLocation;
	}
	public void setStudentLocation(String studentLocation) {
		this.studentLocation = studentLocation;
	}
	
	
}