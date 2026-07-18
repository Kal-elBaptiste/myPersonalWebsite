let titleCards = [...document.getElementsByClassName("title-card")];

function addTitles(elements) {
  for (i = 0; i < elements.length; i++) {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");

    let titleDivText = document.createElement("h2");
    if (elements[i].id == "interests") {
      titleDivText.innerText = "My Interests";
    } else if (elements[i].id == "blurbs") {
      titleDivText.innerText = "My Blurbs";
    } else if (elements[i].id == "blog-preview") {
      titleDivText.innerText = "My Recent Blog Posts";
    } else if (elements[i].id == "blog-1") {
      titleDivText.innerText = "My First Blog Post!";
    } else if (elements[i].id == "stamps") {
      titleDivText.innerText = "My Stamp Collection";
    } else {
      titleDivText.innerText = "TITLE DIV PLACE HOLDER";
    }

    titleDiv.append(titleDivText);
    elements[i].prepend(titleDiv);
  }
}
addTitles(titleCards);

let blogCardDetails = [...document.getElementsByClassName("blog-detail")];

function addBlogExitButtons(elements) {
  for (i = 0; i < elements.length; i++) {
    let exitButton = document.createElement("button");
    exitButton.classList.add("exit-button");
    exitButton.innerText = "Close Blog Post";
    exitButton.onclick = () => {
      exitButton.closest("details").removeAttribute("open");
    };

    elements[i].append(exitButton);
  }
}
addBlogExitButtons(blogCardDetails);
