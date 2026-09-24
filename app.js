/* ============================================================
   LycheeScan - i18n (EN/VI) + router theo hash + logic tool
   ============================================================ */

"use strict";

/* ============================================================
   I18N: bảng dịch两国語
   ============================================================ */
const I18N = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.product": "Sản phẩm",
    "nav.significance": "Ý nghĩa",
    "nav.timeline": "Timeline",
    "nav.future": "Ý tưởng",
    "nav.team": "Đội nhóm",
    "nav.gallery": "Thư viện",

    "theme.toDark": "Chuyển sang giao diện tối",
    "theme.toLight": "Chuyển sang giao diện sáng",

    "hero.eyebrow": "Đề tài nghiên cứu khoa học",
    "hero.titleA": "Soi độ chín quả vải",
    "hero.titleB": "bằng trí tuệ nhân tạo",
    "hero.sub": "Chụp một quả vải, mô hình AI chấm độ chín thuộc một trong ba mức lớn chỉ trong vài giây.",
    "hero.cta.try": "Thử ngay",
    "hero.cta.more": "Ý nghĩa đề tài",
    "hero.previewCaption": "Xem trước kết quả",
    "pd.kicker": "Kết quả phân tích",
    "pd.label": "Chín tới",

    "desc.heading": "Mô tả đề tài",
    "desc.body1": "Đề tài nghiên cứu ứng dụng Mạng Nơ-ron Tích chập (CNNs) để tự động phân loại độ chín của quả vải, sử dụng trí tuệ nhân tạo và xử lý hình ảnh nhằm xác định độ chín dựa trên màu sắc và đặc điểm của vỏ quả.",
    "desc.body2": "Quá trình thực hiện bao gồm thu thập hình ảnh quả vải ở các giai đoạn chín khác nhau, gán nhãn và chuẩn hóa dữ liệu, huấn luyện mô hình CNN, sau đó kiểm tra và đánh giá kết quả bằng các chỉ số Accuracy, Precision, Recall và F1-Score.",
    "desc.chip1": "Lĩnh vực: Computer Vision & AI",
    "desc.chip2": "Đối tượng: Quả vải tươi",
    "desc.chip3": "Phương pháp: Phân loại ảnh",

    "product.kicker": "Sản phẩm",
    "product.heading": "LycheeScan, công cụ chấm độ chín",
    "product.sub": "Tải ảnh một quả vải lên, để mô hình đo độ chín thuộc một trong ba mức lớn.",

    "up.titleA": "Quả vải của bạn",
    "up.titleB": "đã chín chưa?",
    "up.sub": "Chụp hoặc tải ảnh một quả, AI chấm độ chín trong vài giây.",
    "dz.title": "Chọn ảnh quả vải",
    "dz.sub": "Chạm để chọn, hoặc kéo thả vào đây",
    "tip1": "Ảnh rõ nét, đủ sáng",
    "tip2": "Một quả vải trong khung",
    "tip3": "Không cần thẻ màu chuẩn",

    "btn.analyze": "Phân tích ngay",
    "btn.repick": "Thử ảnh khác",
    "btn.reset": "Thử ảnh khác",
    "btn.retry": "Thử lại",
    "btn.back": "Thử ảnh khác",

    "model.mobilenet.tag": "Nhanh · nhẹ",
    "model.resnet50.tag": "Chính xác hơn",

    "step0": "Đang nạp mô hình AI…",
    "step1": "Đang phân tích màu sắc vỏ quả…",
    "step2": "Đang đối chiếu mô hình độ chín…",
    "step3": "Đang tổng hợp kết quả…",

    "res.kicker": "Kết quả phân tích",
    "res.cap": "độ tin cậy",
    "res.probsH": "Độ tin cậy từng mức",
    "lvl.chua_chin": "Chưa chín",
    "lvl.chin_toi": "Chín tới",
    "lvl.chin_ky": "Chín kỹ",

    "cam.heading": "Vì sao AI chọn nhãn này?",
    "cam.switch": "Vùng AI chú ý",
    "cam.caption": "Vùng càng đỏ đậm, AI càng dựa vào đó để chấm điểm. Chạm vào một mức độ chín ở trên để xem AI chú ý gì khi nghĩ tới mức đó.",

    "err.title": "Chưa phân tích được",
    "err.tip": "Mô hình AI cần tải về lần đầu qua Internet, sau đó chạy ngay trên máy bạn. Kiểm tra kết nối mạng rồi thử lại nhé.",

    "sig.heading": "Ý nghĩa của đề tài",
    "sig.lede": "Ý nghĩa khoa học và thực tiễn của việc dùng CNN để phân loại độ chín quả vải.",
    "sig.p1h": "Giá trị khoa học",
    "sig.p1": "Nghiên cứu tìm hiểu mối liên hệ giữa đặc điểm bề ngoài của quả vải và mức độ chín, đánh giá xem những thay đổi về hình ảnh có đủ để mô hình CNN phân biệt các giai đoạn chín hay không.",
    "sig.p2h": "Giá trị thực tiễn",
    "sig.p2": "Việc đánh giá độ chín hiện nay chủ yếu dựa vào mắt và kinh nghiệm, dễ gây sai lệch giữa người đánh giá. Nếu đạt độ chính xác phù hợp, mô hình có thể trở thành công cụ hỗ trợ phân loại và kiểm tra chất lượng quả vải nhanh chóng, nhất quán.",
    "sig.p3h": "Tiềm năng và hạn chế",
    "sig.p3": "Phương pháp dựa trên hình ảnh chủ yếu cung cấp thông tin bề mặt, nên khó phát hiện hư hỏng bên trong quả. Đây là cơ sở để xem xét kết hợp thêm các cảm biến khác trong những nghiên cứu tiếp theo.",

    "tl.heading": "Timeline dự án",
    "tl.lede": "Các mốc chính trong quá trình xây dựng và đánh giá mô hình LycheeScan.",
    "tl.m1": "Khởi tạo ý tưởng", "tl.m1d": "Xác định đề tài và mục tiêu nghiên cứu, phạm vi ứng dụng CNN cho bài toán phân loại độ chín quả vải.",
    "tl.m2": "Thu thập dữ liệu", "tl.m2d": " Thu thập hình ảnh quả vải ở các mức độ chín khác nhau, gán nhãn và chuẩn hóa dữ liệu để phục vụ huấn luyện.",
    "tl.m3": "Huấn luyện mô hình", "tl.m3d": "Xây dựng và huấn luyện mô hình CNN trên bộ dữ liệu đã gán nhãn, kiểm tra trên hình ảnh mới và đánh giá bằng Accuracy, Precision, Recall, F1-Score.",
    "tl.m4": "Xây dựng giao diện", "tl.m4d": "Phát triển giao diện LycheeScan để người dùng tải ảnh và xem kết quả phân tích độ chín.",
    "tl.m5": "Triển lãm NCKH", "tl.m5d": "Trình bày kết quả thực nghiệm, đánh giá khả năng ứng dụng thực tế và đề xuất hướng phát triển tiếp.",

    "future.heading": "Ý tưởng phát triển",
    "future.lede": "Hướng phát triển tiếp theo nhằm mở rộng khả năng ứng dụng của mô hình.",
    "future.i1h": "Mở rộng loại trái cây", "future.i1": "Áp dụng phương pháp cho các loại trái cây khác có sự thay đổi màu sắc và đặc điểm vỏ theo độ chín.",
    "future.i2h": "Phiên bản di động", "future.i2": "Phiên bản di động giúp người nông dân kiểm tra độ chín tại vườn ngay trước khi thu hoạch.",
    "future.i3h": "Tích hợp trực tiếp tại nhà máy", "future.i3": "Kết hợp vào dây chuyền phân loại ở nhà máy để tự động hoá kiểm tra chất lượng quả vải.",

    "team.heading": "Đội ngũ thực hiện",
    "team.lede": "Giáo viên hướng dẫn, trợ giảng và nhóm học sinh thực hiện dự án LycheeScan.",
    "team.advisors": "Giáo viên hướng dẫn & Trợ giảng",
    "team.students": "Nhóm thực hiện",
    "team.n1": "ThS. Lê Tuấn Phúc", "team.r1": "Giáo viên hướng dẫn", "team.a1": "Trường Hoá & Khoa học sự sống · Đại học Bách khoa Hà Nội",
    "team.n2": "KS. Đàm Huy Thái", "team.r2": "Trợ giảng", "team.a2": "Trường Hoá & Khoa học sự sống · Đại học Bách khoa Hà Nội",
    "team.n3": "Lương Bảo Khang", "team.r3": "Dữ liệu & Gán nhãn", "team.a3": "Lớp 10 Vinschool Times City",
    "team.n4": "Phạm Hoài Anh", "team.r4": "Báo cáo & Trình bày", "team.a4": "Lớp 10 · Dwight School Hanoi",
    "team.n5": "Đoàn Quang Huy", "team.r5": "Đánh giá & Kiểm thử", "team.a5": "Dunman Secondary School Singapore",
    "team.n6": "Đặng Quang Vinh", "team.r6": "Giao diện & Lập trình", "team.a6": "Lớp 10A5 THPT Cầu Giấy",
    "team.n7": "Vương Quang Nghị", "team.r7": "Huấn luyện mô hình", "team.a7": "Lớp 9 · Dewey",

    "gal.heading": "Thư viện",
    "gal.lede": "Ảnh chụp quá trình thực hiện và kết quả của dự án.",
    "gal.cap": "Ảnh dự án",

    "foot.note": "Demo NCKH · Mô hình phân loại độ chín quả vải",

    "toast.notimage": "File đã chọn không phải ảnh. Hãy chọn ảnh JPG, PNG hoặc WEBP nhé.",
    "toast.toobig": "Ảnh vượt quá giới hạn, hãy chọn ảnh nhẹ hơn.",
    "toast.empty": "Chưa chọn ảnh. Hãy chọn một ảnh quả vải trước nhé.",
    "err.conn": "Không tải được mô hình AI. Kiểm tra kết nối mạng rồi thử lại.",
    "err.timeout": "Mô hình xử lý quá lâu, vui lòng thử lại.",
    "err.fmt": "Không đọc được ảnh này, thử ảnh khác nhé.",
    "err.generic": "Đã có lỗi xảy ra.",
  },
  en: {
    "nav.home": "Home",
    "nav.product": "Product",
    "nav.significance": "Impact",
    "nav.timeline": "Timeline",
    "nav.future": "Ideas",
    "nav.team": "Team",
    "nav.gallery": "Gallery",

    "theme.toDark": "Switch to dark mode",
    "theme.toLight": "Switch to light mode",

    "hero.eyebrow": "Science research project",
    "hero.titleA": "Reading lychee ripeness",
    "hero.titleB": "with AI",
    "hero.sub": "Snap a lychee and the model rates its ripeness across three broad levels in seconds.",
    "hero.cta.try": "Try it now",
    "hero.cta.more": "Why it matters",
    "hero.previewCaption": "Result preview",
    "pd.kicker": "Analysis result",
    "pd.label": "Ripe",

    "desc.heading": "Project description",
    "desc.body1": "The project applies Convolutional Neural Networks (CNNs) to automatically classify lychee ripeness, using artificial intelligence and image processing to determine ripeness from observable features such as color and skin characteristics.",
    "desc.body2": "The process includes collecting images of lychees at different ripeness stages, labeling and normalizing the data, training the CNN model, then testing and evaluating results with Accuracy, Precision, Recall and F1-Score.",
    "desc.chip1": "Field: Computer Vision & AI",
    "desc.chip2": "Target: Fresh lychees",
    "desc.chip3": "Method: Image classification",

    "product.kicker": "Product",
    "product.heading": "LycheeScan, a ripeness grader",
    "product.sub": "Upload a photo of one lychee and the model grades its ripeness into one of three broad levels.",

    "up.titleA": "Is your lychee",
    "up.titleB": "ripe yet?",
    "up.sub": "Snap or upload one photo, the AI grades the ripeness in seconds.",
    "dz.title": "Pick a lychee photo",
    "dz.sub": "Tap to choose, or drag & drop it here",
    "tip1": "Clear, well-lit photo",
    "tip2": "One lychee in frame",
    "tip3": "No color card needed",

    "btn.analyze": "Analyze now",
    "btn.repick": "Try another photo",
    "btn.reset": "Try another photo",
    "btn.retry": "Retry",
    "btn.back": "Try another photo",

    "model.mobilenet.tag": "Fast · light",
    "model.resnet50.tag": "More accurate",

    "step0": "Loading the AI model…",
    "step1": "Analyzing skin color…",
    "step2": "Matching ripeness model…",
    "step3": "Compiling result…",

    "res.kicker": "Analysis result",
    "res.cap": "confidence",
    "res.probsH": "Confidence by level",
    "lvl.chua_chin": "Unripe",
    "lvl.chin_toi": "Ripe",
    "lvl.chin_ky": "Overripe",

    "cam.heading": "Why this label?",
    "cam.switch": "AI attention area",
    "cam.caption": "Deeper red means the AI relied more on that area to score ripeness. Tap a level above to see what the AI focuses on for that level.",

    "err.title": "Analysis failed",
    "err.tip": "The AI model needs to download once over the Internet, then it runs right on your device. Check your connection and try again.",

    "sig.heading": "Significance of the research",
    "sig.lede": "The scientific and practical significance of using a CNN to grade lychee ripeness.",
    "sig.p1h": "Scientific value",
    "sig.p1": "The research examines the correlation between the external characteristics of a lychee and its ripeness, evaluating whether visual changes alone are enough for the CNN model to distinguish ripeness stages.",
    "sig.p2h": "Practical value",
    "sig.p2": "Ripeness assessment today mainly relies on human observation, which is subjective and inconsistent. With sufficient accuracy, the model can become a fast, consistent tool to support lychee sorting and quality control.",
    "sig.p3h": "Potential and limitations",
    "sig.p3": "Image-based methods mainly capture surface features, so internal defects are hard to detect. This opens the way to combining images with other sensors in future research.",

    "tl.heading": "Project timeline",
    "tl.lede": "Key milestones in building and evaluating the LycheeScan model.",
    "tl.m1": "Idea kickoff", "tl.m1d": "Define the topic and research goals, and scope the use of CNN for lychee ripeness classification.",
    "tl.m2": "Data collection", "tl.m2d": "Collect images of lychees at different ripeness stages, label and normalize the data for training.",
    "tl.m3": "Model training", "tl.m3d": "Build and train the CNN model on the labeled dataset, test on new images and evaluate with Accuracy, Precision, Recall, F1-Score.",
    "tl.m4": "Interface build", "tl.m4d": "Develop the LycheeScan interface so users can upload a photo and view the ripeness result.",
    "tl.m5": "Research fair", "tl.m5d": "Present experimental results, evaluate real-world applicability and propose directions for future work.",

    "future.heading": "Future ideas",
    "future.lede": "Where the model goes next to broaden its real-world use.",
    "future.i1h": "More fruit types", "future.i1": "Extend the approach to other fruits whose color and skin features change with ripeness.",
    "future.i2h": "Mobile version", "future.i2": "A mobile version lets farmers check ripeness in the orchard right before harvest.",
    "future.i3h": "On-site factory integration", "future.i3": "Integrate into the factory sorting line to automate lychee quality control.",

    "team.heading": "The team",
    "team.lede": "The advisors, teaching assistant and student team behind LycheeScan.",
    "team.advisors": "Advisors",
    "team.students": "Student team",
    "team.n1": "ThS. Lê Tuấn Phúc", "team.r1": "Supervising teacher", "team.a1": "School of Chemistry & Life Science · Hanoi Univ. of Science & Technology",
    "team.n2": "KS. Đàm Huy Thái", "team.r2": "Teaching assistant", "team.a2": "School of Chemistry & Life Science · Hanoi Univ. of Science & Technology",
    "team.n3": "Lương Bảo Khang", "team.r3": "Data & Labeling", "team.a3": "Grade 10 Vinschool Times City",
    "team.n4": "Phạm Hoài Anh", "team.r4": "Report & Presentation", "team.a4": "Grade 10 · Dwight School Hanoi",
    "team.n5": "Đoàn Quang Huy", "team.r5": "Evaluation & Testing", "team.a5": "Dunman Secondary School Singapore",
    "team.n6": "Đặng Quang Vinh", "team.r6": "Interface & Programming", "team.a6": "Class 10A5 Cau Giay Highschool",
    "team.n7": "Vương Quang Nghị", "team.r7": "Model training", "team.a7": "Grade 9 · Dewey",

    "gal.heading": "Gallery",
    "gal.lede": "Photos from the project's work and results.",
    "gal.cap": "Project photo",

    "foot.note": "Science fair demo · Lychee ripeness classifier",

    "toast.notimage": "That file is not an image. Please pick a JPG, PNG or WEBP.",
    "toast.toobig": "The image is too large, please pick a lighter one.",
    "toast.empty": "No photo selected. Pick a lychee photo first.",
    "err.conn": "Could not download the AI model. Check your connection and try again.",
    "err.timeout": "The model took too long, please try again.",
    "err.fmt": "Could not read this image, please try another one.",
    "err.generic": "Something went wrong.",
  },
};

