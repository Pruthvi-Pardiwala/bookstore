const flashAlert = document.getElementById('flashAlert');
if (flashAlert) {
  setTimeout(() => {
    flashAlert.style.transition = 'opacity 0.5s ease';
    flashAlert.style.opacity = '0';
    setTimeout(() => flashAlert.remove(), 500);
  }, 4000);
}

function confirmDelete(title) {
  return confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`);
}

const fileInput = document.getElementById('image');
const uploadPreview = document.getElementById('uploadPreview');
const uploadZone = document.getElementById('uploadZone');

if (fileInput && uploadPreview) {
  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      this.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      this.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadPreview.innerHTML = `
        <img src="${e.target.result}" alt="Preview" style="max-height:200px;width:auto;border-radius:8px;object-fit:contain;" />
        <p style="font-size:0.75rem;color:var(--text-3);margin-top:0.5rem;">${file.name} (${(file.size / 1024).toFixed(1)} KB)</p>
      `;
    };
    reader.readAsDataURL(file);
  });

  if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('drag-over');
    });
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) {
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }
}

const descArea = document.getElementById('description');
const descCount = document.getElementById('descCount');

if (descArea && descCount) {
  descArea.addEventListener('input', function () {
    descCount.textContent = this.value.length;
  });
}

if (window.history.replaceState) {
  const url = new URL(window.location.href);
  if (url.searchParams.has('success') || url.searchParams.has('error')) {
    url.searchParams.delete('success');
    url.searchParams.delete('error');
    window.history.replaceState({}, '', url.toString());
  }
}

(function () {
  const params = new URLSearchParams(window.location.search);
  const success = params.get('success');
  const error = params.get('error');
  if (success || error) {
    const main = document.querySelector('.main-content');
    if (!main) return;
    const div = document.createElement('div');
    div.id = 'flashAlert';
    div.className = success ? 'alert alert-success' : 'alert alert-error';
    div.textContent = success ? `✅ ${success}` : `❌ ${error}`;
    main.prepend(div);
    setTimeout(() => {
      div.style.transition = 'opacity 0.5s ease';
      div.style.opacity = '0';
      setTimeout(() => div.remove(), 500);
    }, 4000);
  }
})();
