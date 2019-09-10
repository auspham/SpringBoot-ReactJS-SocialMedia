insert into todo(id, username,description,target_date,is_done)
values(10001, 'sept', 'Learn JPA', sysdate(), false);

insert into todo(id, username,description,target_date,is_done)
values(10002, 'sept', 'Learn Data JPA', sysdate(), false);

insert into todo(id, username,description,target_date,is_done)
values(10003, 'sept', 'Learn Microservices', sysdate(), false);


insert into User(username, password)
values ('JohnCitizen', 'pass');


insert into User(username, password)
values ('Mike', 'pass2');

insert into Profile(email, firstname, lastname, studentnumber, aboutme, phonenumber)
values ('john@gmail.com', 'John', 'Citizen', 's3718662', 'Take your first steps towards becoming a Full Stack Developer with React and Spring Boot','0427164899')