document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.getElementById("filter");
  const accordionItems = document.querySelectorAll(".accordion-item");

  // Add event listeners to accordion titles
  accordionItems.forEach((item) => {
    const title = item.querySelector(".accordion-title");
    title.addEventListener("click", function () {
      // Toggle the active class on the clicked accordion content
      item.querySelector(".accordion-content").classList.toggle("active");
    });
  });

  filterSelect.addEventListener("change", function () {
    const selectedCategory = filterSelect.value;

    // Hide all accordion items
    accordionItems.forEach((item) => {
      item.style.display = "none";
    });

    // Show accordion items matching the selected category
    if (selectedCategory !== "all") {
      const itemsToShow = document.querySelectorAll(
        `.accordion-item[data-category="${selectedCategory}"]`
      );
      itemsToShow.forEach((item) => {
        item.style.display = "block";
      });
    } else {
      // Show all accordion items if "All Rights" is selected
      accordionItems.forEach((item) => {
        item.style.display = "block";
      });
    }
  });
});
