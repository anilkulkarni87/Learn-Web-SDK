# Stage 1: Build the static web application
FROM nginx:alpine AS frontend
COPY index.html /usr/share/nginx/html/index.html
COPY your_sdk.js /usr/share/nginx/html/your_sdk.js
COPY event_data.html /usr/share/nginx/html/event_data.html 

# Stage 2: Build the Flask application
FROM python:3.9-slim AS backend
WORKDIR /app
COPY requirements.txt /app
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && python3 -m pip install -r requirements.txt
COPY event.py /app

# Expose ports
EXPOSE 5010

# Run Flask app
CMD ["python", "event.py"]
