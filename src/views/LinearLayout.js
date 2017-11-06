var dom = require('../doms');
var View = require('../baseView');
var parseParams = require('../helpers/ios/parseParams');

class LinearLayout extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([
      'id'
    ]);
  }

  setOrientation(params) {
    if (!this.props.orientation || this.props.orientation == "horizontal" ) {
      this.orientation = "1";
    } else {
      this.orientation = "0";
    }
  }

  resolveChildren () {
    var _this = this;

    return this.children.map(function(child) {
      child.__filename = _this.__filename;
      return  child.render();
    });
  }

  render() {
    var params = this.props;
    var children;

    this.setOrientation(params);

    children = this.resolveChildren();

    var layout = (
      <linearLayout
        id={this.props.id?this.props.id:this.idSet.id}
        params={params}>

        {children}
      </linearLayout>
    );

    return layout;
  }
}

module.exports = LinearLayout;
