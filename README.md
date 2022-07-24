# MediaShareApp

## Table of contents
* Required environment & app 
* Technologies 
* Set up Instruction 
  * Global packages
  * Server
  * Client

## Required environment & tools:
* Make sure you have the following environment(s) & tool(s) installed: 
  * **Node: v16.13.1 (LTS)**
  * **Yarn: v1.22.18**
  * **Docker: Latest version**

## Technologies:
* Server: 
  * **NestJS**
  * **Prisma**
  * **MySQL**
  * **Docker**
* Client:
  * **React Native**
  * **Expo**
  * **NativeBase**

## Set up Instruction:
### After cloning this project from **Github**, please follow these steps to run app.

### 1. Setup global packages:
```
$ npm install -g @nestjs/cli expo-cli nodemon
```

### 2. Setup for Server:

#### Firstly, go to the server directory:
```
.../MediaShareApp $ cd server
```
#### Then, install dependencies:
```
.../server $ npm install
```
#### Setup Database in Docker:
```
.../server $ npm run db:dev:up
```
#### Migrate Database:
```
.../server $ npm run db:dev:migrate
```
#### Then, enter the name for this migration, for example: "migration/v1"
#### Finally, run the server:
```
.../server $ npm run dev
```

### 3. Setup for Client:

#### Firstly, go to the client directory:
```
.../MediaShareApp $ cd client
```
#### Then, install dependencies:
#### *Note: Because of using Expo, you should use yarn as package manager for the client-side*
```
.../client $ yarn install
```
#### And, run the app:
* In **expo**: *$ yarn start*
* In **android emulator**: *$ yarn android*
