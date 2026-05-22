/* eslint-disable */
const IS_ADMIN = true;
const SUPABASE_URL = "https://ymqojrhnllaphkuhbcml.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1e78hj6Gk9zSu5w6JI9M5A_OhreyjHJ";
alert("Đừng chấm bẩn bạn nhé!");
const mySupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// =======================
// DEVICE ID
// =======================
supabase.auth.signInWithPassword()
let deviceId =
localStorage.getItem(
  "device_id"
);

if (!deviceId) {

  deviceId =
  crypto.randomUUID();

  localStorage.setItem(
    "device_id",
    deviceId
  );
}
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

const TOPIC_LABELS = {
  hoc_tap: "Học tập",
  noi_quy: "Nề nếp / nội quy",
  hoat_dong: "Hoạt động lớp",
  giao_tiep: "Giao tiếp / ứng xử",
  khac: "Khác",
};

const studentSelect = document.getElementById("studentSelect");
const topicSelect = document.getElementById("topicSelect");
const reviewComment = document.getElementById("reviewComment");
const senderNameInput = document.getElementById("senderName");
const submitBtn = document.getElementById("submitBtn");
const ratingDisplay = document.getElementById("ratingDisplay");
const nameInputWrapper = document.getElementById("nameInputWrapper");
const statsContainer = document.getElementById("statsContainer");
const reviewsContainer = document.getElementById("reviewsContainer");
const identityRadios = document.querySelectorAll('input[name="identityMode"]');
const stars = document.querySelectorAll(".star");

let selectedRating = 0;

function initStudentList() {
  if (!studentSelect) return;

  STUDENT_LIST.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    studentSelect.appendChild(option);
  });
}

function initStars() {
  stars.forEach((star) => {
    star.style.color = "#4b5563";
    star.style.transition = "0.15s";

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value, 10);
      ratingDisplay.innerText = `${selectedRating}/10★`;

      stars.forEach((s) => {
        if (parseInt(s.dataset.value, 10) <= selectedRating) {
          s.style.color = "#facc15";
          s.style.transform = "scale(1.15)";
        } else {
          s.style.color = "#4b5563";
          s.style.transform = "scale(1)";
        }
      });
    });
  });
}

function initIdentityToggle() {
  identityRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "public" && radio.checked) {
        nameInputWrapper.classList.remove("hidden");
      } else if (radio.value === "anonymous" && radio.checked) {
        nameInputWrapper.classList.add("hidden");
      }
    });
  });
}

function resetForm() {
  reviewComment.value = "";
  senderNameInput.value = "";
  studentSelect.value = "";
  selectedRating = 0;
  ratingDisplay.innerText = "0/10★";

  stars.forEach((s) => {
    s.style.color = "#4b5563";
    s.style.transform = "scale(1)";
  });
}

async function submitFeedback() {

  console.log("submit chạy");

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

  const voteKey =
  `rated_${studentName}`;

  // =======================
  // COOLDOWN 30s
  // =======================

  const lastSubmit =
  localStorage.getItem(
    "last_submit_time"
  );

  if (lastSubmit) {

    const diff =
    Date.now() -
    parseInt(lastSubmit);

    if (diff < 30000) {

      alert(
        "Chờ 30 giây trước khi gửi tiếp."
      );

      return;
    }
  }

  // =======================
  // CHECK ĐÃ VOTE CHƯA
  // =======================

  if (
    localStorage.getItem(voteKey)
  ) {

    alert(
      "Bạn đã đánh giá học sinh này rồi."
    );

    return;
  }

  // CHẶN VOTE 2 LẦN

  if (
    localStorage.getItem(voteKey)
  ) {

    alert(
      "Bạn đã đánh giá học sinh này rồi."
    );

    return;
  }

  // CHECK HỌC SINH

  if (!studentName) {

    alert(
      "Chọn học sinh."
    );

    return;
  }

  // CHECK SAO

  if (selectedRating === 0) {

    alert(
      "Chấm sao trước."
    );

    return;
  }

  // CHECK COMMENT

  if (comment.length < 10) {

    alert(
      "Phải nhập ít nhất 10 ký tự."
    );

    return;
  }

  // DANH TÍNH

  const identityMode =
  document.querySelector(
    'input[name="identityMode"]:checked'
  ).value;

  let senderName =
  "Ẩn danh";

  if (
    identityMode === "public"
  ) {

    senderName =
    document.getElementById(
      "senderName"
    ).value.trim()
    || "Ẩn danh";
  }

  // INSERT DB

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
      senderName,

    reviewer_device_id:
      deviceId
  }
]);

  // ERROR

  if (error) {

    console.log(error);

    alert(
      "Lỗi gửi đánh giá."
    );

    return;
  }

  // LƯU LOCALSTORAGE

 localStorage.setItem(
  voteKey,
  "true"
);

