const objectAssign = require('object-assign');

class View {
	constructor(props, children) {
		this.props = objectAssign({}, this.props, props);
		this.children = children;
	}
}

module.exports = View;
