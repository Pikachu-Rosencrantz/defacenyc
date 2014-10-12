$(function(){

var images_button = $('#images');
	images_button.on("click", function(event) {
	event.preventDefault();
			console.log("button click");
		
	$.ajax({
		type:"GET",
		url:"/images"
		}).done(function(data){

		var photos = data;
		console.log(data);

		var ul_photos = $('.photos');

			for (i=0; i < photos.length; i++) {
				ul_photos.append("<img src='" +photos[i]["photo_url"]+ "'>")				
			}
	})

})

////
}); 