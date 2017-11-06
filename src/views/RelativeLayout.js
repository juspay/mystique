var dom = require('../doms');
var View = require('../baseView');

class RelativeLayout extends View {
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
    var _this = this;
    var children;

    children = this.resolveChildren();

    return (
      <relativeLayout
        id={this.props.id?this.props.id:this.idSet.id}
        params={params}>

        {children}

      </relativeLayout>
    )
  }
}

module.exports = RelativeLayout;
