// Typing animation functionality
export const showTypingIndicator = () => {
    return {
        isTyping: false,
        show() {
            this.isTyping = true;
            setTimeout(() => {
                this.isTyping = false;
            }, 2000);
        }
    };
};

// Smooth scroll functionality
export const smoothScrollToBottom = (element) => {
    if (!element) return;
    
    const scrollHeight = element.scrollHeight;
    const currentScroll = element.scrollTop;
    const targetScroll = scrollHeight - element.clientHeight;
    
    if (targetScroll <= currentScroll) return;

    const distance = targetScroll - currentScroll;
    let start = null;
    
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / 300, 1);
        
        element.scrollTop = currentScroll + (distance * easeInOutCubic(percentage));
        
        if (percentage < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
};

// Easing function for smooth scroll
const easeInOutCubic = (t) => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Message animation timing
export const getMessageDelay = (message) => {
    const wordsPerMinute = 200;
    const words = message.split(' ').length;
    const minutes = words / wordsPerMinute;
    return Math.max(1000, minutes * 60 * 1000);
};

// Format timestamps
export const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date);
}; 