$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`       
    $("#user-search-result").append(html);
  } 

  function noUser() {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    $("#user-search-result").append(html);
  }

  function addDeletedUser(userName, userId) {
    var html = `<div class="chat-group-user clearfix" id="${userId}">
                  <p class="chat-group-user__name">
                  ${userName}</p>
                  <div class="user-search-delete chat-group-user__btn chat-group-user__btn--delete" data-user-id="${userId}" data-user-name="${userName}">削除</div>
                </div>`     

    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);

    console.log($(`#${userId}`))
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
  
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
 
    .done(function(users) {
      $("#user-search-result").empty();
    
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        noUser();
      }
    })

    .fail(function() {
      alert('error');
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeletedUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".chat-group-user__btn--delete", function() {
    $(this).parent().remove();
  });
}); 
