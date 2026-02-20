# DNS Lookup Application

This project is a DNS Lookup Application that allows users to input one or multiple domain names and retrieve DNS information using the `dig` command executed in a Docker container. The application consists of a frontend built with HTML, Tailwind CSS, and JavaScript, and a backend powered by Node.js and Express.

## Project Structure

```
dns-lookup-app
├── frontend          # Frontend application
│   ├── src
│   │   ├── index.html       # Main HTML document
│   │   ├── styles.css       # Custom styles using Tailwind CSS
│   │   └── script.js        # JavaScript for handling user input and requests
│   ├── package.json         # Frontend dependencies and scripts
│   └── tailwind.config.js    # Tailwind CSS configuration
├── backend           # Backend application
│   ├── src
│   │   ├── server.ts        # Entry point for the backend server
│   │   ├── routes
│   │   │   └── dns.ts       # DNS route for handling requests
│   │   ├── controllers
│   │   │   └── dnsController.ts # Controller for processing DNS requests
│   │   └── utils
│   │       └── dockerClient.ts   # Utility for managing Docker operations
│   ├── Dockerfile          # Instructions for building the backend Docker image
│   ├── package.json        # Backend dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
├── docker-compose.yml      # Configuration for running frontend and backend together
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd dns-lookup-app
   ```

2. **Install dependencies:**
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd backend
     npm install
     ```

3. **Build and run the application using Docker Compose:**
   ```
   docker-compose up --build
   ```

4. **Access the application:**
   Open your web browser and navigate to `http://localhost:3000` to use the DNS Lookup Application.

## Usage

- Enter one or multiple domain names in the input prompt on the frontend.
- Click the submit button to initiate the DNS lookup.
- The application will display the formatted DNS information retrieved from the backend.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.