let lang = localStorage.getItem("lang") || "vi";
let theme = localStorage.getItem("theme") || "light";

/* 3 mức chín: icon + display + hint theo ngữ */
const LEVELS = {
  chua_chin: {
    vi: { display: "Chưa chín", hint: "Quả còn xanh, vỏ chưa chuyển màu. Nên chờ thêm vài ngày trước khi thu hoạch." },
    en: { display: "Unripe", hint: "Still green, the skin has not turned. Wait a few more days before harvesting." },
    icon: `<svg viewBox="0 0 48 48" fill="none"><path d="M38 10C22 12 12 20 10 38c18-2 26-12 28-28z" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M14 34c6-10 14-16 20-20" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  chin_toi: {
    vi: { display: "Chín tới", hint: "Vỏ đã chuyển đỏ tươi, quả đang ở độ chín tối ưu. Có thể thu hoạch." },
    en: { display: "Ripe", hint: "The skin has turned bright red. The fruit is at peak ripeness and ready to harvest." },
    icon: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="28" r="14" stroke="#fff" stroke-width="3"/><path d="M30 14c1-4 5-5 7-5-1 3-3 6-6 6.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="19" cy="25" r="1.8" fill="#fff"/><circle cx="27" cy="23" r="1.8" fill="#fff"/><circle cx="23" cy="31" r="1.8" fill="#fff"/><circle cx="30" cy="30" r="1.8" fill="#fff"/></svg>`,
  },
  chin_ky: {
    vi: { display: "Chín kỹ", hint: "Vỏ đỏ sẫm, quả đã chín kỹ. Nên thu hoạch ngay để tránh hư hỏng." },
    en: { display: "Overripe", hint: "The skin is dark red. The fruit is overripe, harvest now to avoid spoilage." },
    icon: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="28" r="14" stroke="#fff" stroke-width="3"/><path d="M30 14c1-4 5-5 7-5-1 3-3 6-6 6.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M17 28.5l5 5 9-10" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
};

/* ============================================================
   DOM refs
   ============================================================ */
const $ = (id) => document.getElementById(id);
const els = {
  views: document.querySelectorAll(".view"),
  navLinks: document.querySelectorAll(".nav-link"),
  navMenu: $("nav-menu"),
  navToggle: $("nav-toggle"),
  langToggle: $("lang-toggle"),
  themeToggle: $("theme-toggle"),

  // product
  states: {
    upload: $("state-upload"),
    preview: $("state-preview"),
    loading: $("state-loading"),
    result: $("state-result"),
    error: $("state-error"),
  },
  modelSelect: $("model-select"),
  modelOpts: Array.from(document.querySelectorAll(".model-opt")),
  dropzone: $("dropzone"),
  fileInput: $("file-input"),
  previewImg: $("preview-img"),
  fileName: $("file-name"),
  fileSize: $("file-size"),
  scanImg: $("scan-img"),
  btnAnalyze: $("btn-analyze"),
  btnRepick: $("btn-repick"),
  steps: Array.from(document.querySelectorAll("#steps li")),
  resultState: $("state-result"),
  resultImg: $("result-img"),
  resultBadge: $("result-badge"),
  resultLabel: $("result-label"),
  resultHint: $("result-hint"),
  ringFg: $("ring-fg"),
  confValue: $("confidence-value"),
  probRows: Array.from(document.querySelectorAll(".prob-row")),
  camCanvas: $("cam-canvas"),
  camSwitch: $("cam-switch"),
  btnReset: $("btn-reset"),
  errorMessage: $("error-message"),
  btnRetry: $("btn-retry"),
  btnBack: $("btn-back"),
  toast: $("toast"),
  previewImgAlt: null, // đặt động theo i18n
};

const RING_LEN = 2 * Math.PI * 52;
const CONFIG = {
  MIN_LOADING_MS: 3000,
  MIN_ERROR_MS: 1200,
  TIMEOUT_MS: 30000,
  MAX_SIZE_MB: 10,
  STEP_MS: 800,
};

/* ============================================================
   Suy luận AI ngay trong trình duyệt (ONNX Runtime Web) — không cần server.
   Model xuất từ Docs/outputs/03_cnn/<arch>_none/fold0.pt, xem export_onnx.py.
   ============================================================ */
const MODEL_DEFS = {
  mobilenet_v3_small: { url: "models/mobilenet_v3_small.onnx", camUrl: "models/mobilenet_v3_small_cam.json" },
  resnet50: { url: "models/resnet50.onnx", camUrl: "models/resnet50_cam.json" },
};
const MODEL_META = {
  imgSize: 224,
  mean: [0.485, 0.456, 0.406],
  std: [0.229, 0.224, 0.225],
  brixMu: 16.309117647058823,
  brixSd: 1.8437985355957314,
  stageKeys: ["chua_chin", "chin_toi", "chin_ky"],
};
let selectedModel = "mobilenet_v3_small";
const sessionCache = {};
const camMetaCache = {};

if (window.ort) {
  // WASM đơn luồng: chạy được trên host tĩnh bình thường, không cần header COOP/COEP.
  ort.env.wasm.numThreads = 1;
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("TIMEOUT")), ms);
    promise.then((v) => { clearTimeout(timer); resolve(v); }, (e) => { clearTimeout(timer); reject(e); });
  });
}

