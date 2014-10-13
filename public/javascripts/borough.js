
var submit_borough = $('#go');
var img = $('.addImg');
var img_input = $('input');
submit_borough.on('click', function(){
  var borough = $('#boroughs').val();
  $('#locations').html(" ");
  // debugger;
  $.get('http://localhost:9292/' + borough, function(data){
    $('body').append('<table class="table table-striped" id="locations"></table>');
    $('#locations').append('<tr data-toggle="modal" data-target="#myModal"><th>Address</th><th>Status</th><th>Artist</th></tr>');
    // debugger;
    // data = JSON.parse(data);

    for(var i=0;i<data.length;i++){
      var status = "Open"
      if (data[i].status.open == false){
        var status = "Closed"
      }
$('#locations').append('<tr id="'+ data[i]["id"] + '"><td>'+data[i]['address']+'</td><td>'+status+'</td><td>'+data[i]['artist_id']+'</td></tr>');
    }
$('tr').click(function(){
  var value = $(this).text();
  var graffiti = this.id;
  $.post('http://localhost:9292/graffiti/' + graffiti, function(data){
    var info = JSON.parse(data);
    var status = "Open"
    if (info.status.open == false){
      var status = "Closed"
    }

    if (info.photo_url){
      var photo = "<img id='graffiti_image' src="+info.photo_url+" width='100' height='100'>"
    } else { photo = ""}
    $('.modal-title').html('<h4>'+info["address"]+'</h4>');

    $('.modal-body').html('<div id="graffiti_map"><img src="https://maps.googleapis.com/maps/api/staticmap?center='+info["latitude"]+','+info["longitude"]+'&zoom=16&size=200x200&markers=color:blue%7Clabel:S%7C'+ info["latitude"] +','+ info["longitude"]+'"  ><h6>Graffiti Case status</h6><p>'+status+'</p></div>'+"<div id='graffiti_info'>"+photo+"</div><br />"
    );
    var statchange = $('p');
    statchange.click(function(){
      if ($('p').text() == "Open"){
        var modal_graffiti = info.id
        $.ajax({
          type: "PUT",
          url: 'http://localhost:9292/graffiti/'+ modal_graffiti,
          data: {address: info.address, location_id: info.location_id, artist_id: info.artist_id, status: {id: info.id, open: false}},
          success: function(){console.log('sent url')},
          dataType: 'json'
        })
        $('p').text("Closed");
      } else {
        $.ajax({
          type: "PUT",
          url: 'http://localhost:9292/graffiti/'+ modal_graffiti,
          data: {address: info.address, location_id: info.location_id, artist_id: info.artist_id, status: {id: info.id, open: true}},
          success: function(){console.log('sent url')},
          dataType: 'json'
        })
        $('p').text("Open");
      }
    })
    // $('#graffiti_image').popover({html: 'true', content: '<img src="'+photo+'"height="400" width="400">'});
    // $('#graffiti_image').popover('show');


  $('.addImg').click(function(){
    $('input').remove();
    $('#submit_img').remove();
    $('.modal-body').append('<input type="text"></input><button id="submit_img">Submit Image</button>');
    $('#submit_img').click(function(){
      var url = $('input').val();
      var modal_graffiti = info.id

      $.ajax({
        type: "PUT",
        url: 'http://localhost:9292/graffiti/'+ modal_graffiti,
        data: {address: info.address, photo_url: url, location_id: info.location_id, artist_id: info.artist_id},
        success: function(){console.log('sent url')},
        dataType: 'json'
       });
      });


  });

    $('#myModal').modal('toggle');

    console.log(data);
  });
  })
 })
})

// var table_row = $('#table_row');
// data[i].click(function(e){$('#myModal').modal('toggle'); console.log(e); console.log(this);
// });
// $(function() {
//
//
// });



// <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
//   Launch demo modal
// </button>
