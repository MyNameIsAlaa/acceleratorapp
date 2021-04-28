1- Build image:
docker build . -t alaa/acceleratorapp

2- RUN image
docker run -p 46890:8080 -d alaa/acceleratorapp

3- access api on 
 http://localhost:46890

4- 
to list directoy send [POST] request to http://localhost:46890/ with params path in the request body, 
path is relative to application location

for example: sending [POST] request with path=test  will list all files and folders inside [test] directory 