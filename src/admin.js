async function postJSON(username, password) {
    try {
        // Kiểm tra input có rỗng không
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
            return;
        }

        const body = { username, password };
        const response = await fetch("https://be-movie-sooty.vercel.app/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        // Xử lý kết quả từ API
        if (response.ok && result.token) {
            localStorage.setItem('token', result.token);
            alert("Đăng nhập thành công!");
            window.location.href = "index.html";
        } else {
            // Alert lỗi nếu mật khẩu hoặc tài khoản không chính xác
            alert(result.message || "Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
    } catch (error) {
        // Alert khi có lỗi không mong muốn từ server
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
        console.error("Error:", error);
    }
}

// Thêm sự kiện click vào nút đăng nhập
document.querySelector('.btn-primary').addEventListener('click', () => {
    const username = document.getElementById('exampleInputEmail1').value.trim();
    const password = document.getElementById('exampleInputPassword1').value.trim();
    postJSON(username, password);
});
