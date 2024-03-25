from flask_cors import CORS
from flask import Flask, render_template, jsonify, request, Response
from flask_socketio import SocketIO
import time, json

app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)

MAX_EVENT_HISTORY_SIZE = 40  # Maximum number of events to keep in history
event_counter = 0  # Counter to track total number of events
# Define a list to store new events
new_events_list = []


# Global list to store event data
event_history = []

# @app.route('/')
# def index():
#     return render_template('index_flask.html', events=event_history)


def track_event(event_type, event_data):
    global event_counter, event_history  # Use global variables for event counter and event history

    # Increment event counter
    event_counter += 1

    # Add the event data to the history
    event_history.append({'event_number': event_counter, 'event_type': event_type, 'event_data': event_data})

    # Clean up event history if it exceeds maximum size
    if len(event_history) > MAX_EVENT_HISTORY_SIZE:
        # Remove oldest events to maintain maximum size
        event_history.pop(0)

    # Broadcast the new event to all connected clients
    socketio.emit('event', {'event_type': event_type, 'event_data': event_data}, broadcast=True)
    
    

@app.route('/track_event', methods=['POST'])
def track_event_route():
    try:
        # Extract event data from the request
        request_data = request.json
        event_type = request_data.get('event_type')
        event_data = request_data.get('event_data')

        print(event_type)
        print(event_data)

        # Track the event with cleanup
        track_event(event_type, event_data)

        # Broadcast the new event to all connected clients
        socketio.emit('event', {'event_type': event_type, 'event_data': event_data})

        return jsonify({"message": "Event data received and processed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



def generate_event_stream():
    last_event_number = 0  # Initialize the last event number to 0
    while True:
        try:
            # Check if there are new events since the last streamed event
            if event_history:
                for event in event_history:
                    if event['event_number'] > last_event_number:
                        event_json = json.dumps(event)
                        event_bytes = (event_json + '\n\n').encode('utf-8')
                        yield event_bytes
                        last_event_number = event['event_number']
            
            # Wait for new events using a timeout (optional)
            time.sleep(0.2)
        except Exception as e:
            print(f"Error in generate_event_stream: {e}")


def on_new_event(data):
    try:
        # Process the event data as before
        event_json = json.dumps(data)
        event_bytes = event_json.encode('utf-8')
        # Yield the event data formatted as an SSE message
        yield event_bytes
    except Exception as e:
        print(f"Error encoding event data: {e}")

@app.route('/events')
def events():
    # Set the response headers to indicate that it's an SSE stream
    response = Response(generate_event_stream(), mimetype='text/event-stream')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5010)
