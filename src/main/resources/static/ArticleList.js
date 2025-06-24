function loadArticles() {
    fetch('/api/articles') 
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return response.json();
        })
        .then(data => {
            const table = document.getElementById('articlesTable');
            const tbody = document.getElementById('articlesBody');
            tbody.innerHTML = '';
            data.forEach(article => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${article.id}</td>
                    <td>${article.title}</td>
                    <td>
                        <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(article.title)}" target="_blank" style="background:#1976d2;color:#fff;padding:6px 14px;border-radius:4px;text-decoration:none;font-size:14px;">Ссылка на Wikipedia</a>
                    </td>
                    <td style="text-align:center;">
                        <button onclick="deleteArticle(${article.id})" style="background:#d32f2f;color:#fff;border:none;padding:6px 14px;border-radius:4px;cursor:pointer;font-size:14px;">Удалить</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            table.style.display = data.length ? '' : 'none';
            document.getElementById('error').textContent = data.length ? '' : 'Нет данных';
        })
        .catch(err => {
            document.getElementById('error').textContent = err.message;
        });
}

function deleteArticle(id) {
    if (!confirm('Удалить статью?')) return;
    fetch(`/api/articles/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка удаления');
            loadArticles();
        })
        .catch(err => {
            alert('Ошибка: ' + err.message);
        });
}

function addArticle() {
    const title = prompt('Введите название новой статьи:');
    if (!title) return;
    fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    .then(response => {
        if (!response.ok) throw new Error('Ошибка добавления');
        loadArticles();
    })
    .catch(err => {
        alert('Ошибка: ' + err.message);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBtn').onclick = addArticle;
});

const gradients = [
    ['#1a237e', '#4a148c'],
    ['#1976d2', '#7b2ff2'],
    ['#283593', '#8e24aa'],
    ['#1565c0', '#6a1b9a'],
    ['#3949ab', '#512da8'],
    ['#0f2027', '#2c5364'],
    ['#232526', '#414345'],
    ['#00c6ff', '#0072ff'],
    ['#ff512f', '#dd2476'],
    ['#1d4350', '#a43931'],
    ['#43cea2', '#185a9d'],
    ['#f7971e', '#ffd200'],
    ['#e96443', '#904e95'],
    ['#ff5f6d', '#ffc371'],
    ['#36d1c4', '#1e3799']
];
let gradIdx = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');
function setGradient(div, idx) {
    div.style.background = `linear-gradient(135deg, ${gradients[idx][0]} 0%, ${gradients[idx][1]} 100%)`;
}
setGradient(bg1, gradIdx);
setGradient(bg2, (gradIdx + 1) % gradients.length);
let fade = false;
setInterval(() => {
    fade = !fade;
    if (fade) {
        gradIdx = (gradIdx + 1) % gradients.length;
        setGradient(bg2, gradIdx);
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
    } else {
        gradIdx = (gradIdx + 1) % gradients.length;
        setGradient(bg1, gradIdx);
        bg2.style.opacity = 0;
        bg1.style.opacity = 1;
    }
}, 1800);
