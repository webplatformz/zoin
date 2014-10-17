package jpa;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Hero {
	@Id
	@GeneratedValue
	private Long id;
	
	@Basic
	private String firstName;
	@Basic
	private String lastName;
	@Enumerated(EnumType.STRING)
	private Role role;
	@ManyToOne
	private SkillSet skillSet;
	@Basic
	@Enumerated(EnumType.STRING)
	private Skill educationTarget;
	@Basic
	private String picturePath;
	
	public Hero(){
	}
	
	public Hero(String firstName, String lastName, Role role, SkillSet skillSet) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.skillSet = skillSet;
	}

	public Long getId() {
		return id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public Role getRole() {
		return role;
	}
	
	public SkillSet getSkillSet() {
		return skillSet;
	}

	public String getPicturePath() {
		return picturePath;
	}

	public void setEducationTarget(Skill skill) {
		educationTarget = skill;
	}	
	
	public Skill getEducationTarget() {
		return educationTarget;
	}
}
