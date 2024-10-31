async function postJSON(username, password) {
    try {
        const body = { username, password };
        const response = await fetch("https://be-movie-sooty.vercel.app/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log("Success:", result);

        // Kiểm tra xem API có trả về token không
        if (result && result.token) {
            // Lưu token vào localStorage để sử dụng sau
            localStorage.setItem('token', result.token);

            // Chuyển hướng đến trang index.html
            window.location.href = "index.html";
        } else {
            console.error("Login failed: ", result.message || "Invalid credentials");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Lắng nghe sự kiện click vào nút đăng nhập
document.querySelector('.btn-primary').addEventListener('click', () => {
    console.log('click');
    const username = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    postJSON(username, password);
});
