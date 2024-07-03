document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const gender = document.getElementById('gender').value;
            const ic_number = document.getElementById('ic_number').value;
            const email = document.getElementById('email').value;
            const rapidkl_id = document.getElementById('rapidkl_id').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, gender, ic_number, email, rapidkl_id }),
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      alert("Registration successful! Redirecting to login page...");
                      window.location.href = 'login.html';
                  } else {
                      alert("Registration failed: " + data.message);
                  }
              });
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      localStorage.setItem('user', JSON.stringify(data.user));
                      window.location.href = 'profile.html';
                  } else {
                      alert("Login failed: " + data.message);
                  }
              });
        });
    }

    const profilePage = document.querySelector('.profile-page');
    if (profilePage) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileGender').textContent = user.gender;
            document.getElementById('profileICNumber').textContent = user.ic_number;
            document.getElementById('profileEmail').textContent = user.email;
            document.getElementById('profileRapidKLID').textContent = user.rapidkl_id;
        } else {
            window.location.href = 'login.html';
        }
    }
});