async function getSession(modelKey) {
  if (sessionCache[modelKey]) return sessionCache[modelKey];
  if (!window.ort) throw new Error("CONN");
  try {
    const session = await withTimeout(
      ort.InferenceSession.create(MODEL_DEFS[modelKey].url, { executionProviders: ["wasm"] }),
      CONFIG.TIMEOUT_MS
    );
    sessionCache[modelKey] = session;
    return session;
  } catch (err) {
    if (err.message === "TIMEOUT") throw err;
    throw new Error("CONN");
  }
}

async function getCamMeta(modelKey) {
  if (camMetaCache[modelKey]) return camMetaCache[modelKey];
  try {
    const res = await withTimeout(fetch(MODEL_DEFS[modelKey].camUrl), CONFIG.TIMEOUT_MS);
    if (!res.ok) throw new Error("CONN");
    const meta = await res.json();
    camMetaCache[modelKey] = meta;
    return meta;
  } catch (err) {
    if (err.message === "TIMEOUT") throw err;
    throw new Error("CONN");
  }
}

function imageToTensor(imgEl) {
  const size = MODEL_META.imgSize;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgEl, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const plane = size * size;
  const chw = new Float32Array(3 * plane);
  const [rMean, gMean, bMean] = MODEL_META.mean;
  const [rStd, gStd, bStd] = MODEL_META.std;
  for (let i = 0; i < plane; i++) {
    chw[i] = (data[i * 4] / 255 - rMean) / rStd;
    chw[plane + i] = (data[i * 4 + 1] / 255 - gMean) / gStd;
    chw[plane * 2 + i] = (data[i * 4 + 2] / 255 - bMean) / bStd;
  }
  return new ort.Tensor("float32", chw, [1, 3, size, size]);
}

