
const articles = [
    {
      id: 1,
      title: "Septimus Heap Book One: Magyk",
      date: "July 5, 2022",
      description: "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
      imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
      imgAlt: "Book cover for Septimus Heap 1",
      ages: "10-14",
      genre: "Fantasy",
      stars: "★★★★"
    },
    {
      id: 2,
      title: "Magnus Chase Book One: Sword of Summer",
      date: "December 12, 2021",
      description: "The anticipated new novel by Rick Riordan... (shortened for brevity)",
      imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
      imgAlt: "Book cover for Magnus Chase 1",
      ages: "12-16",
      genre: "Fantasy",
      stars: "⭐⭐⭐⭐"
    },
    // Add more articles as needed
  ];
  
  // Function to create the article HTML and insert it into the page
  function displayArticles() {
    // Get reference to the container for articles (make sure this matches your HTML)
    const articlesContainer = document.querySelector('.articles');
  
    // Loop through each article object
    articles.forEach(item => {
      // Create a new article element
      const articleEl = document.createElement('article');
      
      // Use a template literal to build the article HTML
      articleEl.innerHTML = `
        <div class="article-grid">
          <div class="details">
            <time datetime="${new Date(item.date).toISOString()}">${item.date}</time>
            <p>${item.genre} | Ages ${item.ages}</p>
            <p>${item.stars}</p>
          </div>
          <div class="content">
            <img src="${item.imgSrc}" alt="${item.imgAlt}">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
          </div>
        </div>
      `;
      
      // Append the article element to the container
      articlesContainer.appendChild(articleEl);
    });
  }
  
  // Call the function to display articles once the script runs
  displayArticles();
  
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his \"Aunt Pol\" and an elderly man calling himself Wolf -- a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
  }
  