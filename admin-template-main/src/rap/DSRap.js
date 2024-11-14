const cinemas = [
    { id: 1, name: 'Rạp phim A', address: '123 Đường A, Quận 1' },
    { id: 2, name: 'Rạp phim B', address: '456 Đường B, Quận 2' },
    { id: 3, name: 'Rạp phim C', address: '789 Đường C, Quận 3' }
];

// Hàm hiển thị danh sách rạp phim
function displayCinemaList() {
    const cinemaListDiv = document.getElementById('cinemaList');
    cinemaListDiv.innerHTML = ''; // Xóa nội dung hiện tại

    cinemas.forEach((cinema, index) => {
        // Tạo một thẻ div cho mỗi rạp phim
        const cinemaItem = document.createElement('div');
        cinemaItem.className = 'cinema-item';
        cinemaItem.innerHTML = `
            <div class="cinema-details">
                <div>
                    <span class="cinema-name">${cinema.name}</span><br>
                    <span class="cinema-address">${cinema.address}</span>
                </div>
                <div class="cinema-buttons">
                    <button onclick="editCinema(${index})">Sửa</button>
                    <button class="delete-btn" onclick="deleteCinema(${index})">Xóa</button>
                </div>
            </div>
        `;
        cinemaListDiv.appendChild(cinemaItem);
    });
}

// Hàm xóa rạp phim
function deleteCinema(index) {
    cinemas.splice(index, 1); // Xóa rạp phim khỏi mảng
    displayCinemaList(); // Cập nhật lại danh sách
}

// Hàm sửa tên và địa chỉ rạp phim
function editCinema(index) {
    const newName = prompt('Nhập tên mới cho rạp phim:', cinemas[index].name);
    const newAddress = prompt('Nhập địa chỉ mới cho rạp phim:', cinemas[index].address);
    if (newName && newAddress) {
        cinemas[index].name = newName; // Cập nhật tên rạp phim
        cinemas[index].address = newAddress; // Cập nhật địa chỉ rạp phim
        displayCinemaList(); // Cập nhật lại danh sách
    }
}

// Hiển thị danh sách khi trang được tải
displayCinemaList();