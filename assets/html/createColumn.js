// 컬럼 생성
document.getElementById('createColumnBtn').addEventListener('click', async function createColumn() {
  // boardId 가져오기
  let boardId = new URLSearchParams(window.location.search).get('boardId');
  boardId = Number(boardId);

  // 컬럼 order
  let columns = document.querySelectorAll('.columnBox > div');
  let columnCnt = 0;
  for (let column of columns) {
    columnCnt++;
  }
  columnCnt += 1;

  const columnName = document.getElementById('columnName').value;

  try {
    const response = await fetch(`/api/boards/${boardId}/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: columnName,
        order: columnCnt,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      location.reload();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
