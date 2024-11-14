function displayUsers(users, userListContainer) {
  // Xóa nội dung cũ nếu có
  userListContainer.innerHTML = "";

  // Duyệt qua từng người dùng và tạo phần tử HTML
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");

    const userName = document.createElement("div");
    userName.classList.add("user-name");
    userName.textContent = user.name;

    const userEmail = document.createElement("div");
    userEmail.classList.add("user-email");
    userEmail.textContent = user.email;

    // Phần tử chứa các nút
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // Nút Sửa
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Sửa";
    editBtn.onclick = () => editUser(user.id);

    // Nút Xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Xóa";
    deleteBtn.onclick = () => deleteUser(user.id);

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    userItem.appendChild(userName);
    userItem.appendChild(userEmail);
    userItem.appendChild(buttons);

    userListContainer.appendChild(userItem);
  });
}

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
  }
}

// Hàm thêm người dùng
async function addUser() {
  const name = prompt("Nhập tên người dùng:");
  const email = prompt("Nhập email người dùng:");

  if (name && email) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        fetchUsers(); // Cập nhật danh sách sau khi thêm thành công
      } else {
        alert("Lỗi khi thêm người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  } else {
    alert("Vui lòng nhập đầy đủ tên và email!");
  }
}

// Hàm xóa người dùng
async function deleteUser(id) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers(); // Cập nhật danh sách sau khi xóa thành công
      } else {
        alert("Lỗi khi xóa người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  }
}

// Hàm sửa thông tin người dùng
async function editUser(id) {
  const newName = prompt("Nhập tên mới:");
  const newEmail = prompt("Nhập email mới:");

  if (newName && newEmail) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (response.ok) {
        fetchUsers(); // Cập nhật danh sách sau khi sửa thành công
      } else {
        alert("Lỗi khi sửa người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi sửa người dùng:", error);
    }
  } else {
    alert("Vui lòng nhập đầy đủ tên và email!");
  }
}
