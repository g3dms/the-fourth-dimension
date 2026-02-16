---

layout: fonts
css-url: '../../assets/fonts.css'
title: Font Hoard

---

# Font Hoard (Constantly updating ♥)

Please enjoy my **font hoard**!

I keep all types of fonts, usually for graphic design inspiration or a font that I'll be adding/I've added to my webpages.

Everything is sorted in **alphabetical order**. If there's any issues (like crediting, incorrect tags, or broken fonts), please don't hesitate to contact me **(be nice, please :-) !)**

There's also a tagging system that I encourage you to use~ I might update different fonts' tags in the near future, for now the tags are pretty loosely set ^w^ If you don't know where to start, maybe check out the *#favourites* tag!

*P.S.: No credits are needed for any fonts you find on the page, simply credit the **actual** creators of the font (if required)!*

<div class="filter-controls">
  <input type="text" id="tagSearch" placeholder="Search tags or font names ^_^">
  <div id="tagButtons"></div>
</div>

<div id="fontContainer">
  {% assign sorted_fonts = site.data.fonts | sort: 'name' %}
  {% for font in sorted_fonts %}
  <div class="font-card" 
       style="{{ font.css }}"
       data-tags="{{ font.tags | join: ' ' }}">
    <div class="font-name">{{ font.name }}</div>
    <div class="font-example">SPHINX OF BLACK QUARTZ, JUDGE MY VOW.</div>
    <div class="font-example">sphinx of black quartz, judge my vow.</div>
    <br>
    <div class="font-info">Created by: {{ font.info }}</div>
    <div class="tags">
      Tags: {% for tag in font.tags %}<span class="tag">#{{ tag }}</span>{% endfor %}
    </div>
  </div>
  {% endfor %}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const allFonts = Array.from(document.querySelectorAll('.font-card'));
    const tagButtons = document.getElementById('tagButtons');
    const tagSearch = document.getElementById('tagSearch');
    
    const allTags = [...new Set(
      allFonts.flatMap(font => font.dataset.tags.split(' '))
    )].sort();
    
    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn';
      btn.textContent = `#${tag}`;
      btn.dataset.tag = tag;
      btn.addEventListener('click', toggleTagFilter);
      tagButtons.appendChild(btn);
    });
    
    let activeFilters = [];
    
    function toggleTagFilter(e) {
      const tag = e.target.dataset.tag;
      e.target.classList.toggle('active');
      
      if (activeFilters.includes(tag)) {
        activeFilters = activeFilters.filter(t => t !== tag);
      } else {
        activeFilters.push(tag);
      }
      
      filterFonts();
    }
    
    function filterFonts() {
      const searchTerm = tagSearch.value.toLowerCase();
      
      allFonts.forEach(font => {
        const tags = font.dataset.tags.split(' ');
        const matchesSearch = font.textContent.toLowerCase().includes(searchTerm);
        const matchesTags = activeFilters.length === 0 || 
          activeFilters.every(tag => tags.includes(tag));
        
        font.style.display = (matchesSearch && matchesTags) ? 'block' : 'none';
      });
    }
    
    tagSearch.addEventListener('input', filterFonts);
  });
</script>

