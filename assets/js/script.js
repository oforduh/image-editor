const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img img");
const filterOptions = document.querySelectorAll(".filter button");
const filterInfo = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetButton = document.querySelector(".reset-filter");

const saveImgButton = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0;
grayscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

// fetches the image and do something with it
const loadImage = () => {
  // fetches the file
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);

  // removes the disable css class added to .editor-panel, .reset-filter, .save-img as soon as the image loads
  previewImg.addEventListener("load", () => {
    resetButton.click(); //reset filter value if the user select new img
    document.querySelector(".container").classList.remove("disable");
  });
};

// looped through all filter options and for each option remove and add the active class to it
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    // set the filter-info to the filter buttonName
    filterInfo.innerText = option.innerText;

    // displays the value of each button slider
    if (option.id === "brightness") {
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

// setting the value of each selected button to the slider value
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
    filterSlider.max = 200;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
    filterSlider.max = 200;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
    filterSlider.max = 100;
  } else {
    grayscale = filterSlider.value;
    filterSlider.max = 100;
  }

  applyFilter();

  console.log(brightness, grayscale, inversion, grayscale);
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilter();
  });
});

// a function that add filters to the image
const applyFilter = () => {
  // filter settings
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  //   rotate settings
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
};

// a function that reset all filters
const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;

  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  //clicking brightness btn, so the brightness selected by default
  filterOptions[0].click();
  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas"); //create canvas element
  const ctx = canvas.getContext("2d"); // canvas.getContext return a drawing context of the canvas

  //   setting canvas width and height to actual image width and height
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  //   translating canvas from center (position the image to the center
  ctx.translate(canvas.width / 2, canvas.height / 2);

  //   applying user selected filter to canvas
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  //   if rotate value isn't 0, rotate the canvas
  if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);

  ctx.scale(flipHorizontal, flipVertical);

  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  // create an a tag, set download value to image.jpg, tag href value to canvas data url, click tag to image downloads
  const link = document.createElement("a");
  link.download = `image.jpg`;
  link.href = canvas.toDataURL();
  link.click();

  //   document.body.appendChild(canvas);
};

// loads the image on image preview
fileInput.addEventListener("change", loadImage);

// update the filter slider and apply the filter
filterSlider.addEventListener("input", updateFilter);

// reset all filters
resetButton.addEventListener("click", resetFilter);

// save image
saveImgButton.addEventListener("click", saveImage);

// assigns choose image button to control upload image
chooseImgBtn.addEventListener("click", () => {
  fileInput.click();
});
