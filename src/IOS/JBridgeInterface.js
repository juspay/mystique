module.exports = {
    getSymbol: function() {

    },
    hideKeyboard: function() {

    },
    getFromSharedPrefs: function(key) {
      return localStorage.getItem(key) || "__failed";
    },
    setInSharedPrefs: function(key, value) {
      localStorage.setItem(key, value);
    },
    getDeviceDetails: () => {
      return JSON.stringify({"deviceId":"TEST","packageName":"in.juspay.dui_android","os":"Android","model":"2014818","version":22,"manufacturer":"Xiaomi"});
    },
    viewPagerAdapter: function(id, jsx, tabJsx, cb) {
      return;
    },
    setClickFeedback: function() {

    }
}
