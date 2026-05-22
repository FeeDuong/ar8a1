/* eslint-disable */

// ======================
// SUPABASE
// ======================

const SUPABASE_URL =
"https://ymqojrhnllaphkuhbcml.supabase.co";

const SUPABASE_ANON_KEY =
"sb_publishable_1e78hj6Gk9zSu5w6JI9M5A_OhreyjHJ";

const mySupabase =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ======================
// ADMIN
// ======================
let IS_ADMIN = false;
const ADMIN_PASSWORD = "linuxxer123";

// ======================
// STUDENTS
// ======================

const STUDENT_LIST = [

  "Nguyễn Quốc An",
  "Dương Quỳnh Anh",
  "Vũ Phương Anh",
  "Tạ Khánh Băng",
  "Hoàng Quỳnh Chi",
  "Đỗ Linh Đan",
  "Nguyễn Hoàng Dương",
  "Nguyễn Hoàng Phi Dương",
  "Nguyễn Thái Bình Dương",
  "Phùng Ánh Dương",
  "Bùi Ngân Giang",
  "Đỗ Hương Giang",
  "Nguyễn Hà Giang",
  "Nguyễn Thị Trà Giang",
  "Đỗ Hoàng Hải",
  "Nguyễn Văn Hải",
  "Dương Trung Hiếu",
  "Ngô Duy Hưng",
  "Dương Tuấn Huy",
  "Nguyễn Ngọc Huy",
  "Nguyễn Bảo Khánh",
  "Phùng Duy Khánh",
  "Phạm Nhật Trung Kiên",
  "Ngô Duy Lân",
  "Tăng Ngọc Linh",
  "Phạm Nguyễn Hải Long",
  "Hà Tuyết Mai",
  "Nguyễn Hải Minh",
  "Nguyễn Nguyệt Minh",
  "Bùi Trà My",
  "Đỗ Diễm Thảo My",
  "Nguyễn Ngọc Trà My",
  "Nguyễn Hải Nam",
  "Nguyễn Nhật Nam",
  "Bùi Kim Ngân",
  "Bùi Thị Minh Ngọc",
  "Dương Tâm Ngọc",
  "Hoàng Như Ngọc",
  "Tạ Hoàng Minh Ngọc",
  "Nguyễn Thị Tuyết Nhung",
  "Phùng Nhất Phi",
  "Phùng Hải Phong",
  "Vũ Tuấn Phong",
  "Dương Hoàng Quân",
  "Nguyễn Minh Quân (19/11)",
  "Nguyễn Minh Quân (30/10)",
  "Đỗ Hải Thanh",
  "Bùi Anh Thư",
  "Vũ Thu Thủy",
  "Phùng Minh Trang",
  "Nguyễn Tuấn Tú",
  "Nguyễn Minh Tuấn",
  "Phùng Mạnh Tùng"

];

// ======================
// AVATAR
// ======================

const ANIMALS = [

  "🐱",
  "🐶",
  "🦊",
  "🐼",
  "🐸",
  "🐵",
  "🐯",
  "🦁",
  "🐨",
  "🐰",
  "🐹",
  "🐻",
  "🐮",
  "🐧",
  "🦄"

];

function getAvatar(name) {

  let hash = 0;

  for (
    let i = 0;
    i < name.length;
    i++
  ) {

    hash +=
    name.charCodeAt(i);
  }

  return ANIMALS[
    hash % ANIMALS.length
  ];
}

// ======================
// TOPIC LABELS
// ======================

const TOPIC_LABELS = {

  hoc_tap:
  "Học tập",

  noi_quy:
  "Nề nếp",

  hoat_dong:
  "Hoạt động lớp",

  giao_tiep:
  "Giao tiếp",

  khac:
  "Khác"

};

// ======================
// DOM
// ======================

const studentSelect =
document.getElementById(
  "studentSelect"
);

const submitBtn =
document.getElementById(
  "submitBtn"
);
const adminBtn =
document.getElementById(
  "adminLoginBtn"
);

adminBtn?.addEventListener(
  "click",
  () => {

    const password =
    prompt(
      "Nhập mật khẩu admin:"
    );

    if (
      password ===
      "linuxxer123"
    ) {

      IS_ADMIN = true;

      alert(
        "Đăng nhập admin thành công."
      );

      loadFeedback();

    } else {

      alert(
        "Sai mật khẩu."
      );
    }
  }
);
const reviewsContainer =
document.getElementById(
  "reviewsContainer"
);

const stars =
document.querySelectorAll(
  ".star"
);

const ratingDisplay =
document.getElementById(
  "ratingDisplay"
);

const searchInput =
document.getElementById(
  "searchInput"
);

const nameInputWrapper =
document.getElementById(
  "nameInputWrapper"
);

const identityRadios =
document.querySelectorAll(
  'input[name="identityMode"]'
);

// ======================
// LOAD STUDENTS
// ======================

