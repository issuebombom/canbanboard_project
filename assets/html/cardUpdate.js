//카드 수정 버튼 클릭시 온/오프
function modalCardUpdate() {
  if ($('#modalCardUpdate').css('display') == 'none') {
    $('#modalCardUpdate').show();
    $('#modalCardGet').hide();
  }

  const cardUpdateBtn = $('#cardUpdateBtn');
  cardUpdateBtn.on('click', async () => {
    // 컬럼id와 카드id를 가져올 수 있어야 함
    const columnId = 1; // 수정 필요
    const cardId = 1; // 수정 필요
    const name = $('#cardupdateTitle').val();
    const description = $('#cardupdateContent').val();
    const color = $('#cardupdateColor').val();
    const expiredDate = $('#cardupdateDate').val();

    try {
      const response = await fetch(`/api/columns/${columnId}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          columnId,
          cardId,
          name,
          description,
          color,
          expiredDate,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (err) {
      console.error('Error:', err);
    }
  });
}
