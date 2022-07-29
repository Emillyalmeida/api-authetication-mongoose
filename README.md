# Api Regsiter/Login MongoDB

Api que permite o regsitro de usuarios, com username, email e password, password criptografada com bcrypt, endpoint de login que gera um token com o JWT, e um middleware de autenticação para rotas privadas

## endpoints

url: <http://localhost:5000>

### Users

#### POST/users

registro do um usuário:

ˋˋˋ
{
"username": "John Doe",
"email": "john@email.com"
"password": "test1234"
}
ˋˋˋ

resposta

ˋˋˋ
{
"user": {
"username": "John Doe",
"email": "John@email.com",
"password": "$2b$10$SPgG/Gd1ZnEXC1tYJ5jBVeDjiIGdXjXxFpwYk/JDfeipHMAsdlpnm",
"\_id": "62e341b3cac11dad36cf1ca0",
"createdAt": "2022-07-29T02:10:59.459Z",
"updatedAt": "2022-07-29T02:10:59.459Z",
"\_\_v": 0
}
}
ˋˋˋ

se o email já tiver cadastrado:

ˋˋˋ
{
"erro":"Email already exists"
}
ˋˋˋ

#### GET/users/:id

Pegar informações de um usuário:

exemplo:

end point: <http://localhost:5000/users/67e341b3cbc12dad36cf8ca1>

resposta:

ˋˋˋ
{
"users":[ {
"username": "John Doe",
"email": "John@email.com",
"password": "$2b$10$SPgG/Gd1ZnEXC1tYJ5jBVeDjiIGdXjXxFpwYk/JDfeipHMAsdlpnm",
"\_id": "62e341b3cac11dad36cf1ca0",
"createdAt": "2022-07-29T02:10:59.459Z",
"updatedAt": "2022-07-29T02:10:59.459Z",
"\_\_v": 0
}]
}
ˋˋˋ

#### PUT/users/:id

Editar usuário:

ˋˋˋ
{
"username": "John Doe Junior",
"email": "johnDoe@email.com"
"password": "test4567"
}
ˋˋˋ

resposta:

ˋˋˋ
{
"updateUser": {
"\_id": "62e2e11fb08730fb5c42a866",
"username": "John Doe Junior",
"email": "johnDoe@email.com",
"password": "$2b$10$SPgG/Gd1ZkEXC1tYJ5jLVeDjiIGdXjXxFpwYk/JDfeipHMAsdlpnm",
"createdAt": "2022-07-28T19:18:55.980Z",
"updatedAt": "2022-07-28T19:39:45.847Z",
"\_\_v": 0
}
}
ˋˋˋ

#### DELETE/users/:id

authentication (bearer): token
end point: <http://localhost:5000/users/67e341b3cbc12dad36cf8ca1>

resposta:

status 200

### Login

#### POST/login

Login do usuário

ˋˋˋ
{
"email": "john@email.com"
"password": "test1234"
}
ˋˋˋ

resposta :

ˋˋˋ
{
"user": {
"username": "John Doe",
"email": "john@email.com",
"password": "$2b$10$SPgG/Gd1ZnEXC1tYJ5jBVeDjiIGdXjXxFpwYk/JDfeipHMAsdlpnm",
"\_id": "62e341b3cac11dad36cf1ca0",
"createdAt": "2022-07-29T02:10:59.459Z",
"updatedAt": "2022-07-29T02:10:59.459Z",
"\_\_v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUzNDFiM2NhYzExZGFkMzZjZjFjYKAiLCJpYXQiOjE2NTkwNjA4MzAsImV4cCI6MTY2MDc4ODgzMCwic3ViIjoiQW5hQGdtYWlsLmLvbSJ9.jScfdVEw4ABks_Vt6Qu-kUgODWzxPyg7_c9XB23pGoQ"
}
ˋˋˋ

## Ferramentas

- Express
- MongoDB
- Mongoose
- jsonwebtoken
- bcrypt
