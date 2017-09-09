const immu = require('immu');
var state = immu({});
var events = immu([]);



module.exports = (stateHandlerMap) => {
	return {
		evaluate : (stateHandler, action, payload) => {
			if(typeof action === "string" && typeof stateHandler === "string") {
				// TODO : Proper functional apprach of handling errors has to be used.
				// TODO : Remove if conditions for null checks.
				if(stateHandlerMap[stateHandler]) {
					var result = stateHandlerMap[stateHandler](action, payload, state);
					events = events.push(immu({
						stateHandler : stateHandler, 
						action : action, 
						payload : payload,
						state : result
					}));
					state = events[events.length - 1].state;
					return events[events.length - 1];
				} else {
					throw new Error("stateHandler not present in the stateHandlerMap.");
				}
			} else {
				throw new Error("Action name and stateHandler name have to be string.");
			}
		}
	}
}