const allCourses = document.querySelector(".all-courses");

const renderCourses = async () => {
  let uri = "http://localhost:3000/courses";
  const res = await fetch(uri);
  let courses = await res.json();

  let template = "";
  courses.forEach((course) => {
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
    e.preventDefault();
    allCourses.innerHTML = template;
  });
});
