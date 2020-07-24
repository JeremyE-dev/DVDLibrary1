$(document).ready(function() {
  $('#editDVDformDiv').hide();
  $('#createDVDformDiv').hide();
  $('#toBeDeletedDiv').hide();

  loadLibrary() ;

  //on create button click, hide libray table, and show create showEditForm
  $("#create-dvd-button").click(function(event) {
    $('#navbarDiv').hide();
    $('#DVDdisplaytableDiv').hide();
    $('#createDVDformDiv').show();
  })

});

function loadLibrary() {
  // clear previous content, so we do not append it//
  clearLibraryTable();

  var contentRows = $('#DVDdisplaycontentRows');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/dvds',
//ask Ishwar about method params
    success: function(data, status) {
      $.each(data, function(index, dvd) {
        var title = dvd.title;
        var releaseYear = dvd.realeaseYear;
        var director = dvd.director;
        var rating = dvd.rating;
        var notes = dvd.notes;
        var dvdId = dvd.dvdId;

        var row = '<tr>';
        row += '<td>' + title + '</td>';
        row += '<td>' + releaseYear + '</td>';
        row +='<td>' + rating + '</td>';
        row += '<td>' + director + '</td>';

        row += '<td><a onclick="showEditForm('+ dvdId +')"> Edit</a>'+ " | " + '<a onclick="showDeleteDVD('+ dvdId +')"> Delete</a></td>';


        row += '</tr>';

        contentRows.append(row);

      })
    }
  });
}


function clearLibraryTable() {
  $('#contentRows').empty();
}

function showEditForm(dvdId) {
//clear errorMessages
//$('#errorMessages').empty();
//get the contact details from the server and then fil and show form on success
$.ajax(
  {type: 'Get',
  url: 'http://localhost:8080/dvd/'+ dvdId,
  success: function(data, status) {
    $('#edit-dvd-title').val(data.title)
    $('#edit-release-year').val(data.realeaseYear)
    $('#edit-director').val(data.director)
    $('#edit-rating-dropdown').val(data.rating)
    $('#edit-notes').val(data.notes)


  },
  error: function() {
    $('#errorMessages')
      .append($('<li>'))
      .attr({class: 'list-group-item list-group-item-danger'})
      .text('Error calling web service. Please try again later.');
  }
  });
  $('#DVDdisplaytableDiv').hide();
  $('#editDVDformDiv').show();

}

function confirmDeleteDVD() {

}

function deleteDVD(contactID) {
  $.ajax({
    type: 'DELETE',
    url: "http://localhost:8080/dvd/"+dvdId,
    success: function(status) {
      loadLibrary();
    }

  });
}
