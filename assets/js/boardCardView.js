//카드 상세 보기 - API
//존재하지 않아서 백엔드 생성
const cardGet = async (columnId,cardId) => {
  const api = await fetch(`/api/columns/${columnId}/cards/${cardId}`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    getCardMembers(cardId); //cardId
    cardDetailHtml(data);
    createEmailList(boardId); //boardId
    memberAddBtn(columnId,cardId); //columnId, cardId
    userInfoGet();
    // commentPost(1); //cardId
    // commentGet(1); //cardId
    deleteCard(columnId,cardId); //columnId, cardId
  } else {
    alert(message);
  }
};

//카드 상세 보기 - html
const cardDetailHtml = (data) => {
  document.getElementById('cardName').innerHTML = `<h5 class="modal-title">${data.name}</h5>`;
  document.getElementById(
    'cardGetTitle'
  ).innerHTML = `<input type="text" readonly class="form-control-plaintext" value="${data.name}">`;
  document.getElementById(
    'cardgetContent'
  ).innerHTML = `<textarea class="form-control-plaintext" readonly rows="3" style="min-height: 50px;">${data.description}</textarea>`;
  document.getElementById('cardgetColor').value = data.color;
  document.getElementById('expiredGetDate').value = data.expiredDate.split('T')[0];
};

//카드에 참여한 멤버 확인 - API
//카드 id값으로 유저id값 get. 없어서 생성함
const getCardMembers = async (cardId) => {
  const api = await fetch(`/api/cards/${cardId}/users`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    getHtmlCardMembers(data);
  } else {
    alert(message);
  }
};

//카드에 참여한 멤버 확인 - html
const getHtmlCardMembers = (data) => {
  document.querySelector('.cardMembers').innerHTML = '';
  for (let i in data) {
    document.querySelector('.cardMembers').innerHTML += `<div class="col-sm-10 cardMember">
                                                          <img src="../image/cat.jpg" style="width: 50px; height: 50px; border-radius: 50px;" />
                                                          <input type="text" readonly class="form-control-plaintext" value="${data[i].email}">
                                                      </div>`;
  }
};

//멤버 초대 - 리스트부터 작성.
const createEmailList = async (boardId) => {
  const api = await fetch(`/api/boards/${boardId}/users`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    listHtml(data);
  } else {
    alert(message);
  }
};

const listHtml = (data) => {
  document.getElementById('search_type').innerHTML = '';
  document.getElementById('search_type').innerHTML = '<option value="none">선택해주세요</option>';
  for (let i in data) {
    document.getElementById('search_type').innerHTML += `<option value="${data[i].email}">${data[i].email}</option>`;
  }
};

//멤버 추가 버튼 클릭시
const memberAddBtn = (columnId, cardId) => {
  document.getElementById('memberAddBtn').addEventListener('click', async function () {
    const email = document.getElementById('search_type').value;
    const api = await fetch(`/api/columns/${columnId}/cards/${cardId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });

    const { status } = await api;
    const { message } = await api.json();

    if (status == 200) {
      alert(message);
      window.location.replace(`./boardPage.html?boardId=${boardId}`);
    } else {
      alert(message);
    }
  });
};

//댓글 생성 -API
//댓글 생성시 nickname은 현재 로그인한 사람의 nickname을 불러올거기 때문에 get먼저 생성
const userInfoGet = async () => {
  const api = await fetch(`/api/profile`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    commentPostHtml(data);
  } else {
    alert(message);
  }
};

//댓글 작성시 nickname html
const commentPostHtml = (data) => {
  //해당 아이디를 바로 위div로 옮김
  document.getElementById(
    'commentNickname'
  ).innerHTML = `<label for="CardNickname" class="col-sm-2 col-form-label">${data.nickname}</label>`;
};

//댓글 작성 후 버튼 클릭시 post - error
const commentPost = (cardId) => {
  document.getElementById('commentSumbit').addEventListener('click', async function () {
    const content = document.getElementById('cardComment').value;
    const api = await fetch(`/api/cards/${cardId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content }),
    });
    const { status } = await api;
    const { message } = await api.json();
    console.log(status, message);
    if (status == 200) {
      alert(message);
      window.location.replace(`./boardPage.html?boardId=${boardId}`);
    } else {
      alert(message);
    }
  });
};

//댓글 출력 api - error
const commentGet = async (cardId) => {
  const api = await fetch(`/api/cards/${cardId}/comment`, {
    method: 'GET',
  });

  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    console.log(data);
    getCommentHtml(data);
  } else {
    alert(message);
  }
};

const getCommentHtml = (data) => {
  document.getElementById('commentGetBox').innerHTML = '';
  for (let i in data) {
    document.getElementById(
      'commentGetBox'
    ).innerHTML += `<label for="CardNickname" class="col-sm-2 col-form-label">${data[i].nickname}</label>
                        <div class="col-sm-10">
                          <textarea class="form-control-plaintext" readonly id="cardContent" rows="3" style="min-height: 50px;">${data[i].content}</textarea>
                          </div>`;
  }
};

//카드 삭제 - api
const deleteCard = (columnId, cardId) => {
  //삭제 버튼 클릭시
  document.getElementById('deleteCardBtn').addEventListener('click', async function () {
    const api = await fetch(`/api/columns/${columnId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const { status } = await api;
    if (status == 200) {
      window.location.replace(`./boardPage.html?boardId=${boardId}`);
    }
  });
};
