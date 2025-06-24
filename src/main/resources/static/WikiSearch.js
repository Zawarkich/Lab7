document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (Math.floor(Math.random() * 5) === 0) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGzSBwkJvgkBhyohjO8%3D', '_blank');
    }
    const term = document.getElementById('term').value.trim();
    if (!term) return;
    document.getElementById('error').textContent = '';
    document.getElementById('results').innerHTML = '';
    fetch(`/api/search?term=${encodeURIComponent(term)}`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return response.json();
        })
        .then(data => {
            if (!data || (Array.isArray(data) && !data.length) || (typeof data === 'object' && !Array.isArray(data) && !data.content)) {
                document.getElementById('error').textContent = 'Ничего не найдено';
                return;
            }
            const results = document.getElementById('results');
            results.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.content || '';
                    results.appendChild(li);
                });
            } else if (typeof data === 'object' && data.content) {
                const li = document.createElement('li');
                li.textContent = data.content;
                results.appendChild(li);
            } else if (typeof data === 'string') {
                const li = document.createElement('li');
                li.textContent = data;
                results.appendChild(li);
            }
        })
        .catch(err => {
            document.getElementById('error').textContent = err.message;
        });
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
