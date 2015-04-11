// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(el, lineGen) {
    // console.log('lineGen:', lineGen);
    var scope = this;
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        parentEl: el,
        lineGen: lineGen,
      }).render();
    });

    return this;
  }

});