function softmax(logits) {
  const max = Math.max(...logits);
  const exps = Array.from(logits, (v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}

async function runInference(imageUrl, modelKey) {
  const [session, camMeta] = await Promise.all([getSession(modelKey), getCamMeta(modelKey)]);
  const img = new Image();
  img.src = imageUrl;
  try {
    await img.decode();
  } catch {
    throw new Error("FMT");
  }
  const tensor = imageToTensor(img);
  const out = await withTimeout(session.run({ input: tensor }), CONFIG.TIMEOUT_MS);
  const probsArr = softmax(out.cls_logits.data);
  const brixPred = out.brix_reg.data[0] * MODEL_META.brixSd + MODEL_META.brixMu;

  let bestIdx = 0;
  for (let i = 1; i < probsArr.length; i++) if (probsArr[i] > probsArr[bestIdx]) bestIdx = i;
  const label = MODEL_META.stageKeys[bestIdx];
  const probs = {};
  MODEL_META.stageKeys.forEach((k, i) => { probs[k] = probsArr[i]; });

  const result = normalizeResult({ label, confidence: probsArr[bestIdx], probs, brix_pred: brixPred });
  result.imgEl = img;
  result.cam = { feat: out.feat_map.data, weight: camMeta.weight, channels: camMeta.channels, grid: camMeta.grid };
  return result;
}

/* ============================================================
   Grad-CAM (= CAM chính xác cho head GAP+Linear, xem export_onnx.py)
   ============================================================ */
function computeCam(cam, classIdx) {
  const { feat, weight, channels, grid } = cam;
  const w = weight[classIdx];
  const plane = grid * grid;
  const heat = new Float32Array(plane);
  let max = 0;
  for (let p = 0; p < plane; p++) {
    let sum = 0;
    for (let c = 0; c < channels; c++) sum += w[c] * feat[c * plane + p];
    const v = Math.max(0, sum);
    heat[p] = v;
    if (v > max) max = v;
  }
  if (max > 0) for (let p = 0; p < plane; p++) heat[p] /= max;
  return heat;
}

function heatColor(v) {
  if (v <= 0.02) return [0, 0, 0, 0];
  const lerp = (a, b, t) => a + (b - a) * t;
  let r, g, b;
  if (v < 0.5) {
    const t = v / 0.5;
    r = lerp(255, 230, t); g = lerp(241, 120, t); b = lerp(150, 40, t);
  } else {
    const t = (v - 0.5) / 0.5;
    r = lerp(230, 196, t); g = lerp(120, 32, t); b = lerp(40, 58, t);
  }
  const a = Math.round(40 + v * 170);
  return [Math.round(r), Math.round(g), Math.round(b), a];
}

function drawCam(canvas, imgEl, heat, grid, showHeat) {
  const iw = imgEl.naturalWidth || 1, ih = imgEl.naturalHeight || 1;
  const cap = 640;
  const scale = Math.min(cap / iw, cap / ih, 1) || 1;
  const w = Math.max(1, Math.round(iw * scale));
  const h = Math.max(1, Math.round(ih * scale));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(imgEl, 0, 0, w, h);
  if (!showHeat) return;

  const small = document.createElement("canvas");
  small.width = grid;
  small.height = grid;
  const sctx = small.getContext("2d");
  const imgData = sctx.createImageData(grid, grid);
  for (let p = 0; p < grid * grid; p++) {
    const [r, g, b, a] = heatColor(heat[p]);
    imgData.data[p * 4] = r; imgData.data[p * 4 + 1] = g; imgData.data[p * 4 + 2] = b; imgData.data[p * 4 + 3] = a;
  }
  sctx.putImageData(imgData, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(small, 0, 0, w, h);
}

let camState = null; // { result, classKey }

function renderCam() {
  if (!camState) return;
  const { result, classKey } = camState;
  const classIdx = MODEL_META.stageKeys.indexOf(classKey);
  const heat = computeCam(result.cam, classIdx);
  drawCam(els.camCanvas, result.imgEl, heat, result.cam.grid, els.camSwitch.checked);
}

function setupCam(result) {
  camState = { result, classKey: result.label };
  els.camSwitch.checked = true;
  els.probRows.forEach((row) => row.classList.toggle("is-cam-active", row.dataset.key === result.label));
  renderCam();
}

/* ============================================================
   i18n
   ============================================================ */
function applyLang(next) {
  lang = next;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "vi" ? "vi" : "en";
  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if (typeof val === "string") el.textContent = val;
  });
  // toggle buttons
  els.langToggle.querySelectorAll("button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  // re-render động nếu đang ở result (label/hint đa ngữ)
  if (lastResult) renderResult(lastResult, true);
  // alt ảnh preview/result theo ngữ
  setAlts();
}

function t(key) { return I18N[lang][key]; }

function setAlts() {
  const a = lang === "vi" ? "Ảnh quả vải" : "Lychee photo";
  if (els.previewImg) els.previewImg.alt = a;
  if (els.scanImg) els.scanImg.alt = lang === "vi" ? "Ảnh đang được phân tích" : "Photo being analyzed";
  if (els.resultImg) els.resultImg.alt = lang === "vi" ? "Ảnh quả vải đã phân tích" : "Analyzed lychee photo";
  if (els.navToggle) els.navToggle.setAttribute("aria-label", lang === "vi" ? "Mở menu" : "Open menu");
  if (els.themeToggle) els.themeToggle.setAttribute("aria-label", t(theme === "dark" ? "theme.toLight" : "theme.toDark"));
}

/* ============================================================
   Theme (sáng / tối), mặc định sáng
   ============================================================ */
function applyTheme(next) {
  theme = next;
  localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
  els.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  els.themeToggle.setAttribute("aria-label", t(theme === "dark" ? "theme.toLight" : "theme.toDark"));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#1a0f13" : "#e63956");
}

/* ============================================================
   Router theo hash
   ============================================================ */
const VIEWS = ["home", "product", "significance", "timeline", "future", "team", "gallery"];

function setView(name) {
  if (!VIEWS.includes(name)) name = "home";
  els.views.forEach((v) => v.classList.toggle("is-active", v.dataset.view === name));
  els.navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.go === name));
  closeMenu();
  window.scrollTo({ top: 0, behavior: "auto" });
  if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  // update title
  document.title = (lang === "vi" ? "LycheeScan - " : "LycheeScan - ") + t("nav." + (name === "home" ? "home" : name));
}

