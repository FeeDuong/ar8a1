/* eslint-disable */

const SUPABASE_URL = "https://ymqojrhnllaphkuhbcml.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1e78hj6Gk9zSu5w6JI9M5A_OhreyjHJ";

const mySupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
  const studentName = studentSelect.value;
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
    alert("Chấm sao trước.");
    return;
  }

  if (comment.length < 2) {
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

  alert("Đăng thành công 🔥");
  resetForm();
  loadFeedback();
}

async function loadFeedback() {
  const { data, error } = await mySupabase
    .from("student_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  renderStats(data || []);
  renderReviews(data || []);
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

function renderReviews(data) {
  if (!reviewsContainer) return;

  reviewsContainer.innerHTML = "";

  data.forEach((item) => {
    const topicLabel = TOPIC_LABELS[item.topic] || item.topic || "Khác";

    reviewsContainer.innerHTML += `
      <div class="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
        <div class="flex justify-between items-center mb-2">
          <div>
            <div class="font-bold text-pink-400">
              ${item.student_name || "Không rõ"}
            </div>
            <div class="text-xs text-gray-500">
              ${item.sender_name || "Ẩn danh"} · ${topicLabel}
            </div>
          </div>
          <div class="text-yellow-400 font-black">
            ${Number(item.rating || 0)}/10★
          </div>
        </div>
        <div class="text-sm text-gray-300 break-words">
          ${item.comment || ""}
        </div>
      </div>
    `;
  });
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

submitBtn?.addEventListener("click", submitFeedback);

initStudentList();
initStars();
initIdentityToggle();
setupRealtime();
loadFeedback();