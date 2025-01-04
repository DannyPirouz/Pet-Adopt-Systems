drop table Shelter CASCADE CONSTRAINTS;
drop table Staff CASCADE CONSTRAINTS;
drop table Vets CASCADE CONSTRAINTS;
drop table Donators CASCADE CONSTRAINTS;
drop table Donate1 CASCADE CONSTRAINTS;
drop table Adopter CASCADE CONSTRAINTS;
drop table Has_Staff CASCADE CONSTRAINTS;
drop table Volunteer CASCADE CONSTRAINTS;
drop table Paid_Employee CASCADE CONSTRAINTS;
drop table Animal CASCADE CONSTRAINTS;
drop table Dog CASCADE CONSTRAINTS;
drop table Cat CASCADE CONSTRAINTS;
drop table MedicalRecord CASCADE CONSTRAINTS;
drop table UseMedicalRecord CASCADE CONSTRAINTS;
drop table TreatsAnimals CASCADE CONSTRAINTS;
drop table Donate2 CASCADE CONSTRAINTS;
drop table ApplicationFilloutForProcess;


CREATE TABLE Shelter (
	address	    VARCHAR(50),
	name	    VARCHAR(50),
	capacity    INTEGER,
	PRIMARY KEY (address, name)
);

CREATE TABLE Staff (
	staff_id		INTEGER PRIMARY KEY,
	name			VARCHAR(50),
	role			VARCHAR(50),
	phone_number	VARCHAR(50),
	email			VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Vets (
    vet_id_number   INTEGER PRIMARY KEY,
    speciality      	VARCHAR(50),
    clinic         	VARCHAR(50),
    name           	VARCHAR(50)
);

CREATE TABLE Donators (
    name    	VARCHAR(50),
    address 	VARCHAR(50),
    email   	VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Donate1 (
    amount          	INTEGER PRIMARY KEY,
    payment_method  	VARCHAR(50)
);

CREATE TABLE Adopter (
    email        	VARCHAR(50) PRIMARY KEY,
   	name         	VARCHAR(50),
    address      	VARCHAR(50),
    phone_number    VARCHAR(50)
);

CREATE TABLE Has_Staff(
	staff_id    INTEGER,
	address	    VARCHAR(50),
	name        VARCHAR(50),
	PRIMARY KEY (staff_id, address, name),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
    ON DELETE CASCADE,
    FOREIGN KEY (address, name) REFERENCES Shelter(address, name)
    ON DELETE CASCADE
);

CREATE TABLE Volunteer (
    staff_id        	INTEGER PRIMARY KEY,
    volunteer_hours 	INTEGER,
    availability    	VARCHAR(50),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
    ON DELETE CASCADE
);

CREATE TABLE Paid_Employee (
    staff_id    INTEGER PRIMARY KEY,
    salary      INTEGER NOT NULL,
    schedule    VARCHAR(50),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
    ON DELETE CASCADE
);

CREATE TABLE MedicalRecord (
 	record_number    	INTEGER PRIMARY KEY,
    vaccinations     	INTEGER,
    medical_condition 	VARCHAR(50),
    spayed_neutered  	CHAR(3),
    animal_id        	INTEGER NOT NULL UNIQUE
);

CREATE TABLE Animal (
    animal_id       	    INTEGER PRIMARY KEY,
    breed             	    VARCHAR(50),
    age               	    INTEGER,
    status           	    VARCHAR(50) NOT NULL,
    name              	    VARCHAR(50),
    gender            	    VARCHAR(6) NOT NULL,
    colour            	    VARCHAR(50),
    medical_record_number   INTEGER NOT NULL UNIQUE,
    shelter_address         VARCHAR(50) NOT NULL,
    shelter_name            VARCHAR(50) NOT NULL,
    adopters_email          VARCHAR(50),
    FOREIGN KEY (medical_record_number) REFERENCES MedicalRecord(record_number),
    FOREIGN KEY (shelter_address, shelter_name) REFERENCES Shelter (address, name),
    FOREIGN KEY (adopters_email) REFERENCES Adopter(email)
);

CREATE TABLE Dog (
	animal_id 	    INTEGER PRIMARY KEY,
	size_animal 	VARCHAR(50),
    bark_level	    CHAR(20),
    hypoallergenic	CHAR(3),
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
    ON DELETE CASCADE
);

CREATE TABLE Cat (
	animal_id 	    INTEGER PRIMARY KEY,
    declawed 	    CHAR(3),
    hypoallergenic	CHAR(3),
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
    ON DELETE CASCADE
);

CREATE TABLE UseMedicalRecord (
    vet_id_number  	INTEGER,
    record_number  	INTEGER,
    PRIMARY KEY (vet_id_number, record_number),
    FOREIGN KEY (vet_id_number) REFERENCES Vets(vet_id_number) 
    ON DELETE CASCADE,
    FOREIGN KEY (record_number) REFERENCES MedicalRecord(record_number)
    ON DELETE CASCADE
);

CREATE TABLE TreatsAnimals (
    vet_id_number  	INTEGER,
    animal_id      	INTEGER,
    PRIMARY KEY (vet_id_number, animal_id),
    FOREIGN KEY (vet_id_number) REFERENCES Vets(vet_id_number)
    ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
    ON DELETE CASCADE
);

CREATE TABLE Donate2 (
    email   	VARCHAR(50),
    address 	VARCHAR(50),
    name    	VARCHAR(50),
    amount  	INTEGER,
	PRIMARY KEY (email, address, name),
    FOREIGN KEY (email) REFERENCES Donators(email)
    ON DELETE CASCADE,
    FOREIGN KEY (address, name) REFERENCES Shelter(address, name)
	ON DELETE CASCADE
);

CREATE TABLE ApplicationFilloutForProcess (
   	application_number 		INTEGER PRIMARY KEY,
    status             		VARCHAR(50),
    adopters_email     		VARCHAR(50) NOT NULL UNIQUE,
    animal_id          		INTEGER NOT NULL UNIQUE,
    shelter_address   		VARCHAR(50) NOT NULL UNIQUE,
    shelter_name       		VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (adopters_email) REFERENCES Adopter(email)
    ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
    ON DELETE CASCADE,
    FOREIGN KEY (shelter_address, shelter_name) REFERENCES Shelter(address, name)
    ON DELETE CASCADE
);

INSERT INTO Shelter VALUES ('1 Bills Dr', 'Buffalo Bills Animal Shelter', 70);
INSERT INTO Shelter VALUES ('1000 Chopper Cir', 'Broncos Rescue Center', 60);
INSERT INTO Shelter VALUES ('1925 Giants Dr', 'Giants Haven', 80);
INSERT INTO Shelter VALUES ('1265 Lombardi Ave', 'Packers Paw Shelter', 50);
INSERT INTO Shelter VALUES ('900 E 56th St', 'Chiefs Pet Home', 75);
INSERT INTO Shelter VALUES ('2000 Fedex Way', 'Commanders Animal Rescue', 55);
INSERT INTO Shelter VALUES ('555 Patriots Pl', 'Patriots Paws', 65);
INSERT INTO Shelter VALUES ('501 Broadway', 'Rams Animal Shelter', 45);

INSERT INTO Staff VALUES (1, 'Sam Wilson', 'Veterinarian', '555-1111', 'sam.wilson@example.com');
INSERT INTO Staff VALUES (2, 'Jessica Brown', 'Volunteer Coordinator', '555-2222', 'jessica.brown@example.com');
INSERT INTO Staff VALUES (3, 'Michael Lee', 'Shelter Manager', '555-3333', 'michael.lee@example.com');
INSERT INTO Staff VALUES (4, 'Natalie White', 'Veterinarian', '555-4444', 'natalie.white@example.com');
INSERT INTO Staff VALUES (5, 'David King', 'Animal Trainer', '555-5555', 'david.king@example.com');
INSERT INTO Staff VALUES (6, 'Maria Johnson', 'Volunteer', '555-6666', 'maria.johnson@example.com');
INSERT INTO Staff VALUES (7, 'Robert Adams', 'Volunteer', '555-7777', 'robert.adams@example.com');
INSERT INTO Staff VALUES (8, 'Sarah Green', 'Volunteer', '555-8888', 'sarah.green@example.com');
INSERT INTO Staff VALUES (9, 'John Carter', 'Volunteer', '555-9999', 'john.carter@example.com');
INSERT INTO Staff VALUES (10, 'Olivia Davis', 'Part-Time Staff', '555-0000', 'olivia.davis@example.com');
INSERT INTO Staff VALUES (11, 'James White', 'Full-Time Staff', '555-1010', 'james.white@example.com');
INSERT INTO Staff VALUES (12, 'Emily Clark', 'Part-Time Staff', '555-2020', 'emily.clark@example.com');

INSERT INTO Vets VALUES (1, 'Orthopedics', 'Buffalo Bills Animal Clinic', 'Dr. Sean McDermott');
INSERT INTO Vets VALUES (2, 'General', 'Chiefs Animal Clinic', 'Dr. Andy Reid');
INSERT INTO Vets VALUES (3, 'Physiotherapy', 'Giants Animal Clinic', 'Dr. Brian Daboll');
INSERT INTO Vets VALUES (4, 'Nutrition', 'Packers Paw Clinic', 'Dr. Matt LaFleur');
INSERT INTO Vets VALUES (5, 'Cardiology', 'Patriots Animal Clinic', 'Dr. Bill Belichick');
INSERT INTO Vets VALUES (6, 'Surgery', 'Rams Animal Clinic', 'Dr. Sean McVay');
INSERT INTO Vets VALUES (7, 'Dermatology', 'Commanders Pet Clinic', 'Dr. Ron Rivera');
INSERT INTO Vets VALUES (8, 'Neurology', 'Broncos Rescue Clinic', 'Dr. Sean Payton');

INSERT INTO Donators VALUES ('John Doe', '123 Main St', 'john.doe@example.com');
INSERT INTO Donators VALUES ('Jane Smith', '456 Oak St', 'jane.smith@example.com');
INSERT INTO Donators VALUES ('Robert Johnson', '789 Pine St', 'robert.johnson@example.com');
INSERT INTO Donators VALUES ('Emily Davis', '101 Maple St', 'emily.davis@example.com');
INSERT INTO Donators VALUES ('Michael Brown', '202 Birch St', 'michael.brown@example.com');
INSERT INTO Donators VALUES ('Joe Smith', '101 University Drive', 'joe.smith@example.com');


INSERT INTO Donate1 VALUES (100, 'Credit Card');
INSERT INTO Donate1 VALUES (200, 'Credit Card');
INSERT INTO Donate1 VALUES (180, 'PayPal');
INSERT INTO Donate1 VALUES (150, 'Debit Card');
INSERT INTO Donate1 VALUES (190, 'Debit Card');
INSERT INTO Donate1 VALUES (250, 'Credit Card');
INSERT INTO Donate1 VALUES (400, 'Credit Card');
INSERT INTO Donate1 VALUES (300, 'PayPal');
INSERT INTO Donate1 VALUES (600, 'PayPal');
INSERT INTO Donate1 VALUES (380, 'PayPal');
INSERT INTO Donate1 VALUES (570, 'PayPal');


INSERT INTO Adopter VALUES ('sean.shelter@example.com', 'Sean Shelter', '1 Bills Dr', '555-0099');
INSERT INTO Adopter VALUES ('andy.paws@example.com', 'Andy Paws', '900 E 56th St', '555-0041');
INSERT INTO Adopter VALUES ('daniel.catlover@example.com', 'Daniel Catlover', '1925 Giants Dr', '555-0008');
INSERT INTO Adopter VALUES ('bill.belipaws@example.com', 'Bill Belipaws', '555 Patriots Pl', '555-0066');
INSERT INTO Adopter VALUES ('aaron.animalrescue@example.com', 'Aaron Rescue', '1265 Lombardi Ave', '555-0042');

INSERT INTO Has_Staff VALUES (1, '1 Bills Dr', 'Buffalo Bills Animal Shelter');        
INSERT INTO Has_Staff VALUES (2, '900 E 56th St', 'Chiefs Pet Home');                  
INSERT INTO Has_Staff VALUES (3, '1925 Giants Dr', 'Giants Haven');              
INSERT INTO Has_Staff VALUES (4, '555 Patriots Pl', 'Patriots Paws');             
INSERT INTO Has_Staff VALUES (5, '1000 Chopper Cir', 'Broncos Rescue Center');        
INSERT INTO Has_Staff VALUES (6, '501 Broadway', 'Rams Animal Shelter');            
INSERT INTO Has_Staff VALUES (7, '1265 Lombardi Ave', 'Packers Paw Shelter');        
INSERT INTO Has_Staff VALUES (8, '2000 Fedex Way', 'Commanders Animal Rescue');       
INSERT INTO Has_Staff VALUES (9, '555 Patriots Pl', 'Patriots Paws');            
INSERT INTO Has_Staff VALUES (10, '1925 Giants Dr', 'Giants Haven');                  
INSERT INTO Has_Staff VALUES (11, '900 E 56th St', 'Chiefs Pet Home');                
INSERT INTO Has_Staff VALUES (12, '1000 Chopper Cir', 'Broncos Rescue Center');

INSERT INTO Volunteer VALUES (2, 120, 'Weekends');
INSERT INTO Volunteer VALUES (5, 80, 'Weekdays');            
INSERT INTO Volunteer VALUES (6, 150, 'Evenings');           
INSERT INTO Volunteer VALUES (7, 95, 'Weekends');           
INSERT INTO Volunteer VALUES (8, 100, 'Mornings');        
INSERT INTO Volunteer VALUES (9, 70, 'Flexible');

INSERT INTO Paid_Employee VALUES (1, 70000, 'Full-Time');         
INSERT INTO Paid_Employee VALUES (3, 60000, 'Full-Time');         
INSERT INTO Paid_Employee VALUES (4, 75000, 'Full-Time');         
INSERT INTO Paid_Employee VALUES (10, 55000, 'Part-Time');       
INSERT INTO Paid_Employee VALUES (11, 80000, 'Full-Time');        
INSERT INTO Paid_Employee VALUES (12, 52000, 'Part-Time');


INSERT INTO MedicalRecord VALUES (1, 3, 'Healthy', 'YES', 1);
INSERT INTO MedicalRecord VALUES (2, 4, 'Hip Dysplasia', 'NO', 2);
INSERT INTO MedicalRecord VALUES (3, 2, 'Skin Allergy', 'YES', 3);
INSERT INTO MedicalRecord VALUES (4, 5, 'Arthritis', 'YES', 4);
INSERT INTO MedicalRecord VALUES (5, 3, 'Fractured Leg', 'NO', 5);
INSERT INTO MedicalRecord VALUES (6, 1, 'Torn Ligament', 'YES', 6);
INSERT INTO MedicalRecord VALUES (7, 2, 'Healthy', 'YES', 7);
INSERT INTO MedicalRecord VALUES (8, 1, 'Fleas', 'NO', 8);
INSERT INTO MedicalRecord VALUES (9, 3, 'Ear Infection', 'YES', 9);
INSERT INTO MedicalRecord VALUES (10, 2, 'Fractured Paw', 'NO', 10);
INSERT INTO MedicalRecord VALUES (11, 1, 'Heart Murmur', 'YES', 11);
INSERT INTO MedicalRecord VALUES (12, 2, 'Healthy', 'YES', 12);
INSERT INTO MedicalRecord VALUES (13, 4, 'Arthritis', 'NO', 13);
INSERT INTO MedicalRecord VALUES (14, 4, 'Arthritis', 'NO', 14);
INSERT INTO MedicalRecord VALUES (15, 4, 'Arthritis', 'NO', 15);
INSERT INTO MedicalRecord VALUES (16, 4, 'Arthritis', 'NO', 16);
INSERT INTO MedicalRecord VALUES (17, 4, 'Arthritis', 'NO', 17);
INSERT INTO MedicalRecord VALUES (18, 4, 'Arthritis', 'NO', 18);
INSERT INTO MedicalRecord VALUES (19, 4, 'Arthritis', 'NO', 19);

INSERT INTO Animal VALUES (1, 'Golden Retriever', 5, 'Available', 'Josh', 'Male', 'Golden', 1, '1 Bills Dr', 'Buffalo Bills Animal Shelter', 'sean.shelter@example.com');
INSERT INTO Animal VALUES (2, 'Beagle', 3, 'Adopted', 'Patrick', 'Male', 'Brown', 2, '900 E 56th St', 'Chiefs Pet Home', 'andy.paws@example.com');
INSERT INTO Animal VALUES (3, 'Husky', 4, 'Available', 'Stefon', 'Male', 'White', 3, '1 Bills Dr', 'Buffalo Bills Animal Shelter', NULL);
INSERT INTO Animal VALUES (4, 'Bulldog', 6, 'Available', 'Travis', 'Male', 'Brown', 4, '900 E 56th St', 'Chiefs Pet Home', NULL);
INSERT INTO Animal VALUES (5, 'Persian', 2, 'Adopted', 'Saquon', 'Female', 'Gray', 5, '1925 Giants Dr', 'Giants Haven', 'daniel.catlover@example.com');
INSERT INTO Animal VALUES (6, 'Poodle', 8, 'Available', 'Roonie', 'Female', 'White', 6, '501 Broadway', 'Rams Animal Shelter', NULL);
INSERT INTO Animal VALUES (7, 'Husky', 3, 'Available', 'Tom', 'Male', 'Black', 7, '555 Patriots Pl', 'Patriots Paws', 'bill.belipaws@example.com');
INSERT INTO Animal VALUES (8, 'Tabby', 4, 'Available', 'Davante', 'Male', 'Orange', 8, '1265 Lombardi Ave', 'Packers Paw Shelter', 'aaron.animalrescue@example.com');
INSERT INTO Animal VALUES (9, 'Siamese', 2, 'Available', 'Cooper', 'Male', 'Cream', 9, '501 Broadway', 'Rams Animal Shelter', NULL);
INSERT INTO Animal VALUES (10, 'Siamese', 3, 'Adopted', 'Jalen', 'Female', 'Blue', 10, '555 Patriots Pl', 'Patriots Paws', 'bill.belipaws@example.com');
INSERT INTO Animal VALUES (11, 'Siamese', 5, 'Available', 'Joe', 'Male', 'Spotted', 11, '1 Bills Dr', 'Buffalo Bills Animal Shelter', NULL);
INSERT INTO Animal VALUES (12, 'Sphynx', 4, 'Available', 'DeAndre', 'Male', 'Hairless', 12, '900 E 56th St', 'Chiefs Pet Home', NULL);
INSERT INTO Animal VALUES (13, 'Beagle', 4, 'Available', 'Daki', 'Female', 'Brown', 13, '1265 Lombardi Ave', 'Packers Paw Shelter', NULL);
INSERT INTO Animal VALUES (14, 'Bulldog', 15, 'Adopted', 'Danny', 'Male', 'Black', 14, '1925 Giants Dr', 'Giants Haven', 'bill.belipaws@example.com');
INSERT INTO Animal VALUES (15, 'Persian', 4, 'Available', 'Nigel', 'Male', 'Blue', 15, '1 Bills Dr', 'Buffalo Bills Animal Shelter', NULL);
INSERT INTO Animal VALUES (16, 'Poodle', 3, 'Adopted', 'Manik', 'Female', 'Gray', 16, '501 Broadway', 'Rams Animal Shelter', 'sean.shelter@example.com');
INSERT INTO Animal VALUES (17, 'Tabby', 12, 'Available', 'Mike', 'Male', 'Black', 17, '900 E 56th St', 'Chiefs Pet Home', 'andy.paws@example.com');
INSERT INTO Animal VALUES (18, 'Bulldog', 8, 'Adopted', 'Derick', 'Male', 'Brown', 18, '1265 Lombardi Ave', 'Packers Paw Shelter', NULL);
INSERT INTO Animal VALUES (19, 'Persian', 7, 'Available', 'Cookie', 'Female', 'Orange', 19, '555 Patriots Pl', 'Patriots Paws', 'daniel.catlover@example.com');


INSERT INTO Dog VALUES (1, 'Large', 'MED', 'NO');
INSERT INTO Dog VALUES (2, 'Medium', 'HIGH', 'NO');
INSERT INTO Dog VALUES (3, 'Large', 'LOW', 'NO');
INSERT INTO Dog VALUES (4, 'Medium', 'HIGH', 'NO');
INSERT INTO Dog VALUES (6, 'Large', 'LOW', 'YES');
INSERT INTO Dog VALUES (7, 'Large', 'MED', 'NO');
INSERT INTO Dog VALUES (13, 'Medium', 'MED', 'NO');
INSERT INTO Dog VALUES (14, 'Medium', 'MED', 'NO');
INSERT INTO Dog VALUES (16, 'Medium', 'MED', 'NO');
INSERT INTO Dog VALUES (18, 'Medium', 'MED', 'NO');

INSERT INTO Cat VALUES (5, 'YES', 'NO');
INSERT INTO Cat VALUES (8, 'NO', 'NO');
INSERT INTO Cat VALUES (9, 'NO', 'YES');
INSERT INTO Cat VALUES (10, 'YES', 'NO');
INSERT INTO Cat VALUES (11, 'NO', 'YES');
INSERT INTO Cat VALUES (12, 'NO', 'YES');
INSERT INTO Cat VALUES (15, 'NO', 'YES');
INSERT INTO Cat VALUES (17, 'NO', 'YES');
INSERT INTO Cat VALUES (19, 'NO', 'YES');


INSERT INTO UseMedicalRecord VALUES (1, 1);
INSERT INTO UseMedicalRecord VALUES (2, 2);
INSERT INTO UseMedicalRecord VALUES (1, 3);
INSERT INTO UseMedicalRecord VALUES (3, 4);
INSERT INTO UseMedicalRecord VALUES (2, 5);
INSERT INTO UseMedicalRecord VALUES (4, 6);
INSERT INTO UseMedicalRecord VALUES (5, 7);
INSERT INTO UseMedicalRecord VALUES (3, 8);
INSERT INTO UseMedicalRecord VALUES (6, 9);
INSERT INTO UseMedicalRecord VALUES (7, 10);
INSERT INTO UseMedicalRecord VALUES (8, 11);
INSERT INTO UseMedicalRecord VALUES (4, 12);
INSERT INTO UseMedicalRecord VALUES (6, 13);
INSERT INTO UseMedicalRecord VALUES (6, 14);
INSERT INTO UseMedicalRecord VALUES (6, 15);
INSERT INTO UseMedicalRecord VALUES (6, 16);
INSERT INTO UseMedicalRecord VALUES (6, 17);
INSERT INTO UseMedicalRecord VALUES (6, 18);
INSERT INTO UseMedicalRecord VALUES (6, 19);


INSERT INTO TreatsAnimals VALUES (1, 1);
INSERT INTO TreatsAnimals VALUES (2, 2);
INSERT INTO TreatsAnimals VALUES (1, 3);
INSERT INTO TreatsAnimals VALUES (3, 4);
INSERT INTO TreatsAnimals VALUES (5, 5);
INSERT INTO TreatsAnimals VALUES (4, 6);
INSERT INTO TreatsAnimals VALUES (5, 10);
INSERT INTO TreatsAnimals VALUES (3, 14);
INSERT INTO TreatsAnimals VALUES (4, 16);


INSERT INTO Donate2 VALUES ('john.doe@example.com', '1 Bills Dr', 'Buffalo Bills Animal Shelter', 100);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '1000 Chopper Cir', 'Broncos Rescue Center', 200);
INSERT INTO Donate2 VALUES ('robert.johnson@example.com', '1925 Giants Dr', 'Giants Haven', 150);
INSERT INTO Donate2 VALUES ('robert.johnson@example.com', '1 Bills Dr', 'Buffalo Bills Animal Shelter', 190);
INSERT INTO Donate2 VALUES ('emily.davis@example.com', '1265 Lombardi Ave', 'Packers Paw Shelter', 250);
INSERT INTO Donate2 VALUES ('emily.davis@example.com', '900 E 56th St', 'Chiefs Pet Home', 400);
INSERT INTO Donate2 VALUES ('michael.brown@example.com', '900 E 56th St', 'Chiefs Pet Home', 300);
INSERT INTO Donate2 VALUES ('joe.smith@example.com', '900 E 56th St', 'Chiefs Pet Home', 600);
INSERT INTO Donate2 VALUES ('joe.smith@example.com', '2000 Fedex Way', 'Commanders Animal Rescue', 380);
INSERT INTO Donate2 VALUES ('joe.smith@example.com', '1000 Chopper Cir', 'Broncos Rescue Center', 570);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '1925 Giants Dr', 'Giants Haven', 150);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '1265 Lombardi Ave', 'Packers Paw Shelter', 200);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '900 E 56th St', 'Chiefs Pet Home', 300);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '2000 Fedex Way', 'Commanders Animal Rescue', 250);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '555 Patriots Pl', 'Patriots Paws', 180);
INSERT INTO Donate2 VALUES ('john.doe@example.com', '501 Broadway', 'Rams Animal Shelter', 220);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '1 Bills Dr', 'Buffalo Bills Animal Shelter', 120);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '1000 Chopper Cir', 'Broncos Rescue Center', 150);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '1925 Giants Dr', 'Giants Haven', 130);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '1265 Lombardi Ave', 'Packers Paw Shelter', 110);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '900 E 56th St', 'Chiefs Pet Home', 140);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '2000 Fedex Way', 'Commanders Animal Rescue', 200);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '555 Patriots Pl', 'Patriots Paws', 170);
INSERT INTO Donate2 VALUES ('jane.smith@example.com', '501 Broadway', 'Rams Animal Shelter', 160);

INSERT INTO ApplicationFilloutForProcess VALUES (1, 'Pending', 'sean.shelter@example.com', 1, '1 Bills Dr', 'Buffalo Bills Animal Shelter');
INSERT INTO ApplicationFilloutForProcess VALUES (2, 'Approved', 'andy.paws@example.com', 2, '900 E 56th St', 'Chiefs Pet Home');
INSERT INTO ApplicationFilloutForProcess VALUES (3, 'Pending', 'daniel.catlover@example.com', 5, '1925 Giants Dr', 'Giants Haven');
INSERT INTO ApplicationFilloutForProcess VALUES (4, 'Approved', 'bill.belipaws@example.com', 7, '555 Patriots Pl', 'Patriots Paws');
INSERT INTO ApplicationFilloutForProcess VALUES (5, 'Pending', 'aaron.animalrescue@example.com', 8, '1265 Lombardi Ave', 'Packers Paw Shelter');


