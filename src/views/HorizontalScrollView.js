
var dom = require('../doms');
var View = require('../baseView');

//0 - vertical
//1 - horizontal
class HorizontalScrollView extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([
      'id'
    ]);
  }

  resolveChildren() {
    var _this = this;

    return this.children.map(function(child) {
      child.__filename = _this.__filename;
      return  child.render();
    });
  }

  render() {
    var params = this.props;

    let children = this.resolveChildren();

    params.__filename = params.__source.fileName  + ' :ln ' + params.__source.lineNumber;

    return (
      <horizontalScrollView
        id={this.props.id?this.props.id:this.idSet.id}
        params={params}>

        {children}
      </horizontalScrollView>
    );
  }
}

module.exports = HorizontalScrollView;
