
var submit_borough = $('#go');

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
    $('.modal-title').html('<h4>'+info["address"]+'</h4>');
    $('.modal-body').html('<img src="https://maps.googleapis.com/maps/api/staticmap?center='+info["latitude"]+','+info["longitude"]+'&zoom=16&size=200x200&markers=color:blue%7Clabel:S%7C'+ info["latitude"] +','+ info["longitude"]+'"  >'+"<h6>Graffiti Case status</h6>"+status+"</h6>");
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
