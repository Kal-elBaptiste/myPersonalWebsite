let titleCards = [...document.getElementsByClassName("title-card")];

function addTitles(elements) {
  for (i = 0; i < elements.length; i++) {
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");

    let titleDivText = document.createElement("h2");
    if (elements[i].id == "interests") {
      titleDivText.innerText = "My Interests";
      titleDiv.append(titleDivText);
      elements[i].prepend(titleDiv);
    } else if (elements[i].id == "blurbs") {
      titleDivText.innerText = "My Blurbs";
      titleDiv.append(titleDivText);
      elements[i].prepend(titleDiv);
    } else if (elements[i].id == "blog-previews") {
      titleDivText.innerText = "My Recent Blog Posts";
      titleDiv.append(titleDivText);
      elements[i].prepend(titleDiv);
    } else if (elements[i].id == "stamps") {
      titleDivText.innerText = "My Stamp Collection";
      titleDiv.append(titleDivText);
      elements[i].prepend(titleDiv);
    }
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

const blogLink = "blog.html";

async function loadTextFile(link) {
  try {
    // Get blog.html file
    const response = await fetch(link);

    // Make blog file readable to JavaScript
    const fileContent = await response.text();

    // return file for use
    return fileContent;
  } catch (error) {
    console.error("Error: Failed to fetch text file from link :(", error);
  }
}

function extractRecentBlogData(blogResponse, amountofBlogs) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(blogResponse, "text/html");
  const recentBlogs = [...doc.getElementsByClassName("blog-card")].slice(
    -amountofBlogs,
  );

  console.log("doc =", doc);

  console.log("recentBlogs =", recentBlogs);

  let blogDict = {};

  for (let i = 0; i < amountofBlogs; i++) {
    // Kal-El, if you switch up the blog format, this prolly gonna break
    // Lol, I just found out you could query select by id and class ;-;
    // ToDo: Fix this
    let blogTitle = recentBlogs[i]?.querySelector("h2").innerText;
    let blogSubtitle = recentBlogs[i]?.querySelector("h3").innerText;
    let blogDate = recentBlogs[i]?.querySelector("p").innerText;
    blogDict[`blog${i}`] = [blogTitle, blogSubtitle, blogDate];
  }
  return blogDict;
}

async function displayBlogPreviews(blogLink) {
  const htmlText = await loadTextFile(blogLink);
  const blogDict = extractRecentBlogData(htmlText, 3);

  console.log("blogDict =", blogDict);

  const blogContainer = document.querySelector("#blog-preview-container");
  for (let i = Object.keys(blogDict).length - 1; i >= 0; i--) {
    singlePreview = document.createElement("div");
    singlePreview.classList = "blog-preview";
    if (blogDict[`blog${i}`][0]) {
      blogContainer.append(singlePreview);
    }

    previewTitleDiv = document.createElement("div");
    previewTitleDiv.classList = "blog-preview-title-div";
    singlePreview.append(previewTitleDiv);

    previewTitle = document.createElement("h3");
    previewTitle.innerText = blogDict[`blog${i}`][0];
    previewTitleDiv.append(previewTitle);

    previewSubtitleDiv = document.createElement("div");
    previewSubtitleDiv.classList = "blog-preview-subtitle-div";
    singlePreview.append(previewSubtitleDiv);

    previewSubtitle = document.createElement("p");
    previewSubtitle.innerText = blogDict[`blog${i}`][1];
    previewSubtitleDiv.append(previewSubtitle);

    previewDateDiv = document.createElement("div");
    previewDateDiv.classList = "blog-date-div";
    singlePreview.append(previewDateDiv);

    previewDate = document.createElement("p");
    previewDate.innerText = blogDict[`blog${i}`][2];
    previewDateDiv.append(previewDate);
  }
}

displayBlogPreviews(blogLink);
