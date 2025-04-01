document.addEventListener('DOMContentLoaded', () => {
    // Sample data (replace with your JSON data)
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            const websites = data;
            let filteredWebsites = [...websites];
            const websiteGrid = document.getElementById('websiteGrid');
            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const sortSelect = document.getElementById('sortSelect');
            const toggleView = document.getElementById('toggleView');
            const modal = document.getElementById('websiteModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalUrl = document.getElementById('modalUrl');
            const modalLink = document.getElementById('modalLink');
            const closeBtn = document.querySelector('.close-btn');

            function displayWebsites() {
                websiteGrid.innerHTML = '';
                filteredWebsites.forEach(website => {
                    const card = document.createElement('div');
                    card.className = 'website-card';
                    card.innerHTML = `
                        <img src="https://www.google.com/s2/favicons?sz=64&domain_url=${website.href}" alt="${website.title} favicon">
                        <h3>${website.title}</h3>
                        <a href="${website.href}" target="_blank">${website.href}</a>
                    `;
                    card.addEventListener('click', () => showModal(website));
                    websiteGrid.appendChild(card);
                });
            }

            function showModal(website) {
                modalTitle.textContent = website.title;
                modalUrl.textContent = website.href;
                modalLink.href = website.href;
                modal.style.display = 'block';
            }

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            searchBtn.addEventListener('click', () => {
                const searchTerm = searchInput.value.toLowerCase();
                filteredWebsites = websites.filter(website => 
                    website.title.toLowerCase().includes(searchTerm) ||
                    website.href.toLowerCase().includes(searchTerm)
                );
                displayWebsites();
            });

            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });

            sortSelect.addEventListener('change', () => {
                const [sortBy, direction] = sortSelect.value.split('-');
                filteredWebsites.sort((a, b) => {
                    if (sortBy === 'title') {
                        return direction === 'asc' 
                            ? a.title.localeCompare(b.title)
                            : b.title.localeCompare(a.title);
                    } else {
                        return a.href.localeCompare(b.href);
                    }
                });
                displayWebsites();
            });

            toggleView.addEventListener('click', () => {
                websiteGrid.classList.toggle('grid-view');
                websiteGrid.classList.toggle('list-view');
            });

            // Initial display
            displayWebsites();
        })
        .catch(error => console.error('Error loading JSON:', error));
});