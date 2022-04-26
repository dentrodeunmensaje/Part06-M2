function getFriends () {
    $('#lista').empty();
    $.get("http://localhost:5000/amigos", function(data){
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(element.name));
        $('#lista').append(li);
      }
      $('img').hide();
    });
  }


$('#boton').on("click", getFriends);

  $('#search').on("click", function () {
    $('#amigo').empty();
    $('#input').empty();
    
    $.get(`http://localhost:5000/amigos/${$('#input').val()}`, function(data){
       
      $('#amigo').append(data.name);
    });
  });

  $('#delete').on("click", function () {
    $('#sucess').empty();
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:5000/amigos/${$('#inputDelete').val()}`,
        success: function(data){
            getFriends();
            $('#success').append(
                `El amigo con el id ${$('#inputDelete')}, ha sido eliminado correctamente`
            );
        },
    });
  });