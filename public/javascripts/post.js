$(function(){
	

	$('#addLocation').on('click', function(){
		$('#addLocation').popover({html: 'true', content : '<input type="text" id="address" name="address" placeholder="address"><br><input type="url" id="photo_url" name="photo_url" placeholder="Add Photo"><br><select id="boroughs"><option value="11">Brooklyn</option><option value="12">Bronx</option><option value="13">Manhattan</option><option value="14">Queens</option><option value="15">Staten Island</option></select><br><button id="addGraffito">Add Graffito</button><button id="dismissForm">Dismiss</button>', placement:'left'})
		$('#addLocation').popover('show')
		$('#addGraffito').on('click', function(){
			var address = $('#address').val();
			var photo_url= $('#photo_url').val();
			var borough= $('#boroughs').val();
			$.post( "/graffiti", {address: address, photo_url: photo_url, location_id:borough}).done(function(response){
				console.log(response)
			 // map =  new google.maps.Map(document.getElementById('map-canvas'));
			 var latlng = new google.maps.LatLng(response.latitude, response.longitude);
			 var marker = new google.maps.Marker({
			 	position: latlng,
			 	map: map,
			 	animation:google.maps.Animation.DROP
			 })
			 google.maps.event.addListener(marker, 'click', function() {
			 	point = new GraffitiModel(response)
			 	mapCollection.add(point)
			 	var modalView = new ModalView({model: point})
			 	$('#basicModal').modal('show')
			 	$('#makeHeat').on('click', function(){
			 		marker.setMap(null)

			 	})



			 })


			})
			$('#addLocation').popover('hide')


		})
		$('#dismissForm').on('click', function(){
			$('#addLocation').popover('hide')

		})
	})






	// var search_button = $('#search');
	// search_button.on("click", function(event){
	// 	event.preventDefault();
	// 	var address = $('#address').val();
	// 	var photo_url= $('#photo_url').val();
	// 	var ul_graffiti = $('ul');
	// 	console.log(address + " " + photo_url);

	// 	$.ajax({
	// 		url:"/graffiti",
	// 		type:"POST",
	// 		data:{address: address, photo_url: photo_url}
	// 	}).done(function(data){
	// 		console.log(data);

	// 		ul_graffiti.append("<li>" + address + photo_url);


	// 	});
	// });



///
});