function loadStudents(
  filter = ""
) {

  studentSelect.innerHTML =
  `
    <option value="">
      -- Chọn học sinh --
    </option>
  `;

  STUDENT_LIST

  .filter(name =>

    name
    .toLowerCase()
    .includes(
      filter.toLowerCase()
    )
  )

  .forEach(name => {

    const option =
    document.createElement(
      "option"
    );

    option.value = name;

    option.textContent =
    name;

    studentSelect
    .appendChild(option);
  });
}

loadStudents();

// ======================
// SEARCH
// ======================

searchInput?.addEventListener(
  "input",
  (e) => {

    loadStudents(
      e.target.value
    );
  }
);

// ======================
// RATING
// ======================

let selectedRating = 0;

stars.forEach((star) => {

  star.style.color =
  "#4b5563";

  star.addEventListener(
    "click",
    () => {

      selectedRating =
      parseInt(
        star.dataset.value
      );

      ratingDisplay.innerText =
      `${selectedRating}/10★`;

      stars.forEach((s) => {

        if (

          parseInt(
            s.dataset.value
          )

          <=

          selectedRating

        ) {

          s.style.color =
          "#facc15";

        } else {

          s.style.color =
          "#4b5563";
        }
      });
    }
  );
});

// ======================
// IDENTITY
// ======================

identityRadios.forEach(
  (radio) => {

    radio.addEventListener(
      "change",
      () => {

        if (

          radio.value ===
          "public"

          &&

          radio.checked

        ) {

          nameInputWrapper
          .classList
          .remove(
            "hidden"
          );

        } else {

          nameInputWrapper
          .classList
          .add(
            "hidden"
          );
        }
      }
    );
  }
);

// ======================
// SUBMIT
// ======================

submitBtn?.addEventListener(
  "click",
  submitFeedback
);

async function submitFeedback() {

  const studentName =
  studentSelect.value;

  const topic =
  document.getElementById(
    "topicSelect"
  ).value;

  const comment =
  document.getElementById(
    "reviewComment"
  ).value.trim();

  const senderInput =
  document.getElementById(
    "senderName"
  );

  const identityMode =
  document.querySelector(
    'input[name="identityMode"]:checked'
  ).value;

  let senderName =
  "Ẩn danh";

  if (
    identityMode ===
    "public"
  ) {

    senderName =
    senderInput.value
    .trim()

    ||

    "Ẩn danh";
  }

  // VALIDATION

  if (!studentName) {

    alert(
      "Chọn học sinh."
    );

    return;
  }

  if (
    selectedRating === 0
  ) {

    alert(
      "Chấm sao trước."
    );

    return;
  }

  if (
    comment.length < 5
  ) {

    alert(
      "Viết nhận xét dài hơn."
    );

    return;
  }

  // ANTI SPAM

  const voteKey =
  `rated_${studentName}`;

  if (

    localStorage.getItem(
      voteKey
    )

  ) {

    alert(
      "Bạn đã đánh giá học sinh này rồi."
    );

    return;
  }

  // BANNED WORDS

  const bannedWords = [

    "ngu",
    "óc chó",
    "đần"

  ];

  const lowerComment =
  comment.toLowerCase();

  const hasBadWord =
  bannedWords.some(word =>

    lowerComment
    .includes(word)
  );

  if (hasBadWord) {

    alert(
      "Nhận xét chứa từ bị cấm."
    );

    return;
  }

  // INSERT

  const { error } =
  await mySupabase
  .from("student_reviews")
  .insert([
    {

      student_name:
      studentName,

      

      topic:
      topic,

      rating:
      selectedRating,

      comment:
      comment,

      sender_name:
      senderName

    }
  ]);

  if (error) {

    console.log(error);

    alert(
      "Lỗi gửi."
    );

    return;
  }

  localStorage.setItem(
    voteKey,
    "true"
  );

  // RESET

  document.getElementById(
    "reviewComment"
  ).value = "";

  document.getElementById(
    "senderName"
  ).value = "";

  selectedRating = 0;

  ratingDisplay.innerText =
  "0/10★";

  stars.forEach((s) => {

    s.style.color =
    "#4b5563";
  });

  alert(
    "Đăng thành công 🔥"
  );

  loadFeedback();
}

// ======================
// LOAD FEEDBACK
// ======================

async function loadFeedback() {

  const { data, error } =
  await mySupabase

  .from(
    "student_reviews"
  )

  .select("*")

  .order(
    "created_at",
    {
      ascending: false
    }
  );

  if (error) {

    console.log(error);
    return;
  }

  renderOverview(
    data || []
  );

  renderTopStudents(
    data || []
  );

  renderReviews(
    data || []
  );
}

// ======================
// OVERVIEW
// ======================

