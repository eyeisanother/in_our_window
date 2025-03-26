import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Set up Supabase
const supabaseUrl = 'https://vsuqgxrckqnxtdctjsgb.supabase.co'; // Your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdXFneHJja3FueHRkY3Rqc2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNTQzODUsImV4cCI6MjA1NzczMDM4NX0.B1r3g13LEg87b5_37wkuTFuPPSVA81U-rIbXn_BI4og'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

let randomImage; // Keeps track of a random image

function loadRandomImage() {
  return new Promise((resolve, reject) => {
    const imageUrls = [
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/horsetest.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7476.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/0431636A-83AC-4535-9AB2-403E70D9A8B2.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/10018349-9C0D-4399-B301-38EC5D69E452-644-0000000EC854D402.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_0640.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_2125.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_2888.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_3516.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_3522.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_3527.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_3910.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_4339.heic",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_4876.heic",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_4597.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_5121.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_5568.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_5666.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_5790.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_5849.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_6027.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_6030.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_6034.jpg",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7801.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7805.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7800.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7803.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7806.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7807.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7804.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7802.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7810.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7808.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7809.JPG",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_9380.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7748.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7299.HEIC",
      "https://vsuqgxrckqnxtdctjsgb.supabase.co/storage/v1/object/public/uploads/uploads/IMG_7128.HEIC"
    ];

    // Computer picks a random image
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];

    resolve(randomImageUrl);

    // Background image of the grid
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.style.backgroundImage = `url(${randomImageUrl})`;

    // Loads the image
    const img = new Image();
    img.src = randomImageUrl;
    img.onload = function() {
      resolve(randomImageUrl); // URL of the loaded image
    };
    img.onerror = function() {
      reject(new Error(`Failed to load image: ${randomImageUrl}`));
    };
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const coverPage = document.getElementById("cover-page");
  const bootUpScreen = document.getElementById("boot-up-screen");
  const bootUpText = document.getElementById("boot-up-text");
  const desktopBackground = document.getElementById("desktop-background");
  const stickyNote = document.getElementById("sticky-note");
  const popupTab = document.getElementById("popup-tab");
  const imageUpload = document.getElementById("image-upload");
  const filenameBar = document.getElementById("filename-bar");
  const saveButton = document.getElementById("save-image");
  const folder1 = document.getElementById('myFolder1');
  const folder2 = document.getElementById('myFolder2');
  const folder3 = document.getElementById('myFolder3');
  const folder4 = document.getElementById('myFolder4');
  const folderContents1 = document.getElementById('myFolderContents1');
  const folderContents2 = document.getElementById('myFolderContents2');
  const folderContents3 = document.getElementById('myFolderContents3');
  const folderContents4 = document.getElementById('myFolderContents4');

  

  folder1.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-contents')) {
      folderContents1.classList.toggle('show');
    }
  });

  folderContents1.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const fullscreenImage = document.getElementById("fullscreen-image");
      fullscreenImage.style.display = "flex";
      const fullscreenImageImg = fullscreenImage.querySelector('img');
      fullscreenImageImg.src = e.target.src;
    } else {
      e.stopPropagation();
    }
  });

  folder2.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-contents')) {
      folderContents2.classList.toggle('show');
    }
  });

  folderContents2.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const fullscreenImage = document.getElementById("fullscreen-image");
      fullscreenImage.style.display = "flex";
      const fullscreenImageImg = fullscreenImage.querySelector('img');
      fullscreenImageImg.src = e.target.src;
    } else {
      e.stopPropagation();
    }
  });

  folder3.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-contents')) {
      folderContents3.classList.toggle('show');
    }
  });

  folderContents3.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const fullscreenImage = document.getElementById("fullscreen-image");
      fullscreenImage.style.display = "flex";
      const fullscreenImageImg = fullscreenImage.querySelector('img');
      fullscreenImageImg.src = e.target.src;
    } else {
      e.stopPropagation();
    }
  });

  folder4.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-contents')) {
      folderContents4.classList.toggle('show');
    }
  });

  folderContents4.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const fullscreenImage = document.getElementById("fullscreen-image");
      fullscreenImage.style.display = "flex";
      const fullscreenImageImg = fullscreenImage.querySelector('img');
      fullscreenImageImg.src = e.target.src;
    } else {
      e.stopPropagation();
    }
  });

  // Close button for fullscreen image
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const fullscreenImage = document.getElementById("fullscreen-image");
    fullscreenImage.style.display = "none";
  });

  desktopBackground.addEventListener('click', (e) => {
    if (!e.target.closest('#myFolder1') && !e.target.closest('#myFolder2') && !e.target.closest('#myFolder3') && !e.target.closest('#myFolder4')) {
      folderContents1.classList.remove('show');
      folderContents2.classList.remove('show');
      folderContents3.classList.remove('show');
      folderContents4.classList.remove('show');
    }
  });

  // Hide fullscreen cover image after 5 seconds
  setTimeout(function() {
    const coverPage = document.getElementById("cover-page");
    if (coverPage) {
      coverPage.style.display = "none";
    }

    // Show boot-up screen
    bootUpScreen.style.display = "flex";

    // Start boot-up animation after cover page is hidden
    startBootUpAnimation();
  }, 3000);

  function startBootUpAnimation() {
    // Boot-up 
    const bootUpMessage = `IN_OUR_WINDOW

    Press Space to skip

    A window into a shared digital space 
         built from fragments of our personal digital rooms.

    The system invites you to contribute a picture from your device, a piece of your space.

     What you choose to share is yours to control.

    Once submitted, the image is in the hands of the system and of other users
         rolling between rules and chance to distort, arrange, and make connections.

    This evolving archive becomes a shifting map of patterns and traces
         shaped by human choices and system logic.
   
    In a time when our devices house both our personal worlds and are contested spaces for our data
     this project reflects on the tension between our deliberate choices and the systems beyond our control.
     
                                                                                                 Press Space to continue`;

    let charIndex = 0;

    // Typing Animation
    function typeBootUpText() {
      if (charIndex < bootUpMessage.length) {
        bootUpText.textContent += bootUpMessage[charIndex];
        charIndex++;
        setTimeout(typeBootUpText, 18);
      }
    }

    typeBootUpText();

    // Spacebar to skip boot up
    document.addEventListener("keydown", function(event) {
      if (event.code === "Space") {
        bootUpScreen.style.display = "none"; // Hides the boot up
        
        charIndex = bootUpMessage.length; 
        bootUpText.textContent = bootUpMessage; 
      }
    });
  }

 // Closes the sticky note and opens popup tab
 stickyNote.addEventListener("click", function() {
   popupTab.style.display = "block"; // Pop up tab appears
   stickyNote.style.display = "none"; // Hides the sticky note after clicking
 });
 
 // Close popup tab when desktop background is clicked
 desktopBackground.addEventListener("click", function(event) {
   if (event.target !== stickyNote && !popupTab.contains(event.target)) {
     popupTab.style.display = "none"; // Hides the popup tab
   }
 });
 
 // Close Pop up
 saveButton.addEventListener("click", async function() {
   const file = imageUpload.files[0];
   const tag = document.getElementById("tags").value;
   let fileUrl; // Keeps track of uploaded image
    if (file) {
      console.log('File selected:', file.name);

      const storage = supabase.storage.from('uploads');
      const { data, error } = await storage.upload(`uploads/${file.name}`, file);

      if (error) {
        console.error('Error uploading file:', error.message);
        return;
      }

      console.log('File uploaded successfully:', data);

      fileUrl = `${supabaseUrl}/storage/v1/object/public/${data.path}`; // Uploaded image

      const { data: insertData, error: insertError } = await supabase
        .from('uploads_metadata')
        .insert([{ filename: file.name, tag: tag, file_path: data.path }]);

      if (insertError) {
        console.error('Error inserting metadata:', insertError.message);
      } else {
        console.log('Metadata inserted successfully:', insertData);
      }
    } else {
      console.log('No file selected');
    }

    popupTab.style.display = "none"; // Hide pop up
    stickyNote.style.display = "none"; // Hide sticky note

    // Success alert
    setTimeout(() => {
      if (fileUrl) { 
        showSuccessAlert(fileUrl);
        setTimeout(async () => {
          const successAlert = document.getElementById('success-alert');
          if (successAlert) {
            successAlert.classList.remove('show');
            successAlert.style.display = 'none';
          }
          await loadRandomImage().then((imageUrl) => {
            showGridAfterSuccess(imageUrl);
          });
        }, 2000); 
      }
    }, 1000); 
  });

  // File name into bar
  imageUpload.addEventListener("change", function() {
    const file = imageUpload.files[0];
    if (file) {
      filenameBar.textContent = file.name;
    } else {
      filenameBar.textContent = "No file selected";
    }
  });
});

// Success alert
function showSuccessAlert(fileUrl) {
  console.log('Showing success alert...');
  const successAlert = document.getElementById('success-alert');
  if (successAlert) {
    successAlert.classList.add('show');
    successAlert.style.display = 'block';
  }
}

