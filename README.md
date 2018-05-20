# ppij

#### Running backend
run _mvn spring-boot:run_ from ./backend folder

Backend is started at _localhost:8080/_

###### From IntelliJ IDEA
_In **Maven Projects** tab open **backend** than **Plugins** than **spring-boot** and double click **spring-boot:run**_

#### Security
You can test login procedure:
###### Login endpoint
`curl -i -H "Content-Type: application/json" -X POST -d '{ "username": "john.doe", "password": "test1234"}' http://localhost:8080/login`.

If credentials are valid, request will return JWT token that can be used when invoking API.

###### Invoking API with JWT token

`curl  -H "Authorization: Bearer ******"  http://localhost:8080/api/restricted` 

#### API
You can inspect exposed api thought swagger UI. It is served on _http://localhost:8080/swagger-ui.html_ when application is running in **test** profile.

#### Image resources
+ Image is created and saved by uploading file to _/api/images_ endpoint.
+ Image is shown by invoking _/api/images/show/image_name_from_db_.

#### Facebook chatbot
_Verify token_ = yVVtz7TFrsajM7erVz8p