function currentViewFromHash() {
  const h = location.hash.replace("#", "");
  return VIEWS.includes(h) ? h : "home";
}

/* ============================================================
   Menu mobile
   ============================================================ */
function openMenu()  { els.navMenu.classList.add("is-open"); els.navToggle.setAttribute("aria-expanded", "true"); }
function closeMenu() { els.navMenu.classList.remove("is-open"); els.navToggle.setAttribute("aria-expanded", "false"); }
function toggleMenu() { els.navMenu.classList.contains("is-open") ? closeMenu() : openMenu(); }

/* ============================================================
   Tool: state machine + upload + predict
   ============================================================ */
let prodState = "upload";
let selectedFile = null;
let objectUrl = null;
let analyzing = false;
let stepTimer = null;
let toastTimer = null;
let resultTimer = null;
let lastResult = null;

function setProdState(next) {
  if (next === prodState) return;
  els.states[prodState].classList.remove("is-active");
  els.states[next].classList.add("is-active");
  prodState = next;
}

function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
}

function handleFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) { showToast(t("toast.notimage")); return; }
  if (file.size > CONFIG.MAX_SIZE_MB * 1024 * 1024) { showToast(t("toast.toobig")); return; }
  selectedFile = file;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);
  els.previewImg.src = objectUrl;
  els.scanImg.src = objectUrl;
  els.resultImg.src = objectUrl;
  els.fileName.textContent = file.name;
  els.fileSize.textContent = formatSize(file.size);
  setProdState("preview");
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function startSteps() {
  stopSteps();
  els.steps.forEach((li) => li.classList.remove("is-active", "is-done"));
  els.steps[0].classList.add("is-active");
  let i = 0;
  stepTimer = setInterval(() => {
    els.steps[i].classList.replace("is-active", "is-done");
    i = Math.min(i + 1, els.steps.length - 1);
    els.steps[i].classList.add("is-active");
    if (i === els.steps.length - 1) clearInterval(stepTimer);
  }, CONFIG.STEP_MS);
}
function finishSteps() { stopSteps(); els.steps.forEach((li) => { li.classList.remove("is-active"); li.classList.add("is-done"); }); }
function stopSteps() { if (stepTimer) { clearInterval(stepTimer); stepTimer = null; } }

