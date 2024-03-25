
# LearnWebSDK - "Exploring Web SDK"

## Real-Time Event Tracking Web Application


This project implements a real-time event tracking web application using Flask, Socket.IO, and a custom JavaScript tracking SDK. It allows users to track page views and custom events on a web page and receive real-time updates of events through Server-Sent Events (SSE).

## Features

- Track page views and custom events in a web application.
- Real-time updates of events using SSE and Socket.IO.
- Custom JavaScript tracking SDK for client-side tracking.
- Backend server implemented using Flask for event processing and broadcasting.
- Docker support for containerization.

## Additional features 

- Real-time event tracking
- WebSocket integration with Socket.IO
- SSE (Server-Sent Events) support for event streaming
- Event history maintenance with maximum size limitation

## Prerequisites

- Python 3.x installed on your system.
- Docker installed (optional, for containerization).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/real-time-event-tracking.git
    ```

2. Navigate to the project directory:

    ```bash
    cd real-time-event-tracking
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

## Usage

### Running Locally

1. Start the Flask server:

    ```bash
    python event.py
    ```

   This will start the Flask server on `http://127.0.0.1:5010/`.

2. Open `index.html` in a web browser to interact with the web application.

3. Click on the "Track Page View" button to track a page view.

4. Click on the "Track Custom Event" button to track a custom event.

5. View real-time updates of events on the web page.

### Running with Docker

1. Build the Docker images:

    ```bash
    docker-compose build
    ```

2. Start the Docker containers:

    ```bash
    docker-compose up
    ```

   This will start the Flask server on `http://127.0.0.1:5010/` and the frontend server on `http://127.0.0.1:8080/`.

3. Open `http://127.0.0.1:8080/` in a web browser to interact with the web application.

4. Follow the same steps as above to track events and view real-time updates.

## Folder Structure

- `event.py`: Flask application for backend event processing and broadcasting.
- `your_sdk.js`: Custom JavaScript tracking SDK for client-side tracking.
- `index.html`: HTML file for the frontend interface of the web application.
- `requirements.txt`: List of Python dependencies.
- `Dockerfile`: Dockerfile for containerization.
- `docker-compose.yml`: Docker Compose file for multi-container setup.

## /events URL

- The `/events` URL provides a Server-Sent Events (SSE) stream of real-time event updates.
- Clients can connect to this URL to receive continuous updates of events tracked by the application.
- The events are streamed as JSON objects, and each event includes information such as event type, event data, and event number.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
