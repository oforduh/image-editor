const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img img");
const filterOptions = document.querySelectorAll(".filter button");
const filterInfo = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const rotateOptions = document.querySelectorAll(".rotate button");

let brightness = 100,
  saturation = 100,
  inversion = 0;
grayscale = 0;

let rotate = 0;

// fetches the image and do something with it
const loadImage = () => {
  // fetches the file
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);

  // removes the disable css class added to .editor-panel, .reset-filter, .save-img as soon as the image loads
  previewImg.addEventListener("load", () => {
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
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
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

// add the filter
const applyFilter = () => {
  // filter settings
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  //   rotate settings
  previewImg.style.transform = `rotate(${rotate}deg)`;
};

console.log(rotateOptions);

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    }
    applyFilter();
  });
});

// loads the image on image preview
fileInput.addEventListener("change", loadImage);

// update the filter slider and apply the filter
filterSlider.addEventListener("input", updateFilter);

// assigns choose image button to control upload image
chooseImgBtn.addEventListener("click", () => {
  fileInput.click();
});
