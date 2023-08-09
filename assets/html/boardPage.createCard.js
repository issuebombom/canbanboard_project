function createCard(columnId, event) {
  if ($('#modalCardCreate').css('display') == 'none') {
    $('#modalCardCreate').show();
  }

  // 클릭한 버튼의 sibling 태그를 파악
  let totalCardCount;
  const siblingTag = event.target.parentElement.children;
  Object.values(siblingTag).forEach((e) => {
    if (e.className === 'cardBox') {
      // 컬럼에 든 총 카드 개수입니다.
      totalCardCount = e.children.length;
    }
  });

  // 카드 생성 Fetch
  const createCardBtn = document.querySelector('#createCardBtn');
  createCardBtn.addEventListener('click', async () => {
    //* NOTE: 컬럼 id를 획득할 방법이 있어야 함
    const name = document.querySelector('#cardTitle').value;
    const description = document.querySelector('#cardContent').value;
    const color = document.querySelector('#cardColor').value;
    const expiredDate = document.querySelector('#expiredDate').value;
    const columnId = 2; // 임시로 데이터 지정함
    const order = totalCardCount + 1; // 기존 카드개수 + 1

    // 카드 생성 API 요청
    try {
      const response = await fetch(`/api/columns/${columnId}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          color,
          expiredDate,
          order,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        alert('카드 생성 완료');
        // 새로고침
        window.location.replace('./boardPage.html');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
}
