// Mảng chứa các move ban đầu
let moves = [
  { id: 1, name: 'Move 1' },
  { id: 2, name: 'Move 2' }
];


// Hàm render danh sách move
function renderMoves() {
  const moveList = document.getElementById('move-list');
  moveList.innerHTML = ''; // Xóa nội dung trước khi render lại

  moves.forEach((move) => {
      const moveItem = document.createElement('div');
      moveItem.className = 'move-item';
      moveItem.innerHTML = `
          <span>${move.name}</span>
          <div class="actions">
              <button onclick="editMove(${move.id})">Edit</button>
              <button onclick="deleteMove(${move.id})">Delete</button>
          </div>
      `;
      moveList.appendChild(moveItem);
  });
}

// Hàm thêm move mới
function addMove() {
  const newMoveName = document.getElementById('new-move-name').value.trim();
  if (newMoveName === '') {
      alert('Move name cannot be empty!');
      return;
  }

  const newId = moves.length ? moves[moves.length - 1].id + 1 : 1;
  moves.push({ id: newId, name: newMoveName });
  document.getElementById('new-move-name').value = ''; // Clear input
  renderMoves();
}

// Hàm sửa move
function editMove(id) {
  const newName = prompt('Enter new name for the move:');
  if (newName && newName.trim() !== '') {
      moves = moves.map((move) =>
          move.id === id ? { ...move, name: newName.trim() } : move
      );
      renderMoves();
  }
}

// Hàm xóa move
function deleteMove(id) {
  moves = moves.filter((move) => move.id !== id);
  renderMoves();
}

// Render danh sách move ban đầu
renderMoves();
