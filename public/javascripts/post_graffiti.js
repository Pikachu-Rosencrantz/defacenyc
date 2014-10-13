$(function(){
console.log("Testing html page");

	var search_button = $('#search');
	search_button.on("click", function(event){
		event.preventDefault();
			console.log("search button click");

		var address = $('#address').val();
		var photo_url= $('#photo_url').val();
		var ul_graffiti = $('ul');
			console.log(address + " " + photo_url);

$.ajax({
	url:"/graffiti",
	type:"POST",
	data:{address: address, photo_url: photo_url}
	}).done(function(data){
		console.log(data);

		ul_graffiti.append("<li>" + address + photo_url);


		});
	});

///
});
