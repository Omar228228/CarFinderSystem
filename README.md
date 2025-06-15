# CarFinderSystem
Car Finder System - An interactive, user-friendly tool designed to help individuals, regardless of technical knowledge, find the perfect car tailored to their needs through simple, guided questions.

**Setup Instruction**
To deploy "CFS" on a local machine, you need to perform the following steps:
1. Download the **Node** installer and install it at https://nodejs.org/en/download , version node-v22.15.0.

2. Download and install **Mongodb** at https://www.mongodb.com/try/download/community , select version 8.0.9 there.

3. Download the information system as a **".zip"** or perform this process using GitHub. After downloading the CFS project in .zip format, **you need to unzip it.**

4. **Install Npm** for the server and client folders of the project. To do this,
you need to go to each folder in the console using the **cd <project path>/server and /client command.** For them, you need to enter the **_npm install_** command via cmd.

5. **Copy all the text** from the file **cars_db_fill.txt**, which is located in the root of the project and open the **MongoDB shell** with the button on the top right and paste this text into it, having previously selected the database with the command use car_finder_db and pressing **Enter.**

6. Start our system with the following commands:
In the opened directory using the CMD command line, in the **server folder** you need to enter the following command **_node index.js_**
In the **client folder**, enter **_npm install axios_** and **_npm start_**. After executing them, a tab will open in the browser with the information system (automatically), if it does not open, you need to go to the link localhost:3000.
