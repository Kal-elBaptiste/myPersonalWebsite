// Movement variables
let profilePictureDiv = document.getElementById("pfp-div");
let profilePictureDivRect = profilePictureDiv.getBoundingClientRect();
let profilePictureClicked = false;
let profilePictureClicks =  0;
let profilePictureDivXOffset = 0;
let profilePictureDivYOffset = 0;
let profilePictureXVelocity = 5;
let profilePictureYVelocity = 5;
let profilePictureMover;

// PFP subheading
let profilePictureSubheading = document.getElementById("pfp-subheading");

// Rotation variable
let profilePictureRotation = 0;

// Flips the sign of a number
function getAdditiveInverse(number){
    return -number;
}

// Makes div move independtly of other html elements while still keeping it's orignal space
profilePictureDiv.style.position = "relative";  

// Detects if pfp was clicked and sets profilePictureClicked to true
profilePictureDiv.addEventListener("click", (event) => {
    console.log('PFP WAS CLICKED');
    profilePictureClicked = !profilePictureClicked;
    profilePictureClicks++;
});

// Move pfp every 16.67ms if it was clicked AND rotate it
profilePictureMover = setInterval(() => {

    // PFP DIV PLACEMENT
    if (profilePictureClicked){

        // MOVEMENT LOGIC
        // Rectangle for access to movement data
        profilePictureDivRect = profilePictureDiv.getBoundingClientRect();

        // Moves div
        profilePictureDiv.style.left = `${profilePictureDivXOffset}px`;
        profilePictureDiv.style.top = `${profilePictureDivYOffset}px`;

        // Applies offset for next div movement
        profilePictureDivXOffset+= profilePictureXVelocity;
        profilePictureDivYOffset+= profilePictureYVelocity;

        // If the pfp hits the bottom of the viewport
        if (profilePictureDivRect.bottom > window.innerHeight){

            // Switches velocity and removes overshot position
            profilePictureYVelocity = getAdditiveInverse(profilePictureYVelocity);
            profilePictureDivYOffset -= (profilePictureDivRect.bottom - window.innerHeight);
        }

        // If the pfp hits the top of the viewport
        if (profilePictureDivRect.top < 0){

            // Switches velocity and removes overshot position
            profilePictureYVelocity = getAdditiveInverse(profilePictureYVelocity);
            profilePictureDivYOffset -= (profilePictureDivRect.top);
        }

        // If the pfp hits the left of the viewport
        if (profilePictureDivRect.left < 0){

            // Switches velocity and removes overshot position
            profilePictureXVelocity = getAdditiveInverse(profilePictureXVelocity);
            profilePictureDivXOffset -= (profilePictureDivRect.left);
        }

        // If the pfp hits the right of the viewport
        if (profilePictureDivRect.right > window.innerWidth){

            // Switches velocity and removes overshot position
            profilePictureXVelocity = getAdditiveInverse(profilePictureXVelocity);
            profilePictureDivXOffset -= (profilePictureDivRect.right - window.innerWidth);
        }

        // ROTATION LOGIC
        profilePictureDiv.style.transform =`rotate(${profilePictureRotation}deg)`;
        console.log(profilePictureDiv.style.transform);
        profilePictureRotation++;
        }

    // SUBHEADING LOGIC
    console.log(profilePictureClicks);
    switch (profilePictureClicks){
        case 1:
            profilePictureSubheading.innerText = "I told you not to click the goat.. STOP HIM!";
            break;

        case 2:
            profilePictureSubheading.innerText = "Thank you.";
            break;

        case 3:
            profilePictureSubheading.innerText = ">:(";
            break;
    }

}, 16.67)
