
var submit_borough = $('#go');

submit_borough.on('click', function(){
  var borough = $('#boroughs').val();
  $('#locations').html(" ");
  // debugger;
  $.get('http://localhost:9292/' + borough, function(data){
    $('body').append('<table class="table table-striped" id="locations"></table>');
    $('#locations').append('<tr><th>Address</th><th>Artist</th></tr>');
    // debugger;
    data = JSON.parse(data);

    for(var i=0;i<data.length;i++){
$('#locations').append('<tr><td>'+data[i]['address']+'</td>'+'<td>'+data[i]['artist_id']+'</td></tr>');
    }
  })
})