function normalizeResult(data) {
  if (!data || typeof data !== "object" || !LEVELS[data.label]) throw new Error("FMT");
  const level = LEVELS[data.label];
  const confidence = Math.min(1, Math.max(0, Number(data.confidence) || 0));
  const probs = {};
  for (const key of Object.keys(LEVELS)) {
    const p = data.probs && Number(data.probs[key]);
    probs[key] = Number.isFinite(p) ? Math.min(1, Math.max(0, p)) : 0;
  }
  return {
    label: data.label,
    display: level[lang] ? level[lang].display : level.vi.display,
    confidence,
    probs,
    hint: level[lang] ? level[lang].hint : level.vi.hint,
    icon: level.icon,
    brixPred: Number.isFinite(data.brix_pred) ? data.brix_pred : null,
  };
}

async function analyze() {
  if (!selectedFile) { showToast(t("toast.empty")); return; }
  if (analyzing) return;
  analyzing = true;
  els.btnAnalyze.disabled = true;
  setProdState("loading");
  startSteps();
  const startedAt = Date.now();
  try {
    const result = await runInference(objectUrl, selectedModel);
    await waitUntil(startedAt, CONFIG.MIN_LOADING_MS);
    finishSteps();
    setProdState("result");
    lastResult = result;
    renderResult(result, false);
  } catch (err) {
    await waitUntil(startedAt, CONFIG.MIN_ERROR_MS);
    stopSteps();
    let key = "err.generic";
    if (err.message === "CONN") key = "err.conn";
    else if (err.message === "TIMEOUT") key = "err.timeout";
    else if (err.message === "FMT") key = "err.fmt";
    els.errorMessage.textContent = t(key);
    setProdState("error");
  } finally {
    analyzing = false;
    els.btnAnalyze.disabled = false;
  }
}

