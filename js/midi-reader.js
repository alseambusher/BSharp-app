var midi = require('midi');

// Set up a new input.
input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
});

// Open the first available input port.
input.openPort(0);

input.ignoreTypes(false, false, false);

// ... receive MIDI messages ...

// Close the port when done.
//input.closePort();
// prevent window being garbage collected

