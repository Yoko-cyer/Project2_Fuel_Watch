// function to update user info using POST request to the database
const changeFormHandler = async (event) => {
    event.preventDefault();
  
    const fuel = document.querySelector('#fuel-change').value.trim();
    const suburb = document.querySelector('#suburb-change').value.trim();

    let surrounding = "";
    if(document.querySelector('#surrounding-change').checked) {
      surrounding = "yes";
    }
    else{
      surrounding = "no"
    }
  
      const response = await fetch('/api/users/edit', {
        method: 'POST',
        body: JSON.stringify({ fuel, surrounding, suburb }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to edit.');
      }
  };

  document
  .querySelector('.change-form')
  .addEventListener('submit', changeFormHandler);