localStorage.setItem(
  "last_submit_time",
  Date.now()
);

  // SUCCESS

  alert(
    "Đăng thành công 🔥"
  );

  resetForm();

  loadFeedback();
}
  const topic = topicSelect.value;
  const comment = reviewComment.value.trim();
  const identityMode = document.querySelector('input[name="identityMode"]:checked')?.value || "anonymous";

  let senderName = "Ẩn danh";
  if (identityMode === "public") {
    senderName = senderNameInput.value.trim() || "Ẩn danh";
  }

  if (!studentName) {
    alert("Chọn học sinh.");
    return;
  }

  if (!topic) {
    alert("Chọn chủ đề.");
    return;
  }

  if (selectedRating === 0) {
    if (comment.length < 10) {

  alert(
    "Phải nhập lời đánh giá tối thiểu 10 ký tự."
  );

  return;
}
  }

  if (comment.length < 10) {
    alert("Nhập nội dung góp ý.");
    return;
  }

  if (comment.length > 400) {
    alert("Nội dung quá dài.");
    return;
  }

  const { error } = await mySupabase.from("student_reviews").insert([
    {
      student_name: studentName,
      topic: topic,
      rating: selectedRating,
      comment: comment,
      sender_name: senderName
    }
  ]);

  if (error) {
    console.log(error);
    alert("Lỗi gửi.");
    return;
  }
  localStorage.setItem(voteKey, "true");
  alert("Đăng thành công 🔥");
  resetForm();
  loadFeedback();

