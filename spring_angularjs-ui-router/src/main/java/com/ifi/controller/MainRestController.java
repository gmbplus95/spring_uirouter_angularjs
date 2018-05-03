package com.ifi.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ifi.models.CourseModel;
import com.ifi.models.StModel;
import com.ifi.models.Stcourse;
import com.ifi.repository.CourseRepo;
import com.ifi.repository.StudentRepo;

@RestController
public class MainRestController {
	@Autowired
    private StudentRepo studentRepo;
	@Autowired
	private CourseRepo courseRepo;
		@RequestMapping(value = "/getAllStudent")
		public Iterable<StModel> retrieveAllStudents() {
			return studentRepo.findAll();
		}
		
		@RequestMapping(value = "/viewStudent")
		public StModel retrieveStudentById(@RequestParam("studentid") int studentid) {
			return	studentRepo.findById(studentid).orElse(null);
		}
		
		@RequestMapping(value = "/deleteStudent/{studentid}")
		public void deleteStudentById(@PathVariable("studentid") int studentid) {
			StModel stmodel=studentRepo.findById(studentid).orElse(null);
			studentRepo.delete(stmodel);
		}
		
		@RequestMapping(value = "/viewStudent2")
		public Set<CourseModel> retarieveStudentById(@RequestParam("studentid") int studentid) {
			StModel stmodel=studentRepo.findById(studentid).orElse(null);
			return stmodel.getCoursemodels();
		}
		
		@RequestMapping(value= "/add_student/")
		public void saveStudent(@RequestBody StModel student ) {
			studentRepo.save(student);		
		}
		
		@RequestMapping(value= "/edit_student/")
		public void editStudent(@RequestBody StModel student ) {
			studentRepo.save(student);		
		}
		
		@RequestMapping(value= "/add_course_student/")
		public void addCourseStudent(@RequestBody Stcourse stcourse ) {
			CourseModel course=courseRepo.findById(stcourse.getCourseid()).orElse(null);
			StModel stmodel =studentRepo.findById(stcourse.getStudentid()).orElse(null);
			stmodel.getCoursemodels().add(course);
			studentRepo.save(stmodel);
			courseRepo.save(course);
		}
		//course 
		@RequestMapping(value = "/getAllCourse")
		  public Iterable<CourseModel> retrieveAllCourses() {
			return courseRepo.findAll();
		}
		
		@RequestMapping(value = "/deleteCourse/{courseid}")
		public void deleteCourseById(@PathVariable("courseid") int courseid) {
			CourseModel coursemodel=courseRepo.findById(courseid).orElse(null);
			courseRepo.delete(coursemodel);
		}
		
		@RequestMapping(value= "/add_course/")
		public void saveCourse(@RequestBody CourseModel coursemodel ) {
			courseRepo.save(coursemodel);		
		}
		
		@RequestMapping(value = "/viewCourse/{courseid}")
		public CourseModel retrieveCourseById(@PathVariable("courseid") int courseid) {
			return	courseRepo.findById(courseid).orElse(null);
		}
		
		@RequestMapping(value= "/edit_course/")
		public void editCourse(@RequestBody CourseModel coursemodel ) {
			courseRepo.save(coursemodel);		
		}
		
		@RequestMapping(value= "/numberofStudent/{courseid}")
		public int numberofStCourse(@PathVariable int courseid ) {
			return courseRepo.findStudentByCourseId(courseid);
		}
		
		@RequestMapping(value= "/delete_course_student/")
		public void deleteCourseStudent(@RequestBody Stcourse stcourse ) {
			CourseModel course=courseRepo.findById(stcourse.getCourseid()).orElse(null);
			StModel stmodel =studentRepo.findById(stcourse.getStudentid()).orElse(null);
			stmodel.getCoursemodels().remove(course);
			studentRepo.save(stmodel);
			courseRepo.save(course);
		}
		
		@RequestMapping(value = "/courseDetail/{courseid}")
		public Set<StModel> viewStudentByCourseId(@PathVariable("courseid") int courseid) {
			CourseModel course=courseRepo.findById(courseid).orElse(null);
			return course.getStModels();
		}
		
}
