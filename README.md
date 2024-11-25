# NoahApp
## This repository contains the code for NoahApp, a React Native application with a backend built using Flask. Follow the steps below to set up and run the application.

# APP QR
![image](https://github.com/user-attachments/assets/b2ec7492-be31-4eef-86dd-3fc73d2fb22c)


Prerequisites
•	AWS Account: Required to set up an EC2 instance for the backend.
•	React Native Development Environment: Required to run and install the app on a mobile device. Ensure your device allows installations from external sources.
________________________________________
Table of Contents
1.	Backend Setup on AWS EC2
2.	Running the React Native App
3.	Testing and Accessing NoahApp
________________________________________
1. Backend Setup on AWS EC2
   
   Step 1: Launch an EC2 Instance
      1.	Log into your AWS Console.
      2.	Navigate to EC2 Dashboard and click Launch Instance.
      3.	Select an Amazon Machine Image (AMI), such as Amazon Linux 2.
      4.	Choose an instance type (e.g., t2.micro if you’re using the Free Tier).
      5.	Configure instance settings, and be sure to:
         o	Allow HTTP and HTTPS traffic in the Security Group.
         o	Set up SSH access to connect to your instance.
      6.	Launch the instance.

   
   Step 2: Connect to Your EC2 Instance
      Once your instance is running, connect to it using SSH:
      `ssh -i your-key.pem ec2-user@your-ec2-public-dns`


   Step 3: Install Dependencies and Set Up the Backend
      Run the following commands on your EC2 instance to install the necessary packages and set up a virtual environment:
      ## Update packages
      `sudo yum update -y`

      ## Install Python and pip
      `sudo yum install python3-pip -y`

      ## Install virtualenv
      `sudo pip3 install virtualenv`


   Step 4: Set Up the Python Environment and Run the Backend
      1.	Create a virtual environment and activate it:

   `
   python3 -m venv venv
   source venv/bin/activate
   `
   2.	Install required Python packages:
      `
      cd noah-backend/
      pip install -r requirements.txt
      pip install flask gunicorn
      `
   3.	Start the Flask application:

   `
   python app.py`

   
Note: Make sure the backend is accessible publicly on port 5000 or your specified port. Also,make sure to note the public IP address or DNS of your EC2 instance as it will be needed for configuring the React Native app.
________________________________________
2. Running the React Native App
   1. Clone the repository to your local development environment:

`git clone https://github.com/your-username/NoahApp.git`
cd NoahApp`

   2. 	Install the required dependencies for the React Native app:
`npm install`

   3.	Update the backend URL in your app's configuration file to point to the EC2 instance's public IP:

`// In config.js or relevant configuration file
export const BACKEND_URL = 'http://your-ec2-public-ip:5000';`

   4.	Run the app on a physical device:
   o	iOS: Use `react-native run-ios` (requires macOS).
   o	Android: Use `react-native run-android`


Ensure that your mobile device allows installations from external sources.
Note: Ensure that both your device and the EC2 instance are accessible within the same network or use public IPs for connectivity.

NOTE:
Instead of SP API, the product when submitted will be inserted in the database with all the required parameters for the API as below
![image](https://github.com/user-attachments/assets/3e6d14f3-39e4-4ea9-9dd2-9be828a6ddb8)

________________________________________
3. Testing and Accessing NoahApp
   After deploying the backend and running the mobile app, you can start interacting with NoahApp:
   1.	Open the App: Install and open the app on your device.
   2.	Test the Backend: The app should communicate with the backend hosted on AWS. Ensure that the API endpoints are reachable.
   3.	Monitor Logs: You can check the logs in your EC2 instance for debugging purposes.
________________________________________
Troubleshooting
•	Connection Refused: Check your security group settings in AWS to ensure port 5000 is open.
•	App Crashes: Verify that the backend URL is correctly set in your configuration file.
•	Permissions Issues: Ensure the required permissions are granted for installations from external sources.
________________________________________
Additional Notes
•	Stopping the Backend: If you wish to stop the backend service, you can use Ctrl + C in your terminal.
•	Environment Variables: Consider setting environment variables for sensitive information like database credentials.

