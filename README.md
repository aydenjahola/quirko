# Quirko - URL Shortener Tool

Quirko is a URL shortener tool built using React for the front end and Python Flask for the back end. It utilizes Flask, Firebase Admin, and React as dependencies, and the database is hosted on Firebase.

## Features

- Shortens long URLs to more concise, shareable links
- Redirects users to the original long URLs when they access the shortened links
- Customizable URL aliases for personalized short links
- Secure and reliable storage of URLs on Firebase
- Simple and intuitive user interface built with React

## Installation

### Prerequisites

- Node.js
- Python
- Firebase project

### Quirko Client (React)
This is single page react app written with bootstrap that takes the long URL from a user, stores it in a database (firebase database) and gives the user a generated mini url.

1. Clone the repository:
```sh
git clone git@github.com:aydenjahola/quirko.git
```

2. Navigate to the client end directory:
```sh
cd quirko/quirko-client
```

3. Install the dependencies:
```sh
npm install
```

4. Create a `.env` file in the `quirko-client` root directory and add the following environment variables:

```sh
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

5. Start the development server:
```sh
npm start
```
This will launch the Quirko application in your browser.

### Quirko Server (Python Flask)

1. Navigate to the server directory:

```sh
cd quirko/qruiko-server
```

2. Create a virtual environment (optional but recommended):
```sh
python3 -m venv venv
source venv/bin/activate
```
Activate the virtual environment:
   - For Linux/Mac: `source venv/bin/activate`
   - For Windows: `venv/Scripts/activate`

3. Install the dependencies:
```sh
pip install -r requirements.txt
```

4. Create a `.env` file in the root of the `quirko-server` directory and specify the following environment variables:
```sh
DATABASE_URL
```

Make sure you have the `ServiceAccountKey.json` file in `quirko-server`.

5. Start the Flask app: 
```sh
python wsgi.py
```

The Flask app is set up to serve the production version of the React app. The **`build`** directory should be located in the **`app`** folder for this to work!

## Usage

1. Access the Quirko application in your browser at `https://quirko.me` (or the specified URL for your hosted website)
2. Enter a long URL in the input field and click the "Shorten URL" button
3. Copy the generated short URL and share it with others
4. When someone accesses the short URL, they will be redirected to the original long URL

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [AGPL License](LICENSE).