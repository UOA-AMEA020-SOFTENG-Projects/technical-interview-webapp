![Algochamp-logo](https://github.com/iane056/technical-interview-webapp/assets/79944764/5e5a227e-7156-42a5-9b02-7dbfc8a94048)
# AlgoChamp
AlgoChamp is a web application prototype we created for our Part 4 Research Project. It is made to help students better prepare for software technical interviews and ace them!
You might ask how is AlgoChamp different from something like LeetCode? Well, AlgoChamp employs a plethora of novel features that try to address the aspects of interviews candidates most struggle with and those that existing platforms like LeetCode and Hackerrank don't prepare you for. 

## Features

## Running AlgoChamp locally
**NOTE:** The following instructions are for users with a Windows Machine. However, the instructions will likely only need minor modifications to be adapted for a Linux distribution or MacOS. 

### Things you are required to install
- Node
- npm (Package Manager)
- WSL (Windows Subsystem for Linux)
- Docker (Once you have installed WSL2, you can install Docker on WSL or if you would like to forego WSL altogether just download Docker Desktop for Windows, however we mostly explain the first approach.)
- Python (Install Python directly onto Windows not WSL and make sure to remember to add it as a PATH variable)
- PIP (package manager for python)

### Configuring Jobe
Once the above dependencies are installed you can go about getting Jobe to work, so that we can compile and run programming jobs locally!
There are two optionsm, you can either use the prebuilt image for jobe called jobeinabox which exists on DockerHub. Download and just run that. 
Or another option is to create your own image for Jobe. 

Option 1) To build you own image of jobe use the following (don't worry about the timezone, leave as is): 
```
sudo docker build . -t my/jobeinabox --build-arg TZ="Europe/Amsterdam"
```
You can then run your newly-built image with the command
```
sudo docker run -d -p 4000:80 --name jobe my/jobeinabox
```

Option 2) **Run** the pre-built DockerHub Image, using the following command: 
```
sudo docker run -d -p 4000:80 --name jobe trampgeek/jobeinabox:latest
```
The docker image will be running on port 4000 on your local machine, if you want to change the port that it is running on 
then change the port number in the command above. 

For option two the image might take a little while to download as it is quite large in size. 
Also note that the command for option two will automatically run the Jobe image once it finished downloading. 

To stop the running server, enter the command:
```
sudo docker stop jobe
```
To start or restart the stopped server, enter the command (option 1 uses this for initial start up too): 
```
sudo docker start jobe
```
To remove the running server, enter the command:
```
sudo docker rm jobe
```
To test that Jobe is up and running and working correctly, you
can check it's running OK by browsing to
```
http://[host_running_docker]:4000/jobe/index.php/restapi/languages
```
and you should get a JSON-encoded list of the supported languages, namely
```
[["c","7.3.0"],["cpp","7.3.0"],["java","10.0.2"],["nodejs","8.10.0"],["octave","4.2.2"],["pascal","3.0.4"],["php","7.2.7"],["python3","3.6.5"]]
```
### Running the application 
Once Jobe is installed and ready to go, you are ready to run the application itself. 
First step is to make sure that the Jobe server is currently running as our application will be using it. 

Download the GitHub repo with 
```
git clone https://github.com/iane056/technical-interview-webapp.git
```
Once the repository has been cloned, check the ``.env`` file in the backend and ensure that it includes the following line (provided that you are running jobe on port 400):
```
DB_URL=mongodb+srv://root:root1234@algochamp-cluster.npdxemw.mongodb.net/test?retryWrites=true&w=majority
SECRET_KEY=secretkey23456
PORT=3000
JOBE_URL=http://localhost:4000
BASE_MODEL = 1
FINE_TUNE_MODEL_PATH = "./sbert/fine_tuned_model"
```
The PORT environment variable controls the port that the backend will be running at. 




