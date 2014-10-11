
var submit_borough = $('#go');

// submit_borough.on('click', function(){
//   var borough = $('#boroughs').val();
//   $('#locations').html(" ");
//   // debugger;
//   $.get('http://localhost:9292/' + borough, function(data){
//     $('body').append('<table class="table table-striped" id="locations"></table>');
//     $('#locations').append('<tr><th>Address</th><th>Artist</th></tr>');
//     // debugger;
//     data = JSON.parse(data);
//
//     for(var i=0;i<data.length;i++){
// $('#locations').append('<tr><td>'+data[i]['address']+'</td>'+'<td>'+data[i]['artist_id']+'</td></tr>');
//     }
//   })
// })

// every borough is a collection
var GraffitiModel = Backbone.Model.extend({
	urlRoot: '/graffiti'
});

var MapCollection = Backbone.Collection.extend({
	url: '/graffiti?limit=100',
	model: GraffitiModel
});


var Brooklyn = Backbone.Collection.extend({
  url: '/graffiti/1',
  model: GraffitiModel
});

var Bronx = Backbone.Collection.extend({
  url: '/graffiti/2',
  model: GraffitiModel
});

var Manhattan = Backbone.Collection.extend({
  url: '/graffiti/3',
  model: GraffitiModel
});

var Queens = Backbone.Collection.extend({
  url: '/graffiti/4',
  model: GraffitiModel
});

var Staten_island = Backbone.Collection.extend({
  url: '/graffiti/5',
  model: GraffitiModel
});

// function getBorough(){
//   var brooklyn = new Brooklyn();
//   brooklyn.fetch().done(function(){
//
//     console.log('fetched.')
//     brooklyn.forEach(function(b){
//       $('body').append('<table class="table table-striped" id="locations"></table>');
//       $('#locations').append('<tr><th>Address</th><th>Artist</th></tr>');
//       // debugger;
//       console.log('hi.')
//       b = JSON.parse(b);
//
//       for(var i=0;i<b.length;i++){
//   $('#locations').append('<tr><td>'+b[i]['address']+'</td>'+'<td>'+b[i]['artist_id']+'</td></tr>');
//       }
//     }
//   )
//
//   })
//   }

var brooklyn = new Brooklyn();
brooklyn.fetch().done(function(list){
  console.log(list);
  var list = new ListView();
  debugger;
})


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

var ListView = Backbone.View.extend({
  tagName: "div",
  initialize: function(){
    // this.listenTo(this.collection, 'add', this.render)
    this.render()
  },

  render: function(){
    $('body').append('<table class="table table-striped" id="locations"></table>');
    // $('#locations').append('<tr><th>Address</th><th>Artist</th></tr>');
    debugger;
    $('#locations').append('<tr><td>'+ this.models + '</td><td>'+ this.collection.attributes + '</td></tr>');
    console.log('hi.')
    // b = JSON.parse(b);

//     for(var i=0;i<b.length;i++){
// $('#locations').append('<tr><td>'+b[i]['address']+'</td>'+'<td>'+b[i]['artist_id']+'</td></tr>');
//     }
  }
});


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
