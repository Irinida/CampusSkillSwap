const EventEmitter = require('events');
const exchangeEvents = new EventEmitter();
exchangeEvents.on('requestCreated', (request) => {
  console.log(`Exchange event: New request created for ${request.skillTitle}`);
  // Demonstrates an asynchronous callback, like preparing a notification.
  setTimeout(() => {
    console.log(`Notification prepared for ${request.skillOwner} about ${request.skillTitle}`);
  }, 1000);
});
module.exports = exchangeEvents;