async function loadFeedback() {
  const { data, error } = await mySupabase
    .from("student_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }
renderOverview(data || []);

renderStats(data || []);

renderTopStudents(data || []);

renderReviews(data || []);
  function renderTopStudents(data) {

  const container =
  document.getElementById(
    "topStudentsContainer"
  );

  if (!container) return;

  container.innerHTML = "";

  const stats = {};

  data.forEach(item => {

    if (
      !stats[item.student_name]
    ) {

      stats[item.student_name] = {
        total: 0,
        count: 0
      };
    }

    stats[item.student_name]
    .total += item.rating;

    stats[item.student_name]
    .count += 1;
  });

  const sorted =
  Object.entries(stats)

  .map(([name, value]) => ({

    name,

    avg:
      (
        value.total /
        value.count
      ).toFixed(1),

    count:
      value.count
  }))

  .sort(
    (a, b) =>
      b.avg - a.avg
  )

  .slice(0, 5);

  const medals = [
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🏅"
  ];

  sorted.forEach(
    (student, index) => {

      container.innerHTML += `
        <div
          class="
            bg-gray-950
            border border-gray-800
            rounded-2xl
            p-4
            flex
            justify-between
            items-center
            hover:border-yellow-500
            transition-all
          "
        >

          <div
            class="flex items-center gap-3"
          >

            <div
              class="text-2xl"
            >
              ${medals[index]}
            </div>

            <div>

              <div
                class="
                  font-bold
                  text-white
                "
              >
                ${student.name}
              </div>

              <div
                class="
                  text-xs
                  text-gray-500
                "
              >
                ${student.count}
                đánh giá
              </div>

            </div>

          </div>

          <div
            class="
              text-yellow-400
              font-black
              text-xl
            "
          >
            ${student.avg}★
          </div>

        </div>
      `;
    }
  );
}

function renderStats(data) {
  if (!statsContainer) return;

  statsContainer.innerHTML = "";

  const grouped = {};

  data.forEach((item) => {
    const key = item.student_name || "Không rõ";

    if (!grouped[key]) {
      grouped[key] = { total: 0, count: 0 };
    }

    grouped[key].total += Number(item.rating || 0);
    grouped[key].count += 1;
  });

  const sorted = Object.entries(grouped)
    .map(([name, value]) => ({
      name,
      avg: value.count ? (value.total / value.count).toFixed(1) : "0.0",
      count: value.count
    }))
    .sort((a, b) => Number(b.avg) - Number(a.avg));

  sorted.forEach((item) => {
    statsContainer.innerHTML += `
      <div class="bg-gray-950 border border-gray-800 rounded-xl p-4">
        <div class="flex justify-between items-center gap-3">
          <div>
            <div class="font-bold text-white">
              ${item.name}
            </div>
            <div class="text-xs text-gray-500">
              ${item.count} đánh giá
            </div>
          </div>
          <div class="text-yellow-400 font-black text-2xl">
            ${item.avg}★
          </div>
        </div>
      </div>
    `;
  });
}
const ANIMALS = [

  "🐱",
  "🦊",
  "🐼",
  "🐸",
  "🐯",
  "🐧",
  "🦁",
  "🐨",
  "🐰",
  "🐻",
  "🐺",
  "🦄",
  "🐙",
  "🐢",
  "🐬"

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
function renderReviews(data) {

  if (!reviewsContainer) return;

  reviewsContainer.innerHTML = "";

  data.forEach((item) => {

    const topicLabel =
    TOPIC_LABELS[item.topic]
    || item.topic
    || "Khác";

    reviewsContainer.innerHTML += `

      <div
        class="
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-5
          shadow-xl
          hover:scale-[1.02]
          hover:border-pink-500/40
          transition-all
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

            <div
              class="
                text-4xl
              "
            >
              ${getAvatar(
                item.student_name
              )}
            </div>

            <div>

              <div
                class="
                  font-black
                  text-pink-400
                "
              >
                ${item.sender_name || "Ẩn danh"}
              </div>

              <div
                class="
                  text-xs
                  text-gray-500
                "
              >
                ${item.student_name}
              </div>

              <div
                class="
                  text-xs
                  text-cyan-400
                  mt-1
                "
              >
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
              ? `
                <button
                  onclick="deleteReview('${item.id}')"
                  class="
                    bg-red-500/20
                    hover:bg-red-500/40
                    border border-red-500/30
                    px-3
                    py-1
                    rounded-lg
                    text-xs
                    text-red-300
                    transition-all
                  "
                >
                  🗑
                </button>
              `
              : ""
            }

          </div>

        </div>

        <div
          class="
            text-gray-300
            leading-relaxed
            break-words
          "
        >
          ${item.comment || ""}
        </div>

      </div>

    `;
  });
}
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
  ? (
      data.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      ) / data.length
    ).toFixed(1)
  : "0.0";

  const studentCount =
  new Set(
    data.map(
      item =>
      item.student_name
    )
  ).size;

  let hottestStudent =
  "Không có";

  if (data.length) {

    const counts = {};

    data.forEach(item => {

      counts[
        item.student_name
      ] =
      (counts[
        item.student_name
      ] || 0) + 1;
    });

    hottestStudent =
    Object.entries(counts)

    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0][0];
  }

  container.innerHTML = `

    <div
      class="
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-5
        hover:scale-105
        transition-all
      "
    >
      <div class="text-gray-400 text-sm">
        Tổng đánh giá
      </div>

      <div
        class="
          text-3xl
          font-black
          text-pink-400
        "
      >
        ${totalReviews}
      </div>
    </div>

    <div
      class="
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-5
        hover:scale-105
        transition-all
      "
    >
      <div class="text-gray-400 text-sm">
        Điểm trung bình
      </div>

      <div
        class="
          text-3xl
          font-black
          text-yellow-400
        "
      >
        ${avgRating}★
      </div>
    </div>

    <div
      class="
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-5
        hover:scale-105
        transition-all
      "
    >
      <div class="text-gray-400 text-sm">
        Học sinh được nhắc
      </div>

      <div
        class="
          text-3xl
          font-black
          text-cyan-400
        "
      >
        ${studentCount}
      </div>
    </div>

    <div
      class="
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-5
        hover:scale-105
        transition-all
      "
    >
      <div class="text-gray-400 text-sm">
        Hot nhất
      </div>

      <div
        class="
          text-lg
          font-black
          text-green-400
          truncate
        "
      >
        👑 ${hottestStudent}
      </div>
    </div>

  `;
}
function setupRealtime() {
  mySupabase
    .channel("student_reviews")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "student_reviews"
      },
      () => {
        loadFeedback();
      }
    )
    .subscribe();
}
async function deleteReview(id) {

  const confirmed =
  confirm(
    "Xóa review này?"
  );

  if (!confirmed) return;

  const { error } =
  await mySupabase
  .from("student_reviews")
  .delete()
  .eq("id", id);

  if (error) {

    console.log(error);

    alert(
      "Lỗi xóa."
    );

    return;
  }

  loadFeedback();

  alert(
    "Đã xóa review."
  );
}
submitBtn?.addEventListener("click", submitFeedback);

initStudentList();
initStars();
initIdentityToggle();
setupRealtime();
loadFeedback();}