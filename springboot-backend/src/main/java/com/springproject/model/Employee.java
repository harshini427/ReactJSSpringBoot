package com.springproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity	
@Table(name = "employees")

public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name ="name")
	private String name;
	
	@Column(name ="department")
	private String department;
	
	@Column(name ="sex")
	private String sex;
	
	@Column(name ="salary")
	private int salary;
	
	@Column(name ="dob")
	private String dob;
	
	@Lob
	@Column(name = "image", columnDefinition = "LONGBLOB")
	private byte[] image;

	
	public Employee() {
		
	}
	
	
	
	
	public Employee(String name, String department, String sex, int salary, String dob, byte[] image) {
		super();
		this.name = name;
		this.department = department;
		this.sex = sex;
		this.salary = salary;
		this.dob = dob;
		this.image = image;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getSalary() {
		return salary;
	}
	public void setSalary(int salary) {
		this.salary = salary;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}

}
