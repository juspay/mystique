var dom = require('../doms');
var View = require('../baseView');

class ProgressBar extends View {
	constructor(props, children) {
		super(props, children);

		this.setIds([
			'id'
		]);
	}

	render() {
		var params = this.props;
		params.__filename = params.__source.fileName  + ' :ln ' + params.__source.lineNumber;

		return (
			<progressBar  
				id={this.props.id?this.props.id:this.idSet.id}
				params={params}/>
		)
	}
}

module.exports = ProgressBar;
