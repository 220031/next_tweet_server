function startApp() {
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('memo-container').style.display = 'block';
  document.getElementsByClassName('memo-list')[0].style.display = 'block';
}

function saveMemo() {
  const memoContent = document.getElementById('memo').value;
  if (memoContent.trim() === '') {
    alert('メモの内容を入力してください！');
    return;
  }

  const memoList = getMemoList();
  memoList.push(memoContent);
  localStorage.setItem('memoList', JSON.stringify(memoList));

  alert('メモが保存されました！');
  updateMemoList();
}

function clearMemo() {
  if (confirm('入力欄を消してもよろしいですか？')){
  document.getElementById('memo').value = '';
  }
}

function getMemoList() {
  const memoList = localStorage.getItem('memoList');
  return memoList ? JSON.parse(memoList) : [];
}

function deleteMemo(index) {
  if (confirm('メモを削除してもよろしいですか？')){
  const memoList = getMemoList();
  memoList.splice(index, 1);
  localStorage.setItem('memoList', JSON.stringify(memoList));
  updateMemoList();
  }
}

function deleteAllMemos() {
  if (confirm('すべてのメモを削除してもよろしいですか？')) {
    localStorage.removeItem('memoList');
    updateMemoList();
  }
}

function updateMemoList() {
  const memoList = getMemoList();
  const memoListElement = document.getElementById('memoList');

  // リストをクリア
  memoListElement.innerHTML = '';

  // リストを更新
  memoList.forEach((memo, index) => {
    const li = document.createElement('li');
    li.textContent = memo;

    // 削除ボタンを作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = function() {
      deleteMemo(index);
    };
    li.appendChild(deleteButton);

    memoListElement.appendChild(li);
  });
}

window.onload = function() {
  // ページロード時にタイトル画面を表示
  document.getElementById('title-screen').style.display = 'block';
  document.getElementById('memo-container').style.display = 'none';
  document.getElementsByClassName('memo-list')[0].style.display = 'none';

  // 保存されたメモがあれば表示する
  const savedMemo = localStorage.getItem('memo');
  if (savedMemo) {
    document.getElementById('memo').value = savedMemo;
  }
  updateMemoList();
};
