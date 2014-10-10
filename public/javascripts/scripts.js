
var GraffitiModel = Backbone.Model.extend({
	urlRoot: '/graffiti'
});

var MapCollection = Backbone.Collection.extend({
	url: '/graffiti?limit=100',
	model: GraffitiModel
});

var ModalView = Backbone.View.extend({
	tagName:"div",
	events: {
		
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render)
		this.listenTo(this.model, 'destroy', this.remove)
		this.template = _.template($('#modalTemplate').html())
		this.render()
	},

	render:function(){
		console.log(this.model.attributes.address)
		var myTemplate = this.template({item: this.model.attributes})
		this.$el.html(myTemplate);
		$('.modal-content').empty()
		$('.modal-content').append(this.$el)

		var latlng = new google.maps.LatLng(this.model.attributes.latitude,this.model.attributes.longitude);
		console.log(latlng)
		var mapOptions = {
			zoom:14,
			center:latlng
		}
		console.log(mapOptions)

		var map = new google.maps.Map(document.getElementById("map-canvas-2"), mapOptions);
	
		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});

		$("#basicModal").on("shown.bs.modal", function () {

			google.maps.event.trigger(map, "resize");
			map.setCenter(latlng);
		});


	}

})





$(function(){
	function makeMap(){
		mapCollection = new MapCollection() //initializing new map collection
		mapCollection.fetch().done(function(){//fetching map collection
			var map =  new google.maps.Map(document.getElementById('map-canvas'));
			var bounds = new google.maps.LatLngBounds();

			mapCollection.forEach(function(point){
				if(point.attributes.longitude != null && point.attributes.latitude != null){
					var latlng = new google.maps.LatLng(point.attributes.latitude, point.attributes.longitude);
					bounds.extend(latlng);

				}

				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: 'Hello'
				});
				google.maps.event.addListener(marker, 'click', function() {

					var modalView = new ModalView({model: point})
					$('#basicModal').modal('show')


				})





			})

			map.fitBounds(bounds)


		})

	}
	makeMap()






})









