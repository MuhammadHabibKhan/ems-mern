# Enterprise Management System

A simple system designed to manage enterprise operations including attendance marking, salary calculations, order creation, and profile management for admin, worker, and clients. It also provides the ability to delete and update the said features. A brief detail is provided in the features section of this document.

## Project Overview

This project uses the MERN stack to provide a workable enterprise management system. It includes:

- Frontend: React for creating dynamic user interfaces
- Backend: Node.js and Express for building a robust API
- Database: MongoDB for storing data
- Authentication: JWT for secure authentication 

## Installation

### Prerequisites

1.	Node.js
2.	MongoDB
3.	npm or yarn
4.	React

### NPM Packages

Including but not limited to: 

1.	React-router-dom
2.	Express
3.	Mongoose
4.	Json web token (JWT)

### Usage

#### Backend
```
cd backend
npm start 
```
#### Frontend 
In main folder
```
npm start
```

Make sure the package.json files are configured accordingly.

## Features

### Login

Provides secure login by matching the username and password against the admin collection in the database and generates a JWT token that is stored in the session storage to be used in the middleware when calling sensitive APIs to protect data.

<img width="237" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/c69aeeb2-e8b5-4d26-bae1-6df772368f92">

### Dashboard

A modern and elegantly designed dashboard with descriptive images as icons that uses an overlay design to display text when mouse is hovered over. A profile picture and cover photo section also exist which is static at the moment but can be utilized to personalize the experience of each user. The right side is provided with a clean To Do List to list down all your important tasks of the day so you won’t forget any. The dashboard also greets each user with their name on the screen fetched using APIs.

<img width="937" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/74b0c906-d397-441d-b318-4330ea0f8a83">
<img width="910" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/e82e56c0-ae33-4782-ae8c-2f581f5548be">

### Mark Attendance

The first feature on the dashboard is the mark attendance feature which as the name suggest allows the admin to mark attendance of the company employees but also to note down their reporting time, overtime hours and late hours. This allows for an automatic calculation of the salary due to each employee which can be viewed in a separate feature.

<img width="596" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/0e6e0528-a46c-4f98-81fe-e66dfaf665c5">

### New Profile

The new profile feature contains 3 sub-features inside it which are as follows:

<img width="832" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/ed281497-488e-45c0-8e40-252cd2a7e41c">

#### Add New Admin
Allows the admins to create a new admin profile.

<img width="638" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/9307d375-92a7-4127-94f2-35634c393d8c">

#### Add New Worker
Allows the admins to create a new worker profile.

<img width="555" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/e25e1116-357c-493e-b42e-25bce30cacad">

#### Add New Client
Allows the admins to create a new client profile. A client profile is required to generate an order for them in the system. 
This also allows for tracking of the balance and payment each client owes to the organization.

<img width="595" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/b07a8cb0-ecc3-4071-9348-3b43e78839e4">

### Edit Profile

This feature also contains 3-sub features as the previous one but allows the admins to edit or delete existing profiles of admins, workers or clients. This allows for any sort of change possible to the profiles as required. The APIs fetch the data from database once selecting the username (or company name in case of Client) and populates the fields with old data so that user may update accordingly and correctly. Client’s balance can also be updated here when a payment is made in between 2 orders. 

Uploading only 'Edit Client Profile' Image for reference
<img width="608" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/01523d6c-7a2b-458d-943e-188b921d2609">

### Add New Order

Allows admins to add new orders against client profiles. As discussed before, the cost of the order is automatically added to the client profile, increasing the payment that is owed to us by them. This allows for easier tracking of the finances.

<img width="587" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/7e5632fc-ac75-459b-a792-fa5c43c10eee">

### Edit Order

Allows admins to make edits in an existing order.

<img width="505" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/1f0b1ba3-833e-4bc0-8513-5a47e7683ee8">

### Employee Data

The data gathered from profiles of employees and their attendances comes in fruitful here as this feature displays the salary accumulated of an employee between a start and end date set by the user. The list of employees is fetched using an API which fills the rest of the useful fields on the page indicating their absents, overtime hours, late hours and base salary. This allows for a clear display of information as the salary of the selected employee between the defined dates is calculated based on these parameters. 

<img width="509" alt="image" src="https://github.com/MuhammadHabibKhan/ems-mern/assets/92048010/b5a8daaa-9c6a-4b32-88f0-938107b03fd0">

