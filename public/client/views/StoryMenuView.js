var StoryMenuView = Backbone.View.extend({
  
  tagName: 'div class="col-md-3"',

  initialize: function() {
    this.render();
  },

  template: _.template('<ul><li>Diana\'s Death + The Royals</li><li class="highlight">BP + Deepwater Horizon</li><li>Jeb Bush + Bush Family Shadow</li><li>UK General Election</li></ul>'),

  render: function(){
    return this.$el.html(this.template());
  }
})