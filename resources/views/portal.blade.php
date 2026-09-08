<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>LODEX Portal - Laravel Client Application</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700;800&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-void: #080C14;
      --surface-card: #0F172A;
      --surface-input: #131E36;
      --border: rgba(255, 255, 255, 0.08);
      --border-focus: rgba(0, 242, 254, 0.4);
      --cyan: #00F2FE;
      --cyan-glow: rgba(0, 242, 254, 0.2);
      --indigo: #6366F1;
      --mint: #10B981;
      --text-white: #F8FAFC;
      --text-muted: #94A3B8;
      --red: #EF4444;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg-void);
      color: var(--text-white);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 16px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .logo-glyph {
      width: 32px;
      height: 32px;
    }

    .brand-text {
      font-family: 'Chakra Petch', sans-serif;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #FFF;
    }
    .brand-text span { color: var(--cyan); }

    .system-status {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
    }

    .pill-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 99px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--mint);
    }
    .pill-status.offline {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: var(--red);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 6px currentColor;
    }

    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 36px 24px;
    }

    .intro-box {
      margin-bottom: 32px;
    }
    .intro-box h1 {
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .intro-box p {
      color: var(--text-muted);
      font-size: 15px;
    }

    .portal-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 28px;
    }

    @media (max-width: 900px) {
      .portal-grid { grid-template-columns: 1fr; }
    }

    .card {
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 26px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.4);
    }

    .card-title {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .form-group {
      margin-bottom: 18px;
    }

    label {
      display: block;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }

    input, textarea {
      width: 100%;
      background: var(--surface-input);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 11px 14px;
      color: var(--text-white);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
    }
    input:focus, textarea:focus {
      border-color: var(--cyan);
      box-shadow: 0 0 12px var(--cyan-glow);
    }

    .btn-primary {
      background: linear-gradient(135deg, #00F2FE 0%, #06B6D4 100%);
      color: #080C14;
      border: none;
      padding: 11px 22px;
      border-radius: 9px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-primary:hover {
      box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
      transform: translateY(-1px);
    }

    .btn-chip {
      background: var(--surface-input);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .btn-chip:hover { border-color: var(--cyan); color: #FFF; }

    /* Tabs */
    .tab-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
    }
    .tab-link {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 600;
      padding: 8px 14px;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .tab-link.active {
      background: var(--surface-input);
      color: var(--cyan);
    }

    .view-pane { display: none; }
    .view-pane.active { display: block; }

    /* Results */
    .result-item {
      background: var(--surface-input);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .result-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .badge-score {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--cyan);
      background: rgba(0, 242, 254, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .qa-box {
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 12px;
      padding: 18px;
      margin-top: 16px;
    }
    .qa-badge {
      background: var(--mint);
      color: #080C14;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 10px;
      display: inline-block;
    }
    .citation-tag {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: var(--surface-input);
      border: 1px solid var(--border);
      color: var(--cyan);
      padding: 4px 10px;
      border-radius: 6px;
      margin-right: 6px;
      margin-top: 6px;
    }
  </style>
</head>
<body>

  <header>
    <div class="brand-wrap">
      <!-- Stepped Blocks Logo -->
      <svg class="logo-glyph" viewBox="0 0 150 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="0" width="50" height="50" rx="6" fill="#00F2FE"/>
        <rect x="0" y="50" width="100" height="50" rx="6" fill="#1E293B"/>
        <rect x="100" y="100" width="50" height="50" rx="6" fill="#00F2FE"/>
        <rect x="50" y="150" width="100" height="50" rx="6" fill="#1E293B"/>
        <rect x="0" y="200" width="50" height="50" rx="6" fill="#00F2FE"/>
      </svg>
      <div class="brand-text">LODE<span>X</span> <small style="font-size: 13px; color: var(--text-muted); font-family: 'Plus Jakarta Sans', sans-serif;">Client Portal (Laravel 11)</small></div>
    </div>

    <div class="system-status">
      @if(($health['status'] ?? '') === 'healthy')
        <div class="pill-status">
          <div class="status-dot"></div>
          <span>Connected: LODEX AI ({{ $health['qdrant_mode'] ?? 'online' }})</span>
        </div>
      @else
        <div class="pill-status offline">
          <div class="status-dot"></div>
          <span>LODEX Offline (Start Python server)</span>
        </div>
      @endif
    </div>
  </header>

  <main>
    <div class="intro-box">
      <h1>Laravel Client Application & Portal</h1>
      <p>Aplikasi web berbasis <strong>Laravel PHP</strong> yang memanggil service <strong>LODEX AI Middleware (Python)</strong> melalui HTTP Client.</p>
    </div>

    <div class="portal-grid">
      <!-- Left Column: Ingest Knowledge -->
      <div class="card">
        <div class="card-title">
          <span>📥 Unggah Dokumen ke LODEX</span>
        </div>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">
          Dokumen akan dikirim dari Laravel ke LODEX untuk dipotong dan disimpan ke Vector DB.
        </p>

        <div style="margin-bottom: 14px;">
          <button type="button" class="btn-chip" onclick="fillSampleSop()">+ Isi Contoh SOP Cuti</button>
          <button type="button" class="btn-chip" onclick="fillSampleKatalog()">+ Isi Contoh Buku</button>
        </div>

        <form id="ingestForm" onsubmit="handleIngest(event)">
          <div class="form-group">
            <label>ID Dokumen (External ID):</label>
            <input type="text" id="ingestId" placeholder="contoh: sop_kepegawaian_021" required>
          </div>

          <div class="form-group">
            <label>Kategori:</label>
            <input type="text" id="ingestCategory" placeholder="contoh: kepegawaian atau akademik">
          </div>

          <div class="form-group">
            <label>Judul Dokumen:</label>
            <input type="text" id="ingestTitle" placeholder="contoh: SOP Prosedur Cuti Tahunan" required>
          </div>

          <div class="form-group">
            <label>Isi Teks / Konten:</label>
            <textarea id="ingestContent" rows="5" placeholder="Tempel isi teks SOP atau buku..." required></textarea>
          </div>

          <button type="submit" class="btn-primary">Kirim ke LODEX Engine</button>
          <span id="ingestMsg" style="font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-left: 12px;"></span>
        </form>
      </div>

      <!-- Right Column: Query & Assistant -->
      <div class="card">
        <div class="tab-nav">
          <button class="tab-link active" onclick="switchView('viewSearch')">🔍 Pencarian Semantik</button>
          <button class="tab-link" onclick="switchView('viewAsk')">💬 Asisten Dokumen (Q&A)</button>
        </div>

        <!-- Search View -->
        <div id="viewSearch" class="view-pane active">
          <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">
            Mencari dokumen berdasarkan makna semantik (mode pencarian katalog perpus).
          </p>

          <form onsubmit="handleSearch(event)">
            <div class="form-group">
              <label>Kueri Pencarian:</label>
              <input type="text" id="searchQ" placeholder="Ketik apa yang ingin kamu cari..." required>
            </div>
            <button type="submit" class="btn-primary">Cari via LODEX</button>
          </form>

          <div id="searchOutput" style="margin-top: 20px; display: none;">
            <div id="searchCount" style="font-size: 13px; font-weight: 600; color: var(--cyan); margin-bottom: 12px;"></div>
            <div id="searchList"></div>
          </div>
        </div>

        <!-- Ask View -->
        <div id="viewAsk" class="view-pane">
          <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">
            Mengajukan pertanyaan dan menerima jawaban faktual disertai sitasi dokumen resmi.
          </p>

          <form onsubmit="handleAsk(event)">
            <div class="form-group">
              <label>Pertanyaan Karyawan / Pengguna:</label>
              <input type="text" id="askQ" placeholder="Tanyakan isi aturan atau syarat..." required>
            </div>
            <button type="submit" class="btn-primary">Tanya LODEX</button>
          </form>

          <div id="askOutput" style="display: none;">
            <div class="qa-box">
              <span class="qa-badge">100% GROUNDED</span>
              <p id="askAnswer" style="font-size: 14px; line-height: 1.7; color: #FFF; margin-bottom: 14px;"></p>
              
              <label>SITASI BUKTI DOKUMEN:</label>
              <div id="askCitations"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    function switchView(viewId) {
      document.querySelectorAll('.view-pane').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
      
      document.getElementById(viewId).classList.add('active');
      event.currentTarget.classList.add('active');
    }

    function fillSampleSop() {
      document.getElementById('ingestId').value = 'sop_hr_021';
      document.getElementById('ingestCategory').value = 'kepegawaian';
      document.getElementById('ingestTitle').value = 'SOP-021: Prosedur Pengajuan Izin Cuti Tahunan Staf';
      document.getElementById('ingestContent').value = 'Setiap staf dan karyawan berhak atas jatah cuti tahunan sebanyak 12 hari kerja per tahun. Pengajuan cuti wajib diserahkan kepada atasan langsung minimal 3 hari kerja sebelum tanggal cuti dimulai. Penggantian biaya dinas luar kota wajib menyertakan bukti kuitansi asli maksimal 7 hari setelah kepulangan.';
    }

    function fillSampleKatalog() {
      document.getElementById('ingestId').value = 'book_pol_005';
      document.getElementById('ingestCategory').value = 'politik';
      document.getElementById('ingestTitle').value = 'Dinamika Kekuasaan dan Transisi Orde Baru ke Reformasi';
      document.getElementById('ingestContent').value = 'Buku ini membedah pergantian rezim pada tahun 1998, kondisi sosial politik masyarakat sipil, serta kisah para tahanan politik di era Orde Baru yang berjuang menuntut kebebasan berpendapat.';
    }

    async function handleIngest(e) {
      e.preventDefault();
      const msg = document.getElementById('ingestMsg');
      msg.style.color = 'var(--cyan)';
      msg.innerText = 'Mengirim ke LODEX via Laravel...';

      const payload = {
        external_id: document.getElementById('ingestId').value,
        category: document.getElementById('ingestCategory').value,
        title: document.getElementById('ingestTitle').value,
        content: document.getElementById('ingestContent').value,
      };

      try {
        const resp = await fetch('/api/ingest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await resp.json();
        if (resp.ok) {
          msg.style.color = 'var(--mint)';
          msg.innerText = `✅ Berhasil diindeks! (${data.chunks_created || 1} chunks dibuat)`;
        } else {
          msg.style.color = 'var(--red)';
          msg.innerText = 'Gagal: ' + (data.message || 'Error');
        }
      } catch (err) {
        msg.style.color = 'var(--red)';
        msg.innerText = 'Error: ' + err.message;
      }
    }

    async function handleSearch(e) {
      e.preventDefault();
      const q = document.getElementById('searchQ').value.trim();
      if (!q) return;

      const out = document.getElementById('searchOutput');
      const countEl = document.getElementById('searchCount');
      const listEl = document.getElementById('searchList');

      countEl.innerText = 'Mencari di database vektor LODEX...';
      out.style.display = 'block';
      listEl.innerHTML = '';

      try {
        const resp = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ query: q, limit: 5 })
        });

        const data = await resp.json();
        countEl.innerText = `Ditemukan ${data.total_found || 0} hasil relevan di tenant [${data.tenant_id}]:`;

        if (!data.results || data.results.length === 0) {
          listEl.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">Tidak ada dokumen yang cocok.</p>';
          return;
        }

        data.results.forEach(item => {
          const div = document.createElement('div');
          div.className = 'result-item';
          div.innerHTML = `
            <div class="result-head">
              <strong>${item.title} <small style="color: var(--text-muted);">(${item.external_id})</small></strong>
              <span class="badge-score">Similarity: ${(item.score * 100).toFixed(1)}%</span>
            </div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${item.snippet}</p>
          `;
          listEl.appendChild(div);
        });
      } catch (err) {
        countEl.innerText = 'Error: ' + err.message;
      }
    }

    async function handleAsk(e) {
      e.preventDefault();
      const q = document.getElementById('askQ').value.trim();
      if (!q) return;

      const out = document.getElementById('askOutput');
      const ansEl = document.getElementById('askAnswer');
      const citEl = document.getElementById('askCitations');

      ansEl.innerText = 'Menalar jawaban dari konteks dokumen...';
      out.style.display = 'block';
      citEl.innerHTML = '';

      try {
        const resp = await fetch('/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ question: q, limit: 4 })
        });

        const data = await resp.json();
        ansEl.innerText = data.answer || 'Tidak ada jawaban.';

        if (data.citations && data.citations.length > 0) {
          data.citations.forEach(c => {
            const span = document.createElement('span');
            span.className = 'citation-tag';
            span.innerText = `📄 ${c.title} (${c.external_id})`;
            citEl.appendChild(span);
          });
        } else {
          citEl.innerHTML = '<span style="font-size: 12px; color: var(--text-muted);">Tidak ada sitasi dokumen.</span>';
        }
      } catch (err) {
        ansEl.innerText = 'Error: ' + err.message;
      }
    }
  </script>
</body>
</html>
