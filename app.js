/* eslint-disable */

const SUPABASE_URL = "https://ymqojrhnllaphkuhbcml.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1e78hj6Gk9zSu5w6JI9M5A_OhreyjHJ";

const mySupabase = window.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
const studentSelect =
document.getElementById("studentSelect");

STUDENT_LIST.forEach(name => {

    const option =
    document.createElement("option");

    option.value = name;
    option.textContent = name;

    studentSelect.appendChild(option);
});

const TOPIC_LABELS = {
  hoc_tap: "Học tập",
  noi_quy: "Nề nếp / nội quy",
  hoat_dong: "Hoạt động lớp",
  giao_tiep: "Giao tiếp / ứng xử",
  khac: "Khác",
};

let selectedRating = 0;

const stars = document.querySelectorAll(".star");
const ratingDisplay = document.getElementById("ratingDisplay");
const nameInputWrapper = document.getElementById("nameInputWrapper");
const identityRadios = document.querySelectorAll('input[name="identityMode"]');
const submitBtn = document.getElementById("submitBtn");

document.getElementById("reviewComment").value = "";

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

identityRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "public" && radio.checked) {
      nameInputWrapper.classList.remove("hidden");
    } else if (radio.value === "anonymous" && radio.checked) {
      nameInputWrapper.classList.add("hidden");
    }
  });
});

submitBtn.addEventListener("click", submitFeedback);

async function submitFeedback() {
  const topic = document.getElementById("topicSelect").value;
  const comment = document.getElementById("reviewComment").value.trim();
  const identityMode = document.querySelector('input[name="identityMode"]:checked').value;

  let senderName = "Ẩn danh";
  if (identityMode === "public") {
    senderName = document.getElementById("senderName").value.trim() || "Ẩn danh";
  }

  if (!topic) {
    alert("Hãy chọn chủ đề.");
    return;
  }

  if (selectedRating === 0) {
    alert("Hãy chấm sao.");
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

  const { error } = await mySupabase.from("student_feedback").insert([
    {
      topic,
      sender_name: senderName,
      rating: selectedRating,
      comment,
    },
  ]);

  if (error) {
    console.log(error);
    alert("Lỗi gửi góp ý.");
    return;
  }

  document.getElementById("reviewComment").value = "";
  document.getElementById("senderName").value = "";
  selectedRating = 0;
  ratingDisplay.innerText = "0/10★";
  stars.forEach((s) => {
    s.style.color = "#4b5563";
    s.style.transform = "scale(1)";
  });

  loadFeedback();
  alert("Đã gửi góp ý.");
}

async function loadFeedback() {
  const { data, error } = await mySupabase
    .from("student_feedback")
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
  const statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = "";

  const stats = {};

  Object.keys(TOPIC_LABELS).forEach((k) => {
    stats[k] = { total: 0, count: 0 };
  });

  data.forEach((item) => {
    if (!stats[item.topic]) {
      stats[item.topic] = { total: 0, count: 0 };
    }
    stats[item.topic].total += item.rating;
    stats[item.topic].count += 1;
  });

  const sorted = Object.entries(stats)
    .map(([key, value]) => ({
      key,
      label: TOPIC_LABELS[key] || key,
      avg: value.count ? (value.total / value.count).toFixed(1) : "0.0",
      count: value.count,
    }))
    .sort((a, b) => b.avg - a.avg);

  sorted.forEach((item) => {
    statsContainer.innerHTML += `
      <div class="bg-gray-950 border border-gray-800 rounded-xl p-3">
        <div class="flex justify-between items-center gap-3">
          <div>
            <div class="font-black text-white text-sm">${item.label}</div>
            <div class="text-xs text-gray-500">${item.count} lượt góp ý</div>
          </div>
          <div class="text-yellow-400 font-black text-xl">${item.avg}★</div>
        </div>
      </div>
    `;
  });
}

function renderReviews(data) {
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = "";

  data.forEach((item) => {
    const topicLabel = TOPIC_LABELS[item.topic] || item.topic || "Khác";

    reviewsContainer.innerHTML += `
      <div class="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
        <div class="flex justify-between items-center mb-2">
          <div>
            <div class="font-bold text-pink-400">${item.sender_name || "Ẩn danh"}</div>
            <div class="text-xs text-gray-500">${topicLabel}</div>
          </div>
          <div class="text-yellow-400 font-black">${item.rating}/10★</div>
        </div>
        <div class="text-sm text-gray-300 break-words">${item.comment || ""}</div>
      </div>
    `;
  });
}

mySupabase
  .channel("student_feedback")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "student_feedback" },
    () => loadFeedback()
  )
  .subscribe();

loadFeedback();