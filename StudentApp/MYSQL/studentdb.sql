create database StudentDb;
use StudentDb;
create table Student(Id int primary key auto_increment, Name varchar(50) Not Null, DOB DateTime Not Null, TotalMarks int Not Null, CGPA decimal(4,2) Not Null, Mobile varchar(10) Not Null, Address varchar(250), Email varchar(50) Not Null, Course varchar(10)Not Null, GraduationYear varchar(4)Not Null);

select * from Student;

insert into Student(Name, DOB, TotalMarks, CGPA, Mobile, Address, Email, Course, GraduationYear) values('Shaik', '1998-01-13', 95, 95.00, '9809809809', 'Hyderabad', 'shaik@gmail.com', 'B-Tech', '2020');

update Student SET Name = 'Mahimood', DOB = '2000-01-01', TotalMarks = '832', CGPA = '83.22', Mobile = '9090909090', Address = 'Gachibowli', Email = 'mahi@gmail.com', Course = 'B.E', GraduationYear = '2021' WHERE Id = 2;

delete from student where id=3;