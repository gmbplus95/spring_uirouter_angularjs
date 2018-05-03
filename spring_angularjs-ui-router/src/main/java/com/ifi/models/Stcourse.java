package com.ifi.models;
//tạo class lấy id của student và course
public class Stcourse {
			private int studentid;
			private int courseid;

			public int getStudentid() {
				return studentid;
			}
			public void setStudentid(int studentid) {
				this.studentid = studentid;
			}
			public int getCourseid() {
				return courseid;
			}
			public void setCourseid(int courseid) {
				this.courseid = courseid;
			}
			public Stcourse(int studentid, int courseid) {
				super();
				this.studentid = studentid;
				this.courseid = courseid;
			}
			public Stcourse() {
				super();
			}
			
}
