var dom = require('../doms');
var View = require('../baseView');

class RecyclerView extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([
      'id'
    ]);
  }

  render() {
    var params = this.props;
    params.__filename = params.__source.fileName + ' :ln ' + params.__source.lineNumber;

    return (
      <recyclerView 
				id={this.props.id?this.props.id:this.idSet.id}  
				params={params}/>
    )
  }
}

module.exports = RecyclerView;
