const allCourses = document.querySelector(".all-courses");

const tabs = document.querySelectorAll(".category-item");
const tabsArray = Array.from(tabs);

let leftButtons = document.querySelectorAll(".left-btn");
let rightButtons = document.querySelectorAll(".right-btn");
leftButtons = Array.from(leftButtons);
rightButtons = Array.from(rightButtons);

tabsArray.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    tabsArray.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    renderCourses();
  });
});

rightButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("clicked right");
    for (let i = 0; i < tabsArray.length - 1; i++) {
      if (tabsArray[i].classList.contains("active")) {
        tabsArray[i].classList.remove("active");
        tabsArray[i + 1].classList.add("active");
        break;
      }
    }
    renderCourses();
  });
});

leftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("clicked left");
    for (let i = 1; i < tabsArray.length; i++) {
      if (tabsArray[i].classList.contains("active")) {
        tabsArray[i].classList.remove("active");
        tabsArray[i - 1].classList.add("active");
        break;
      }
    }
    renderCourses();
  });
});

const renderCourses = async () => {
  let uri = "http://localhost:3000/courses";
  const res = await fetch(uri);
  let courses = await res.json();

  let currentTab;
  tabsArray.forEach((ele) => {
    if (ele.classList.contains("active")) currentTab = ele.textContent;
  });

  let currentCourses = [];

  for (const course of courses) {
    if (course.section == currentTab) {
      currentCourses.push(course);
    }
  }

  let template = "";
  currentCourses.forEach((course) => {
    template += `
    <div class="one-course">
        <div class="course-img">
            <img
            src="${course.image}"
            alt="${course.title} Course"/>
        </div>
        <div class="course-details">
            <div class="course-title">
                <h3>${course.title}</h3>
            </div>
            <div class="course-instructor">
                <h6>${course.instructor}</h6>
            </div>
            <div class="course-rating">
                <div class="rate">${course.rate}.0</div>
                <div class="stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                </div>
                <div class="enroll-count">(${course.enrollCount})</div>
            </div>
            <div class="course-price">
                <div class="final-price">E&#163;${course.price}</div>
                <div class="original-price">E&#163;${course.originalPrice}</div>
            </div>
            </div>
    </div>
    `;
  });

  allCourses.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderCourses());

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", async (e) => {
  let searchValue = e.target.value;
  if (searchValue && searchValue.trim().length > 0) {
    searchValue = searchValue.trim().toLowerCase();
  }
  let uri = "http://localhost:3000/courses";
  const res = await fetch(uri);
  let courses = await res.json();
  let filteredCourses = courses.filter((course) =>
    course.title.trim().toLowerCase().includes(searchValue)
  );

  let template = "";
  filteredCourses.forEach((course) => {
    template += `
    <div class="one-course">
        <div class="course-img">
            <img
            src="${course.image}"
            alt="${course.title} Course"/>
        </div>
        <div class="course-details">
            <div class="course-title">
                <h3>${course.title}</h3>
            </div>
            <div class="course-instructor">
                <h6>${course.instructor}</h6>
            </div>
            <div class="course-rating">
                <div class="rate">${course.rate}.0</div>
                <div class="stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                </div>
                <div class="enroll-count">(${course.enrollCount})</div>
            </div>
            <div class="course-price">
                <div class="final-price">E&#163;${course.price}</div>
                <div class="original-price">E&#163;${course.originalPrice}</div>
            </div>
            </div>
    </div>
    `;
  });

  const searchButton = document.querySelector(".search-button");

  searchButton.addEventListener("click", (e) => {
    tabsArray.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.preventDefault();
    allCourses.innerHTML = template;
  });
});
