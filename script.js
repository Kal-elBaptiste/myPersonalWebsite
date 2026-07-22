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
    singlePreview = document.createElement("a");
    singlePreview.setAttribute("href", "blog.html");
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

let tvShowLinks = [
  "images/tv/shows/animation camping GIF by Mathew Lucas .gif",
  "images/tv/shows/design color GIF by gfaught.gif",
  "images/tv/shows/Friday Night Dance GIF.gif",
  "images/tv/shows/video game halloween GIF by gfaught.gif",
  "images/tv/shows/Vintage 90S GIF by ruidovacio.gif",
  "images/tv/shows/video game 3d GIF by nullbody.gif",
  "images/tv/shows/Dance Wave GIF by LINE FRIENDS.gif",
  "images/tv/shows/Pokemon Staring GIF.gif",
  "images/tv/shows/Fight Boxing GIF by Paul Layzell.gif",
  "images/tv/shows/mega man running GIF by Xbox.gif",
  "images/tv/shows/New Wave 80S GIF.gif",
  "images/tv/shows/Motivational GIF by Chibird.gif",
  "images/tv/shows/through-screen.gif",
  "images/tv/shows/pepe-wizard.gif",
  "images/tv/shows/pong-video-game.gif",
  "images/tv/shows/rhythm-heaven-rockers.gif",
  "images/tv/shows/animation art GIF by Liaizon Wakest.gif",
  "images/tv/shows/stars rainbows GIF.gif",
  "images/tv/shows/terraria-dino-mowing.gif",
  "images/tv/shows/lofi-girl-lofi.gif",
  "images/tv/shows/tweaking-out-black-guy-tweaking-meme.gif",
  "images/tv/shows/lockstep-rhythm-heaven.gif",
  "images/tv/shows/barista-rhytmn-heaven.gif",
  "images/tv/shows/jake-lofi.gif",
  "images/tv/shows/cat.gif",
  "images/tv/shows/gengar.gif",
  "images/tv/shows/epic-face.webp",
  "images/tv/shows/dance-excited.webp",
];

let tvScreen = document.getElementById("tv-screen");

tvScreen.addEventListener("click", (e) => changeChannel(tvShowLinks));

function changeChannel(showLinks) {
  // 1. event.currentTarget gets the element clicked
  const clickedElement = event.currentTarget;

  // 2. Read the current 'data-clicks' value
  // If not present, default to '0' -> string, not number
  const currentCount = clickedElement.dataset.clicks || "0";

  // 3.Set TV show based on currentCount -
  clickedElement.setAttribute("src", showLinks[currentCount]);

  // 3. Convert string to an integer and add 1
  const newCount = parseInt(currentCount, 10) + 1;

  // 4. Save the new count back onto the HTML tag!
  clickedElement.dataset.clicks = newCount % showLinks.length;
}

function turnOffTV() {
  tvScreen.setAttribute("src", "");
}
