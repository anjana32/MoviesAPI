async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    try {
        const res = await fetch("user.json");
        const users = await res.json();

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (user) {
            window.location.href = "index.html";
        } else {
            errorMsg.textContent = "❌ Invalid email or password";
        }
    } catch (err) {
        errorMsg.textContent = "⚠️ Unable to load users.json";
        console.error(err);
    }
}
