
const themeSelector = document.getElementById('theme');
const body = document.body;
const logo = document.getElementById('logo');


themeSelector.addEventListener('change', changeTheme);


function changeTheme() {
  const selectedTheme = themeSelector.value;

  if (selectedTheme === 'dark') {
    body.classList.add('dark');
    logo.src = 'white-logo.png'; 
  } else {
    body.classList.remove('dark');
    logo.src = 'blue-logo.png'; 
  }
}
