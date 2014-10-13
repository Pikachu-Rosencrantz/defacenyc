$(function(){

var images_button = $('.seeImages');
	images_button.on("click", function(event) {
	event.preventDefault();
			console.log("button click");
		
	$.ajax({
		type:"GET",
		url:"/images"
		}).done(function(data){
		$('#map').toggle('fade')
		$('.pictures').toggle('fade')
		$('.photos').empty()
		var photos = data;
		console.log(data);

		var ul_photos = $('.photos');

			for (i=0; i < photos.length; i++) {
				console.log('hello')
				ul_photos.append("<li> <img src='" +photos[i]["photo_url"]+ "' height='200' width='200'></li>")				
			}
	})

})


});