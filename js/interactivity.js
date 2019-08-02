jQuery("#credits").on("click", function() {
  var message = 'More Contributors';
  jQuery("#credits").append(
    '<p>'+message+'</p>'
  );
});

jQuery("#scores").on("click",
  function(){
        jQuery("#content").empty();
        jQuery("#content").append(
          "<ul>"+
          "<li>"+ 1 + "</li>" +
          "<li>"+ 2 + "</li>" +
          "<li>"+ 3 + "</li>" +
          "</ul>"
        );
  }
);
