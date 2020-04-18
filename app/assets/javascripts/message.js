$(function(){

  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="main-chat__message">
                    <div class="main-chat__message--contents">
                      <div class="main-chat__message--contents-name">
                      ${message.user_name}
                      </div>
                      <div class="main-chat__message--contents-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__message--tweet">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img class="lower-message__image" src="${message.image}">
                    </div>
                  </div>`
    
    } else if (message.content) {
      var html = `<div class="main-chat__message">
                    <div class="main-chat__message--contents">
                      <div class="main-chat__message--contents-name">
                      ${message.user_name}
                      </div>
                      <div class="main-chat__message--contents-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__message--tweet">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                    </div>
                  </div>`
  
    } else if (message.image) {
      var html = `<div class="main-chat__message">
                    <div class="main-chat__message--contents">
                      <div class="main-chat__message--contents-name">
                      ${message.user_name}
                      </div>
                      <div class="main-chat__message--contents-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__message--tweet">
                      <img class="lower-message__image" src="${message.image}">
                    </div>
                  </div>`
    }
    return html
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.main-chat__footer--sendbtn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })

  })
})