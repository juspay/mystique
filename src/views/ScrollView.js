var dom = require('../doms');
var View = require('../baseView');

//0 - vertical
//1 - horizontal
class ScrollView extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([
      'id'
    ]);
  }

  setOrientation(params) {
    this.orientation = this.props.orientation?"0": "1";
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

    this.setOrientation(params);

    params.__filename = params.__source.fileName  + ' :ln ' + params.__source.lineNumber;

    return (
      <scrollView
        id={this.props.id?this.props.id:this.idSet.id}
        params={params}>

        {children}
      </scrollView>
    );
  }
}

module.exports = ScrollView;
