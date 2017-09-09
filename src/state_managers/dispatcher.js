const uiUpdater = require("./post_state_change_handler");

/*
* Calls the UI updater once the new state is obtained from the reducer.
*/

module.exports = (rootView, uiHandler, reducer) => {
	var updateUI = uiUpdater.register(rootView, uiHandler);
	return (stateHandler, action, payload) => {
		setTimeout(() => { 
			updateUI(reducer.evaluate(stateHandler, action, payload)) 
		},0);
	}
}