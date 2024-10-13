![Algochamp-logo](https://github.com/iane056/technical-interview-webapp/assets/79944764/5e5a227e-7156-42a5-9b02-7dbfc8a94048)

# AlgoChamp

AlgoChamp is a web application prototype we created for our Part 4 Research Project. It is made to help students better prepare for software technical interviews and ace them!
You might ask how is AlgoChamp different from something like LeetCode? Well, AlgoChamp employs a plethora of novel features that try to address the aspects of interviews candidates most struggle with and those that existing platforms like LeetCode and Hackerrank don't prepare you for.

## Tech Stack

- React
- ExpressJS
- MongoDB
- NodeJS
- JWT
- MaterialUI
- Bootstrap
- Pytorch

## Project Structure

- frontend : all the frontend code for React
- backend : REST API, MongoDB DB connectivity, SBERT, JOBE
  - sbert: scripts to run the base SBERT and the fine-tuned SBERT, data used to fine-tune model, scripts used to do the fine-tuning, logs from fine-tuning
- data-analysis : Scripts for Quantitative data analysis of the data collected from the research study
- jobe : contains pre-built Jobe Docker image for you to use, if you don't want to use the remote one or create your own
  - jobeinabox

## Running AlgoChamp locally

**NOTE:** The following instructions are for users with a Windows Machine. However, the instructions will likely only need minor modifications to be adapted for a Linux distribution or MacOS.

### Things you are required to install

- Node
- npm (Package Manager)
- WSL (Windows Subsystem for Linux)
- Docker (Once you have installed WSL2, you can install Docker on WSL or if you would like to forego WSL altogether just use Docker Desktop for Windows, however we only explain the first approach.)
- Python (Install Python directly onto Windows not WSL and make sure to remember to add it as a PATH variable)
- PIP (package manager for Python)

### Configuring Jobe

Once the above dependencies are installed you can go about getting Jobe to work, so that we can compile and run programming jobs locally!
There are three options, you can either use the prebuilt image for jobe called jobeinabox which exists on DockerHub. Download and just run that.
Another option is to create your own image for Jobe and the final option is to navigate into the `jobe` folder and start up the one we have provided for you/

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
docker pull trampgeek/jobeinabox
sudo docker run -d -p 4000:80 --name jobe trampgeek/jobeinabox:latest
```

The docker image will be running on port 4000 on your local machine, if you want to change the port that it is running on
then change the port number in the command above.

Option 3) cd into the `jobe\jobeinabox` folder and then **Run** the image.

For option two the image might take a little while to download as it is quite large in size.
Also note that the command for option two will automatically run the Jobe image once it finished downloading.

To stop the running server, enter the command:

```
sudo docker stop jobe
```

To start or restart the stopped server, enter the command (option 1,3 uses this for initial start up):

```
sudo docker start jobe
```

To remove the running server, enter the command:

```
sudo docker rm jobe
```

To test that Jobe is up and running and working correctly \*, you
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

Once the repository has been cloned, check the `.env` file in the backend and ensure that it includes the following line (provided that you are running jobe on port 400):

Frontend env

```
VITE_API_BASE_URL=http://localhost:3000
VITE_STATSIG_SDK=
```

Backend env

```
MONGO_URI=""
SECRET_KEY=secretkey23456
PORT=3000
JOBE_URL=http://localhost:4000
BASE_MODEL = 1
FINE_TUNE_MODEL_PATH = "./sbert/fine_tuned_model"
```

The PORT environment variable controls the port that the backend will be running at. Whereas the JOBE_URL variable controls the PORT across which it makes requests to JOBE. Keep in mind if you configure the JOBE server to map to a different port, you will need to change the corresponding PORT for JOBE_URL.

Next, check the `.env` file for the frontend, assuming that your backend is running on PORT 3000, it should contain the following line:

```
VITE_API_BASE_URL=http://localhost:3000
```

**NOTE:** In a production environment the `.env` files would not be stored in the GitHub Repository, however since this is a prototype and for convenience they are not not added to `.gitignore`.

Now we can run the application:

Open up two terminals and cd into the frontend folder of the project directory for one of them and cd into to the backend folder for the other:
![image](https://github.com/iane056/technical-interview-webapp/assets/79944764/e60fc54c-dc7f-4707-bead-a476bb46c2d4)

from there for both terminals, enter the following (enter the command in the backend terminal first):
**NOTE:** Once again, please ensure that JOBE is running before you start the application, you can double check this with the test url provided in one of the previous sections \*.

```
npm run dev
```

Once both frontend and backend terminals have finished processing the command and are up and running, check the terminal for the frontend to see the port the frontend is running on (for us its usually 5173). If the port number were 5173, then the URL that you would enter in a browser to open up the web app would be:

```
http://localhost:5173/
```

If your frontend runs on a different port, then make sure to change the port number in the URL.

## Navigating the App

Now your browser window should show the following home screen for the application:
![image](https://github.com/iane056/technical-interview-webapp/assets/79944764/a0b0eb62-d368-408d-8cce-f22443b67c0c)

From here click the `Signin` button to go the sign in page from where you can click the `Don't have an account? Sign up.` link to create an account:
![image](https://github.com/iane056/technical-interview-webapp/assets/79944764/1f69fa50-a513-46e2-ab63-f201831e4dc0)

Dashboard
<img width="1708" alt="image" src="https://github.com/user-attachments/assets/6597acd0-526f-475d-ae6a-dfb93e5995bb">

Features:
<img width="425" alt="image" src="https://github.com/user-attachments/assets/fea098af-0caa-4aaa-b881-8a035c02c141">
