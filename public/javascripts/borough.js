$(function(){

  var submit_borough = $('#selectBorough');
  var boroughDisplay = false;
  submit_borough.on('change', function(){
    var borough = $('#selectBorough').val();
    $('#locations').html(" ");

    $.get('/' + borough, function(data){

      if(boroughDisplay == false){
        $('#map').toggle('fade')
        $('.boroughData').toggle()
        boroughDisplay = true
      }

      $('.goHome').on('click', function(){
        if(boroughDisplay == true){
         $('#map').toggle('fade')
         $('.boroughData').toggle()
         boroughDisplay = false

       }

     })
      $('boroughData').empty()
      $('.boroughData').append('<table class="table table-striped" id="locations"></table>');
      $('#locations').append('<tr data-toggle="modal" data-target="#myModal"><th>Address</th></tr>');



      for(var i=0;i<data.length;i++){
        if(data[i][['address']]){
          $('#locations').append('<tr id="'+ data[i]["id"] + '"><td>'+data[i]['address']+'</td></tr>');
        }
      }
      $('tr').click(function(){
        var thatId = this.id
        var graffitiCollection = new GraffitiCollection()
        graffitiCollection.fetch().done(function(){

          var graffiti = graffitiCollection.get(thatId)
          var modal = new ModalView({model: graffiti})
          $('#basicModal').modal('show')
          console.log(graffiti)
          // var value = $(this).text();

        })
      // $.post('http://localhost:9292/graffiti/' + graffiti, function(data){
      //   var info = JSON.parse(data);
      //   $('.modal-title').html('<h4>'+info["address"]+'</h4>');
      //   $('.modal-body').html('<img src="https://maps.googleapis.com/maps/api/staticmap?center='+info["latitude"]+','+info["longitude"]+'&zoom=16&size=200x200&markers=color:blue%7Clabel:S%7C'+ info["latitude"] +','+ info["longitude"]+'"  >');
      //   $('#myModal').modal('toggle');
      //   console.log(data);
      // });
    })


    })
})
})







heroku pgbackups:restore DATABASE 'https://s3.amazonaws.com/ChampionGraph/deface.dump' --confirm fast-journey-9682







