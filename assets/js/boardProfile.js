$(document).ready(async () => {
  colorPut();
});

// 유저정보 모달 창 온/ 오프
//html의 script부분에 있음. 전체 수정했기 때문에 복붙함.
async function userInfo() {
  const isAdmin = profileGet();
  if (isAdmin) {
    if ($('#modalAdmin').css('display') == 'none') {
      $('#modalAdmin').show();
    }
  } else if (!isAdmin) {
    if ($('#modalNotAdmin').css('display') == 'none') {
      $('#modalNotAdmin').show();
    }
  }
}
//프로필 출력 - 현재 로그인한 유저정보 API
const profileGet = async () => {
  const api = await fetch(`/api/profile`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    const boardData = await boardProfileGet();
    const adminId = await boardAdminGet();
    let check = 0;
    //check가 1일경우 프로필모달 admin으로 출력
    //아닐경우 notAdmin으로 출력
    if (adminId.admins == data.userId) {
      check = 1;
    }
    profileHtmlFuc(data, boardData, check);
    if (check == 1) return true;
    return false;
  } else {
    alert(message);
  }
};

// 프로필 출력 - 보드에 있는 유저 정보 API
//없어서 생성함
const boardProfileGet = async () => {
  const api = await fetch(`/api/boards/1/users`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    return data;
  } else {
    alert(message);
  }
};

//보드 정보 출력 - 해당 보드 정보내에있는 admin 필요
const boardAdminGet = async () => {
  const api = await fetch(`/api/boards/1`, {
    method: 'GET',
  });
  const { status } = await api;
  const { message, data } = await api.json();
  if (status == 200) {
    return data;
  } else {
    alert(message);
  }
};

// 프로필 출력 - html
const profileHtmlFuc = (data, boardData, check) => {
  if (check == 1) {
    //해당 id가 admin에 있는 nickname
    //이 아이디는 input 에서 그위인 div로 옮김
    document.getElementById(
      'adminNickname'
    ).innerHTML = `<input type="text" readonly class="form-control-plaintext" value="${data.nickname}">`;
  } else if (check == 0) {
    //해당 id가 not admin에 있는 nickname
    //이 아이디는 input 에서 그위인 div로 옮김
    document.getElementById(
      'nickname'
    ).innerHTML = `<input type="text" readonly class="form-control-plaintext" value="${data.nickname}">`;
  }

  //admin이든 아니든 members로 동일. 그래서 하나이상이라 foreach로 돌려 넣음
  const members = document.querySelectorAll('.members');
  members.forEach(async (e) => {
    e.innerHTML = '';
    for (let i in boardData) {
      //여기서 fetch에 session.user가 아닌 body나 params로 userId값을 받아 되돌려주는 라우터가 있어야
      //해당 유저의 닉네임을 받아올 수 있음. 생각해보니 회원가입시 이미지를 넣지 않음
      e.innerHTML += `<div class="col-sm-10 member">
                            <img src="../image/cat.jpg" style="width: 100px; height: 100px; border-radius: 50px;" />
                            <input type="text" readonly class="form-control-plaintext" value="${boardData[i].email}">
                        </div>`;
    }
  });
};

//이메일 입력 전송
//html에서 해당 버튼 id값 : inviteEmailBtn
document.getElementById('inviteEmailBtn').addEventListener('click', async function () {
  const email = document.getElementById('inviteEmail').value;
  const api = await fetch(`/api/boards/1/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email }),
  });
  const { status } = await api;
  const { message } = await api.json();
  if (status == 200) {
    alert(message);
    window.location.replace('./boardPage.html');
  } else {
    alert(message);
  }
});

//색상 저장
async function colorPut() {
  const board = await boardAdminGet();
  //color는 어느값이든 모두 동일하게 #000000 로 값을 가져옴
  const color = document.getElementById('backgroundColor').value;

  //html에서 해당 버튼 id값 : boardColorBtn
  document.getElementById('boardColorBtn').addEventListener('click', async function () {
    const api = await fetch(`/api/boards/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new putBoard()),
    });
    const { status } = await api;
    const { message } = await api.json();

    console.log(status, message);
  });
  class putBoard {
    constructor() {
      this.name = board.name;
      this.description = board.description;
      this.color = color;
    }
  }
}
