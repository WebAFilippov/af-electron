import si from 'systeminformation'

// define all values, you want to get back
const valueObject = {
  battery: 'acconnected'
}

function usersCallback(data) {
  console.log('Power usage now: ' + (data.battery.acconnected ? 'AC' : 'battery'));
}

// now define the observer function
let observer = si.observe(valueObject, 1000, usersCallback);

// In this example we stop our observer function after 30 seconds
setTimeout(() => {
  clearInterval(observer)
}, 30000);