function waitUntil(startedAt, minMs) {
  const elapsed = Date.now() - startedAt;
  return new Promise((r) => setTimeout(r, Math.max(0, minMs - elapsed)));
}

function renderResult(result, langOnly) {
  els.resultState.dataset.level = result.label;
  document.body.dataset.level = result.label;
  els.resultBadge.innerHTML = result.icon;
  els.resultLabel.textContent = result.display;
  els.resultHint.textContent = result.hint;

  if (langOnly) return; // đổi ngữ giữa chừng: chỉ cập nhật text, giữ ring/bar nguyên

  setupCam(result);
  clearTimeout(resultTimer);
  els.ringFg.style.transition = "none";
  els.ringFg.style.strokeDashoffset = RING_LEN;
  els.confValue.textContent = "0.0";
  els.probRows.forEach((row) => {
    row.querySelector(".prob-fill").style.transform = "scaleX(0)";
    row.querySelector(".prob-value").textContent = "0%";
    row.classList.remove("is-winner");
  });

  resultTimer = setTimeout(() => {
    els.ringFg.style.transition = "";
    els.ringFg.style.strokeDashoffset = RING_LEN * (1 - result.confidence);
    animateCounter(els.confValue, result.confidence * 100, 1200, 1);
    els.probRows.forEach((row, i) => {
      const key = row.dataset.key;
      const value = result.probs[key] || 0;
      if (key === result.label) row.classList.add("is-winner");
      setTimeout(() => {
        row.querySelector(".prob-fill").style.transform = `scaleX(${value})`;
        animateCounter(row.querySelector(".prob-value"), value * 100, 900, 0, "%");
      }, i * 120);
    });
  }, 560);
}

