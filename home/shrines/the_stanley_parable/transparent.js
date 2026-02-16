class TransparentClickHandler {
    constructor(selector = '.transparent-click') {
      this.images = document.querySelectorAll(selector);
      this.init();
    }
    
    init() {
      this.images.forEach(img => {
        if (img.complete) {
          this.setupImage(img);
        } else {
          img.addEventListener('load', () => this.setupImage(img));
        }
        
        // Default cursor style (before canvas is ready)
        img.style.cursor = 'default';
        
        // Mouse move handler for cursor changes
        img.addEventListener('mousemove', this.handleHover);
      });
    }
    
    setupImage(img) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      
      img._clickContext = ctx;
      img.addEventListener('click', this.handleClick);
    }
    
    handleHover(e) {
      const img = e.target;
      if (!img._clickContext) return;
      
      const isOpaque = this.checkOpaque(img, e);
      img.style.cursor = isOpaque ? 'pointer' : 'default';
    }
    
    handleClick(e) {
      const img = e.target;
      const isOpaque = this.checkOpaque(img, e);
      
      if (isOpaque && img.dataset.href) {
        if (img.dataset.target === '_blank') {
          window.open(img.dataset.href, '_blank');
        } else {
          window.location.href = img.dataset.href;
        }
      }
    }
    
    checkOpaque(img, event) {
      const rect = img.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const pixelX = Math.floor(x * (img.naturalWidth / rect.width));
      const pixelY = Math.floor(y * (img.naturalHeight / rect.height));
      
      const pixelData = img._clickContext.getImageData(pixelX, pixelY, 1, 1).data;
      return pixelData[3] > 0;
    }
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    new TransparentClickHandler();
  });