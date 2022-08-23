const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const suburb = document.querySelector('#postcode-signup').value.trim();
    const surroundingSuburbs = document.querySelector('#customCheck1').value.trim();
    const fuelType = document.querySelector('#fuel-choice').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)
        if (response.ok) {
            alert("Registration Successful!")
            event.preventDefault();
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/');
            }
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('#signup-btn').addEventListener('submit', signupFormHandler);