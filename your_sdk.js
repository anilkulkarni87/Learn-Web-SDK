var MyTrackingSDK = {
  apiKey: null,
  userId: null,
  initialize: function (apiKey) {
    this.apiKey = apiKey;
    // Initialize user ID from cookie or generate a new one if not present
    this.userId = this.getUserIdFromCookie() || this.generateUserId();
    // Log initialization details
    // console.log('SDK initialized with API key:', apiKey);
    // console.log('User ID:', this.userId);
    // console.log('Browser:', navigator.userAgent);
    // console.log('Device:', this.getDeviceType());
  },
  getUserIdFromCookie: function () {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim().split("=");
      if (cookie[0] === "user_id") {
        return cookie[1];
      }
    }
    return null;
  },
  generateUserId: function () {
    var userId = "user_" + Math.random().toString(36).substr(2, 9);
    // Set the user ID as a cookie for future use
    document.cookie = "user_id=" + userId;
    return userId;
  },
  trackPageView: function (pageUrl) {
    var timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    // console.log('Tracking page view:', pageUrl, 'at', timestamp);
    // Include user ID, browser, device, and timestamp in the tracked event
    this.sendEvent("page_view", {
      url: pageUrl,
      user_id: this.userId,
      browser: navigator.userAgent,
      device: this.getDeviceType(),
      event_name: "page_view",
      timestamp: timestamp,
    });
  },
  trackEvent: function (eventName, eventData) {
    if (!this.apiKey) {
      console.error("Error: API key is not set. Cannot track event.");
      return;
    }
    var timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    // console.log('Tracking event:', eventName, eventData, 'at', timestamp);
    // Include user ID, browser, device, and timestamp in the tracked event
    eventData.user_id = this.userId;
    eventData.browser = navigator.userAgent;
    eventData.device = this.getDeviceType();
    eventData.timestamp = timestamp;
    eventData.event_name = eventName;
    this.sendEvent(eventName, eventData);
  },
  sendEvent: function (eventName, eventData) {
    // Check if the API key is set
    if (!this.apiKey) {
      console.error("Error: API key is not set. Cannot send event.");
      return;
    }
    // Send event data to your analytics backend
    // This is a placeholder for actual tracking logic
    // console.log("Sending event to analytics backend:", eventName, eventData);
    const endpointUrl = "http://127.0.0.1:5010/track_event";
    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"http://127.0.0.1:5010:5010"
      },
      body: JSON.stringify({
        event_type: eventName,
        event_data: eventData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Event data sent successfully");
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error sending event data:", error);
      });
  },
  getDeviceType: function () {
    var userAgent = navigator.userAgent;
    if (userAgent.match(/Android/i)) {
      return "Android";
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      return "iOS";
    } else if (userAgent.match(/Windows Phone|iemobile/i)) {
      return "Windows Mobile";
    } else if (userAgent.match(/Windows|Mac|Linux/i)) {
      return "Desktop";
    } else {
      return "Unknown";
    }
  },
};
