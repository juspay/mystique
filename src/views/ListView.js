var dom = require('../doms');
var View = require('../baseView');

class ListView extends View {
	constructor(props, children) {
		super(props, children);
		this.displayName = "ListView"
		this.setIds([
			'id'
		]);
	}

	render() {
		var params = this.props;
		params.__filename = params.__source.fileName  + ' :ln ' + params.__source.lineNumber;

		return (
			<listView
				id={this.props.id?this.props.id:this.idSet.id}
				params={params}/>
		)
	}
}

module.exports = ListView;
