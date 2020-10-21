# ACADEMY API

Backend Code developed in Express-Mongoose, deployed in Heroku
It uses MongoDB Database deployed in Atlas Cluster

## API Routes

where BACKEND_BASE_URL is -

- Load Seed Data in DB - BACKEND_BASE_URL/api/classes/seed

- GET All Classes with Student Data - GET BACKEND_BASE_URL/api/classes/

- Create a Class - POST BACKEND_BASE_URL/api/classes/

Request Body of JSON type -

```
{
    "className": "UX Design Immersive"
}
```

- Add a student - PUT BACKEND_BASE_URL/api/classes/id/5f8fbed30c158c8266539102/addStudent/

Request Body of JSON type -

```
{
    "studentName": "Harry Potter",
    "age":17
}
```

Add the student into students collection and also into the class.

- Delete a Student - PUT BACKEND_BASE_URL/api/classes/id/5f8fbed30c158c8266539102/removeStudent/5f8fc48488c830832262e6c8

Deletes the student from students collection and also from the class.

- Edit a Student - PUT BACKEND_BASE_URL/api/students/id/5f8fc48488c830832262e6c8
  Request Body of JSON type -

```
{
    "studentName": "Harry Potter",
    "age":20
}
```

Updates the student details in students collection.

- Delete a Class - Removes all students from the class
