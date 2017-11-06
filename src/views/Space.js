var dom = require('../doms');
var View = require('../baseView');

class Space extends View {
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
      <space
        id={this.props.id?this.props.id:this.idSet.id}  
        params={params}>

        {this.children.map(function(child) {child.__filename = _this.__filename; return  child.render()})}
      </space>
    )
  }
}

module.exports = Space;
