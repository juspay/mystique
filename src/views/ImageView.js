var dom = require('../doms');
var View = require('../baseView');

class ImageView extends View {
	constructor(props, children) {
		super(props, children);

		this.setIds([
			'id'
		]);
	}	

	fetchBlob(uri, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', uri, true);
	  xhr.responseType = 'arraybuffer';

	  xhr.onload = function(e) {
	    if (this.status == 200) {
	      var blob = this.response;
	      if (callback) {
	        callback(blob);
	      }
	    }
	  };
  	xhr.send();
	}

	afterRender = () => {
		var _this = this;
		var url = this.props.remoteImageUrl;
		var str;

		if(url)	 {
			str = Gatekeeper.getFileFromInternalStorage(url);

			if (str) {
				console.log(url, ' fetched from cache');
				Android.setImage(_this.id*1, str);
				return; 
			}

			this.fetchBlob(url, function(blob) {
				str = btoa(String.fromCharCode.apply(null, new Uint8Array(blob)));
				Android.setImage(_this.id*1, str);
				Gatekeeper.saveFileToInternalStorage(url, str);
			});
		}
	}

	render() {
		var params = this.props;
		this.id = this.props.id?this.props.id:this.idSet.id;

		// if (this.props.remoteImageUrl) {
		// 	params.imageUrl = "placeholder_image";
		// }
		
		params.__filename = params.__source.fileName  + ' :ln ' + params.__source.lineNumber;

		return (
			<imageView  
				afterRender = {this.afterRender}
				id={this.id}
				params={params}/>
		)
	}
}

module.exports = ImageView;