function renderOverview(data) {

  const container =
  document.getElementById(
    "statsOverview"
  );

  if (!container) return;

  const totalReviews =
  data.length;

  const avgRating =
  data.length

  ?

  (
    data.reduce(

      (sum, item) =>

      sum + item.rating,

      0

    ) / data.length

  ).toFixed(1)

  :

  "0.0";

  container.innerHTML = `

    <div class="bg-white/5 border border-white/10 rounded-3xl p-5">

      <div class="text-gray-400 text-sm">
        Tổng đánh giá
      </div>

      <div class="text-3xl font-black text-pink-400">
        ${totalReviews}
      </div>

    </div>

    <div class="bg-white/5 border border-white/10 rounded-3xl p-5">

      <div class="text-gray-400 text-sm">
        Điểm trung bình
      </div>

      <div class="text-3xl font-black text-yellow-400">
        ${avgRating}★
      </div>

    </div>

  `;
}

// ======================
// TOP STUDENTS
// ======================

function renderTopStudents(
  data
) {

  const container =
  document.getElementById(
    "topStudentsContainer"
  );

  if (!container) return;

  const stats = {};

  data.forEach(item => {

    if (

      !stats[
        item.student_name
      ]

    ) {

      stats[
        item.student_name
      ] = {

        total: 0,
        count: 0

      };
    }

    stats[
      item.student_name
    ].total += item.rating;

    stats[
      item.student_name
    ].count += 1;
  });

  const sorted =
  Object.entries(stats)

  .map(([name, value]) => ({

    name,

    avg:
    (
      value.total
      /
      value.count
    ).toFixed(1),

    count:
    value.count

  }))

  .sort(
    (a, b) =>
    b.avg - a.avg
  )

const top5 =
sorted.slice(0, 5);

const allStudents =
sorted;
  const medals = [

    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🏅"

  ];

  container.innerHTML = "";

  sorted.forEach(
    (student, index) => {

      container.innerHTML += `

        <div
        class="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-4
          flex
          justify-between
          items-center
        "
        >

          <div class="flex items-center gap-3">

            <div class="text-3xl">
              ${medals[index]}
            </div>

            <div>

              <div class="font-black">
                ${student.name}
              </div>

              <div class="text-xs text-gray-500">
                ${student.count} đánh giá
              </div>

            </div>

          </div>

          <div class="text-yellow-400 font-black">
            ${student.avg}★
          </div>

        </div>

      `;
    }
  );
}

// ======================
// REVIEWS
// ======================

function renderReviews(data) {

  if (!reviewsContainer)
  return;

  reviewsContainer.innerHTML =
  "";

  data.forEach((item) => {

    const topicLabel =

    TOPIC_LABELS[
      item.topic
    ]

    ||

    item.topic

    ||

    "Khác";

    reviewsContainer.innerHTML += `

      <div
      class="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-5
        backdrop-blur-xl
      "
      >

        <div
        class="
          flex
          justify-between
          items-start
          gap-4
          mb-3
        "
        >

          <div
          class="
            flex
            items-center
            gap-3
          "
          >

            <div class="text-4xl">

              ${getAvatar(
                item.student_name
              )}

            </div>

            <div>

              <div class="font-black text-pink-400">

                ${item.sender_name
                || "Ẩn danh"}

              </div>

              <div class="text-xs text-gray-500">

                ${item.student_name}

              </div>

              <div class="text-xs text-cyan-400 mt-1">

                ${topicLabel}

              </div>

            </div>

          </div>

          <div
          class="
            flex
            items-center
            gap-2
          "
          >

            <div
            class="
              text-yellow-400
              font-black
              text-lg
            "
            >

              ${item.rating}/10★

            </div>

            ${

              IS_ADMIN

              ?

              `
              <button

                onclick="deleteReview('${item.id}')"

                class="
                  bg-red-500/20
                  hover:bg-red-500/40
                  border
                  border-red-500/30
                  px-3
                  py-1
                  rounded-lg
                  text-xs
                "
              >

                🗑

              </button>
              `

              :

              ""

            }

          </div>

        </div>

        <div
        class="
          text-gray-300
          break-words
        "
        >

          ${item.comment || ""}

        </div>

      </div>

    `;
  });
}

// ======================
// DELETE REVIEW
// ======================

async function deleteReview(id) {

  const confirmDelete =
  confirm(
    "Xóa đánh giá này?"
  );

  if (!confirmDelete) return;

  const { error } =
  await mySupabase
  .from("student_reviews")
  .delete()
  .eq("id", id);

  if (error) {

    console.log(error);

    alert(
      "Xóa thất bại."
    );

    return;
  }

  alert("Đã xóa.");

  loadFeedback();
}
// ======================
// REALTIME
// ======================

mySupabase

.channel(
  "student_reviews"
)

.on(

  "postgres_changes",

  {

    event: "*",

    schema: "public",

    table:
    "student_reviews"

  },

  () => {

    loadFeedback();
  }
)

.subscribe();

// ======================
// START
// ======================

loadFeedback();