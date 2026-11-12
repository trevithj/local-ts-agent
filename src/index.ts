import {callMe, rawTools} from "./weatherAgent.js";
// import {callMe} from "./directoryAgent.js";

console.log("Running");
// callMe();
console.log(rawTools);
const w = await rawTools.getWeather("New York");
console.log(w);

const t = await rawTools.toCelsius(w.temperature);
console.log(t);

// const result = await callMe("Check the contents of the src folder in the current project.");
const result = await callMe("What is the weather like in San Francisco in celsius?");
console.log(Object.keys(result));


//> [ 'initialResponseMessages', 'steps', '_output', 'totalUsage' ]
// console.log(result.totalUsage);
