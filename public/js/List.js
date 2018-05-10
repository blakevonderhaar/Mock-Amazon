let idClicked;
let currentCatg;

function loadPage(){//edited
  console.log("I have loaded the page");

  $.ajax({
    url: "/getCategory",
    type: "GET",
    success: function(data){
      if(!data)
        alert("NO CATEGORY");
      else{
        console.log(data);
        currentCatg=data;
      }
    }
  })  ;
  console.log("The current catg=" + currentCatg);
  $.ajax({
    url: "/search",
    type: "GET",
    success: function(data){
      for(let i=0;i<data.length;i++){
        if(data[i] != null || data[i] != undefined){
          if(data[i].category == currentCatg){
            $("#list").append(
              "<input id='"+ data[i].name +"' class='tempImg' type='image' src= "+ data[i].img +" height='200' width='200' border='5' onClick='changeCurr(this)'/>"
              + "<p class='description'>"
              + "Name: " + data[i].name + "<br>"
              + "Price: $" + data[i].price + "<br>"
              + "Desc: " + data[i].desc
              + "</p><br>");
          }
        }
      }
    } ,
    dataType: "json"
  });
  return false;

}

function changeCurr(e){
  console.log($(e).attr("id"));
  idClicked = $(e).attr("id");
  console.log(idClicked);
  itemClicked();
}
function itemClicked(){
  //directs you to a certain image's route
  // alert("redirect me");
  $.ajax({
    url: "/loadItem",
    type: "POST",
    data: {itemID:idClicked},
    success: function(data){
      if(!data)
        alert("ERROR LOAD");
      else
        console.log("Good Load");
    } ,
    dataType: "json"
  });
  window.location = "itemPage";
}

$(document).ready(function(){
  loadPage();
  $('.tempImg').click(itemClicked);
});
