document.addEventListener("DOMContentLoaded", function () {
  $('[data-toggle="tooltip"]').tooltip();

  var thumbnails = document.querySelectorAll(
    ".preview-thumbnail.nav-tabs li a"
  );
  thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", function (e) {
      // Remove active class from all li parent of thumbnails
      thumbnails.forEach((thumb) =>
        thumb.parentElement.classList.remove("active")
      );

      // Add active class to the li parent of the clicked thumbnail
      this.parentElement.classList.add("active");

      // Accessibility updates for all thumbnails
      thumbnails.forEach((thumb) => {
        thumb.setAttribute("aria-selected", "false");
        document
          .querySelector(thumb.getAttribute("data-target"))
          .setAttribute("aria-hidden", "true");
      });

      // Update for clicked thumbnail
      this.setAttribute("aria-selected", "true");
      var targetId = this.getAttribute("data-target");
      var targetTab = document.querySelector(targetId);
      if (targetTab) {
        targetTab.setAttribute("aria-hidden", "false");
        targetTab.setAttribute("tabindex", "0");
        targetTab.focus(); // Focus to trigger the CSS animation
      }
    });
  });

  // Automatically select the yellow color
  const defaultColorButton = document.getElementById("defaultColor");
  if (
    defaultColorButton &&
    !defaultColorButton.classList.contains("not-available")
  ) {
    defaultColorButton.click(); // Trigger click to select and visually update
  }

   // Accordion toggle actions
   $("#accordion").on("show.bs.collapse", function (e) {
    var $section = $(e.target).prev('.border-bottom').find('button');
    $section.attr('aria-expanded', true);
    $section.find(".toggle-icon").text("-");
});

$("#accordion").on("hide.bs.collapse", function (e) {
    var $section = $(e.target).prev('.border-bottom').find('button');
    $section.attr('aria-expanded', false);
    $section.find(".toggle-icon").text("+");
});
});
function updateImages(color) {

  // Check if the selected color is available
  const selectedColorElement = document.querySelector(`.color.${color}`);
  if (selectedColorElement.classList.contains("not-available")) {
    return; // Stop function if color is not available
  }

  // Update active class on buttons
  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((button) => {
    button.classList.remove("active"); // Use Bootstrap's border utilities if preferred
    button.classList.remove("border-primary"); // Assuming Bootstrap 4 or 5
  }); // Remove active class from all buttons
  selectedColorElement.classList.add("active"); // Add active class to the clicked button
  selectedColorElement.classList.add("border-primary");

  // Update main image
  const mainImage = document.querySelector(".preview-pic .active img");
  mainImage.src = `./assests/shoes-overview-${color}.jpg`;
  mainImage.alt = `View of men's shoes in ${color}`;

  // Assuming there are multiple thumbnails and they follow a predictable naming pattern
  document.querySelectorAll(".preview-thumbnail a").forEach((link, index) => {
    const thumb = link.querySelector("img");
    thumb.src = `./assests/shoes-overview-${color}-thumbnail.jpg`; // Assuming thumbnails are named as 'thumbnail1', 'thumbnail2', etc.
    thumb.alt = `Thumbnail ${index + 1} of men's shoes in ${color}`;
  });

  // Update tab content images
  document.querySelectorAll(".tab-pane").forEach((pane, index) => {
    const img = pane.querySelector("img");
    img.src = `./assests/shoes-overview-${color}.jpg`; // Assuming main images for different views are named as '-1', '-2', etc.
    img.alt = `View ${index + 1} of men's shoes in ${color}`;
  });
}

function selectSize(element) {
  // Remove the selection class from all size buttons
  document.querySelectorAll('.size').forEach(function(size) {
    size.classList.remove('size-selected');
  });

  // Add the 'size-selected' class to the clicked button
  element.classList.add('size-selected');
}
