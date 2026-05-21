/* eslint-disable */

const SUPABASE_URL = "https://ymqojrhnllaphkuhbcml.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcW9qcmhubGxhcGhrdWhiY21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjE4MzIsImV4cCI6MjA5NDgzNzgzMn0.q9C7cviN2cFt-0zwtqkV44ieewVp0wuNmLaxvBJ438c";

const mySupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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