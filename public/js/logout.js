// function to log out user
const logoutHandler = async (event) => {
    event.preventDefault();
  
      const response = await fetch('/api/users/logout', {

      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
  };
  document
  .querySelector('.logout')
  .addEventListener('click', logoutHandler);