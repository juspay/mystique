/*
* Return a function which can update the UI post state change.
*/

module.exports = {
	register : (rootView, uiHandler) => {
		return (state) => {
			uiHandler.handle(rootView.handleStateChange(state), null)
		}
	}	
}