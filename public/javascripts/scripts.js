
var GraffitiModel = Backbone.Model.extend({
	urlRoot: '/graffiti'
});

var MapCollection = Backbone.Collection.extend({
	url: '/graffiti?limit=100',
	model: GraffitiModel
});
var GraffitiCollection = Backbone.Collection.extend({
	url: '/graffiti',
	model: GraffitiModel
});



var ModalView = Backbone.View.extend({
	tagName:"div",
	events: {
		'click button.addImage': 'addImage',
		'click button.addIt': 'addIt',
		'mouseover img.graffitiImage': 'makeBigger',
		'mouseout img.graffitiImage' : 'makeSmaller',
		'click a.editStatus': 'toggleStatus'
	},

	addImage: function(){
		$('.image_url').html('<input type="text" class="theImage" placeholder="image_url"><button class="addIt">Add Image</button>')
	},
	addIt: function(){

		console.log($('.theImage').val())
		this.model.set('photo_url', $('.theImage').val())
		this.model.save()

	},
	makeBigger: function(){
		console.log(this.model.attributes)
		$('.graffitiImage').popover({html: 'true', content : '<img src="'+this.model.attributes.photo_url+'" height="400" width="400">'})
		$('.graffitiImage').popover('show')

	},
	makeSmaller: function(){

		$('.graffitiImage').popover('hide')

	},
	toggleStatus: function(){
		console.log(this.model.attributes.status)
		if(this.model.attributes.status.open == true){
			this.model.attributes.status.open = false
		}else{
			this.model.attributes.status.open = true


		}
		this.model.save()
		this.render()
		

	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render)
		// this.listenTo(this.model.attributes, 'change', this.render)
		this.listenTo(this.model, 'destroy', this.remove)
		this.template = _.template($('#modalTemplate').html())
		this.render()
	},

	render:function(){

		var myTemplate = this.template({item: this.model.attributes})
		this.$el.html(myTemplate);
		$('.modal-content').empty()
		$('.modal-content').append(this.$el)

		var latlng = new google.maps.LatLng(this.model.attributes.latitude,this.model.attributes.longitude);
		console.log(latlng)
		var mapOptions = {
			zoom:13,
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

		this.delegateEvents()
	}

})





$(function(){
	var GraffitiView = Backbone.View.extend({
		tagName:"li",
		events: {

		},

		initialize: function(){
			this.listenTo(this.model, 'change', this.render)
			this.listenTo(this.model, 'destroy', this.remove)

		},

		render:function(){

			var innards = this.model.attributes.address

			this.$el.html(innards);
		}
	})


	var GraffitiListView = Backbone.View.extend({
		events: {
			'click a.nextPage': 'nextPage'

		},
		nextPage: function(){
			this.page += 1
			console.log(this.page)
			if(this.page <= this.pages){
			var listView = new GraffitiListView({collection: graffitiCollection, el:'#graffitiList',limit:10, page:this.page, pages:this.pages})
			}
	
		},


		initialize: function(options){

			this.limit = options.limit
			this.page = options.page
			this.pages = options.pages

			console.log('initialized')
			var that = this
					
					
			this.collection.fetch({data: {limit:this.limit, page:this.page}}).done(function(){
				that.$el.empty()
				that.render()
			})

			

		},
		// addOne: function(item){
		// 	console.log (item)
		
		// 	var view = new GraffitiView({model: item})
		
		// 	view.render()
		// 	this.$el.append(view.el)
			
		// 	console.log(view.el)

			
			




		// },
		render: function(){
			this.$el.append('<a href="#" class="nextPage">Next page</a>')
			thatEl = this.$el
			this.collection.forEach(function(address){
				console.log(address)
				thatEl.append('<li>'+address.attributes.address+'</li>')
			})
			this.delegateEvents()

		}

	})
	var graffitiCollection = new GraffitiCollection()
	var getCount = new GraffitiCollection()
	getCount.fetch().done(function(){
		console.log('hello')
		var pages = Math.ceil(getCount.length/10)
		
		var page=1;
		if(page <= pages){

			var listView = new GraffitiListView({collection: graffitiCollection, el:'#graffitiList',limit:10, page:page, pages:pages})
}





})
	var markers = []
	var toggle = false
	var map =  new google.maps.Map(document.getElementById('map-canvas'));
	var bounds = new google.maps.LatLngBounds();

	function makeMap(){
		
		mapCollection = new MapCollection() //initializing new map collection
		mapCollection.fetch().done(function(){//fetching map collection
			addMarkers()
			map.fitBounds(bounds)

		})

	}
	makeMap()
	function addMarkers(){

		mapCollection.forEach(function(point, index){

			
			if(point.attributes.longitude != null && point.attributes.latitude != null){
				var latlng = new google.maps.LatLng(point.attributes.latitude, point.attributes.longitude);
				bounds.extend(latlng);


			}
			setTimeout(function(){
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					animation:google.maps.Animation.DROP
				})
				markers.push(marker)
				google.maps.event.addListener(marker, 'click', function() {
					console.log('hello')
					var modalView = new ModalView({model: point})
					$('#basicModal').modal('show')
					setTimeout(function(){ marker.setAnimation(null); }, 800);



				})

			},index*30)
		})
	}
	function addMarkersNoAnimation(){

		mapCollection.forEach(function(point, index){

			
			if(point.attributes.longitude != null && point.attributes.latitude != null){
				var latlng = new google.maps.LatLng(point.attributes.latitude, point.attributes.longitude);
				bounds.extend(latlng);


			}
			
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,

			})
			markers.push(marker)
			google.maps.event.addListener(marker, 'click', function() {
				console.log('hello')
				var modalView = new ModalView({model: point})
				$('#basicModal').modal('show')
				
				


			})


		})
	}

	$('#makeHeat').on('click', function(){ 

		console.log(markers)


		var heat = []
		heatCollection = new GraffitiCollection()
		heatCollection.fetch().done(function(){
			if(toggle === false){
				markers.forEach(function(point){
					point.setMap(null)

				})
				heatCollection.forEach(function(graffito){
					var latlng = new google.maps.LatLng(graffito.attributes.latitude, graffito.attributes.longitude);
					heat.push(latlng)

				})

				heatmap = new google.maps.visualization.HeatmapLayer({
					data: heat
				});

				heatmap.setMap(map);
				heatmap.set('radius', heatmap.get('radius') ? null : 80);
				toggle = true
			}
			else{
				toggle = false
				markers = []
				heatmap.setMap(null);
				addMarkersNoAnimation()
			}
		})





	})


})