function animateCounter(el, target, duration, decimals, suffix = "") {
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function resetAll() {
  selectedFile = null;
  lastResult = null;
  camState = null;
  clearTimeout(resultTimer);
  if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
  els.fileInput.value = "";
  delete els.resultState.dataset.level;
  delete document.body.dataset.level;
  setProdState("upload");
}

/* ============================================================
   Events
   ============================================================ */
// nav + hero CTA: mọi phần tử [data-go] điều khiển view
document.querySelectorAll("[data-go]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    setView(el.dataset.go);
  });
});
window.addEventListener("hashchange", () => setView(currentViewFromHash()));
els.navToggle.addEventListener("click", toggleMenu);
document.addEventListener("click", (e) => {
  // click ngoài menu -> đóng
  if (!els.navMenu.contains(e.target) && !els.navToggle.contains(e.target)) closeMenu();
});

// lang toggle
els.langToggle.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", () => applyLang(b.dataset.lang));
});

// theme toggle (sáng / tối)
els.themeToggle.addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));

// chọn model AI
els.modelOpts.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedModel = btn.dataset.model;
    els.modelOpts.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  });
});

// product tool
els.dropzone.addEventListener("click", () => els.fileInput.click());
els.fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));
["dragenter", "dragover"].forEach((evt) => els.dropzone.addEventListener(evt, (e) => { e.preventDefault(); els.dropzone.classList.add("is-dragover"); }));
["dragleave", "drop"].forEach((evt) => els.dropzone.addEventListener(evt, (e) => { e.preventDefault(); els.dropzone.classList.remove("is-dragover"); }));
els.dropzone.addEventListener("drop", (e) => { const f = e.dataTransfer.files && e.dataTransfer.files[0]; handleFile(f); });
els.btnAnalyze.addEventListener("click", analyze);
els.btnRepick.addEventListener("click", resetAll);
els.btnReset.addEventListener("click", resetAll);
els.btnBack.addEventListener("click", resetAll);
els.btnRetry.addEventListener("click", () => { if (selectedFile) analyze(); else resetAll(); });

// Grad-CAM: chọn mức để xem AI chú ý gì, bật/tắt lớp phủ
els.probRows.forEach((row) => {
  row.addEventListener("click", () => {
    if (!camState) return;
    camState.classKey = row.dataset.key;
    els.probRows.forEach((r) => r.classList.toggle("is-cam-active", r === row));
    renderCam();
  });
});
els.camSwitch.addEventListener("change", renderCam);

/* ============================================================
   Init
   ============================================================ */
applyTheme(theme);
applyLang(lang);
setView(currentViewFromHash());