# Enterprise Management System

A comprehensive system designed to manage enterprise operations including attendance marking, salary calculations, order creation, and profile management for admin, worker, and clients. It also provides the ability to delete and update the said features. A brief detail is provided in the features section of this document.

## Project Overview

This project uses the MERN stack to provide a workable enterprise management system. It includes:

Frontend: React for creating dynamic user interfaces
Backend: Node.js and Express for building a robust API
Database: MongoDB for storing data
Authentication: JWT for secure authentication 

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

>> cd backend
>> npm start 

#### Frontend 

In main folder
>> npm start

Make sure the package.json files are configured accordingly.

## Features

### Login

Provides secure login by matching the username and password against the admin collection in the database and generates a JWT token that is stored in the session storage to be used in the middleware when calling sensitive APIs to protect data.

### Dashboard

A modern and elegantly designed dashboard with descriptive images as icons that uses an overlay design to display text when mouse is hovered over. A profile picture and cover photo section also exist which is static at the moment but can be utilized to personalize the experience of each user. The right side is provided with a clean To Do List to list down all your important tasks of the day so you won’t forget any. The dashboard also greets each user with their name on the screen fetched using APIs.

### Mark Attendance

The first feature on the dashboard is the mark attendance feature which as the name suggest allows the admin to mark attendance of the company employees but also to note down their reporting time, overtime hours and late hours. This allows for an automatic calculation of the salary due to each employee which can be viewed in a separate feature.

### New Profile

The new profile feature contains 3 sub-features inside it which are as follows:

#### Add New Admin
Allows the admins to create a new admin profile.

#### Add New Worker
Allows the admins to create a new worker profile.

#### Add New Client
Allows the admins to create a new client profile. A client profile is required to generate an order for them in the system. 
This also allows for tracking of the balance and payment each client owes to the organization.

### Edit Profile

This feature also contains 3-sub features as the previous one but allows the admins to edit or delete existing profiles of admins, workers or clients. This allows for any sort of change possible to the profiles as required. The APIs fetch the data from database once selecting the username (or company name in case of Client) and populates the fields with old data so that user may update accordingly and correctly. Client’s balance can also be updated here when a payment is made in between 2 orders. 

### Add New Order

Allows admins to add new orders against client profiles. As discussed before, the cost of the order is automatically added to the client profile, increasing the payment that is owed to us by them. This allows for easier tracking of the finances.

### Edit Order

Allows admins to make edits in an existing order.

### Employee Data

The data gathered from profiles of employees and their attendances comes in fruitful here as this feature displays the salary accumulated of an employee between a start and end date set by the user. The list of employees is fetched using an API which fills the rest of the useful fields on the page indicating their absents, overtime hours, late hours and base salary. This allows for a clear display of information as the salary of the selected employee between the defined dates is calculated based on these parameters. 
