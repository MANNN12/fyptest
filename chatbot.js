// Add this JavaScript file to your project (e.g., js/fallback-chatbot.js)
// Then include it in your HTML with: <script src="js/fallback-chatbot.js"></script>

document.addEventListener("DOMContentLoaded", function () {
    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const closeBtn = document.getElementById('close-chatbot');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Store conversation history (for context)
    let conversationHistory = [];

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotBox.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        chatbotBox.style.display = 'none';
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            // Add user message to UI
            addMessage(message, 'user');
            
            // Store in history
            conversationHistory.push({ sender: 'user', content: message });
            
            // Clear input field
            chatInput.value = '';
            
            // Show typing indicator
            const loadingId = showTypingIndicator();
            
            // Simulate processing delay
            setTimeout(function() {
                // Remove typing indicator
                removeTypingIndicator(loadingId);
                
                // Get response based on rules
                const response = getEnhancedResponse(message, conversationHistory);
                
                // Add bot response to UI
                addMessage(response, 'bot');
                
                // Store in history
                conversationHistory.push({ sender: 'bot', content: response });
            }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
        }
    }

    // Function to add message to chat UI
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const loadingId = 'typing-indicator-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot-message');
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = '<div class="message-content">Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate the dots
        const dots = loadingDiv.querySelectorAll('.dot');
        let dotIndex = 0;
        
        const interval = setInterval(() => {
            dots.forEach((dot, index) => {
                if (index === dotIndex % 3) {
                    dot.style.opacity = '1';
                } else {
                    dot.style.opacity = '0.3';
                }
            });
            dotIndex++;
        }, 300);
        
        loadingDiv.dataset.interval = interval;
        return loadingId;
    }

    // Function to remove typing indicator
    function removeTypingIndicator(loadingId) {
        const loadingDiv = document.getElementById(loadingId);
        if (loadingDiv) {
            clearInterval(loadingDiv.dataset.interval);
            loadingDiv.remove();
        }
    }

    // Enhanced response function with better pattern matching
    function getEnhancedResponse(message, history) {
        // Convert to lowercase for easier matching
        const msgLower = message.toLowerCase();
        
        // Greetings
        if (msgLower.match(/\b(salam|hello|hi|hey|assalam|greetings)\b/)) {
            return "Wa alaikum salam! How can I assist you with your spiritual journey today?";
        }
        
        // Prayer related
        if (msgLower.match(/\b(prayer|salah|pray|namaz)\b/)) {
            if (msgLower.includes('time')) {
                return "Prayer times vary by location. Would you like me to help you find the prayer times for your area? You can also use the prayer time feature in the iPray app.";
            } else if (msgLower.includes('how') || msgLower.includes('method')) {
                return "The daily prayers in Islam consist of specific movements and recitations. Would you like me to explain the step-by-step method for a particular prayer?";
            } else if (msgLower.includes('miss') || msgLower.includes('forgot')) {
                return "If you've missed a prayer, you can make it up as qada (missed prayer). It's best to pray it as soon as you remember.";
            } else {
                return "Prayer (Salah) is one of the five pillars of Islam. Muslims pray five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha. How can I help you with your prayers?";
            }
        }
        
        // Quran related
        if (msgLower.match(/\b(quran|surah|ayah|verse|recite)\b/)) {
            if (msgLower.includes('learn') || msgLower.includes('how')) {
                return "Learning the Quran starts with mastering the Arabic alphabet and tajweed rules. The iPray app offers Quran learning resources. Would you like specific beginner tips?";
            } else if (msgLower.includes('meaning')) {
                return "The Quran contains deep meanings and guidance. Is there a specific verse or surah you'd like to understand better?";
            } else {
                return "The Quran is the holy book of Islam, revealed to Prophet Muhammad ﷺ. The iPray app offers Quran reading, audio recitations, and translations. What aspect of the Quran would you like to explore?";
            }
        }
        
        // Ramadan related
        if (msgLower.match(/\b(ramadan|fasting|iftar|suhoor|suhur|sawm)\b/)) {
            if (msgLower.includes('prepare') || msgLower.includes('ready')) {
                return "To prepare for Ramadan, gradually adjust your schedule, plan healthy meals, complete pending tasks, and set spiritual goals. Would you like specific preparation tips?";
            } else if (msgLower.includes('break') || msgLower.includes('iftar')) {
                return "Iftar (breaking fast) is traditionally done with dates and water, following the Prophet's tradition. Would you like some healthy iftar meal suggestions?";
            } else {
                return "Ramadan is the holy month of fasting, prayer, reflection, and community. The iPray app has special Ramadan features including fasting trackers and dua collections. How can I help you with Ramadan?";
            }
        }
        
        // Mosques and community
        if (msgLower.match(/\b(mosque|masjid|jummah|friday|community)\b/)) {
            if (msgLower.includes('find') || msgLower.includes('near')) {
                return "The iPray app can help you locate nearby mosques using your location. Would you like me to guide you on how to use this feature?";
            } else if (msgLower.includes('etiquette') || msgLower.includes('manner')) {
                return "When visiting a mosque, dress modestly, remove shoes before entering prayer areas, maintain cleanliness, avoid loud talking, and silence your phone. Would you like more specific etiquette guidelines?";
            } else {
                return "Mosques are centers for prayer, learning, and community gathering. The iPray app can help you find nearby mosques and prayer times. How can I assist you regarding mosques?";
            }
        }
        
        // Duas and supplications
        if (msgLower.match(/\b(dua|supplication|prayer|ask|request)\b/) && msgLower.match(/\b(allah|god)\b/)) {
            if (msgLower.includes('morning') || msgLower.includes('evening')) {
                return "There are special duas for morning (adhkar al-sabah) and evening (adhkar al-masa). These include praising Allah, seeking protection, and expressing gratitude. Would you like me to share some of these duas?";
            } else if (msgLower.includes('protection') || msgLower.includes('health')) {
                return "For protection, many Muslims recite Ayatul Kursi, the last two surahs of the Quran (Al-Falaq and An-Nas), and the dua: 'Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i, wa Huwas-Sami'ul-'Alim.'";
            } else {
                return "Duas are personal supplications to Allah. The iPray app has a collection of duas for various occasions and needs. Would you like me to suggest some essential daily duas?";
            }
        }
        
        // Islamic knowledge
        if (msgLower.match(/\b(islam|muslim|faith|belief|pillars|halal|haram)\b/)) {
            if (msgLower.includes('pillars')) {
                return "The five pillars of Islam are: 1) Shahada (faith declaration), 2) Salah (prayer), 3) Zakat (charity), 4) Sawm (fasting in Ramadan), and 5) Hajj (pilgrimage). Would you like to learn more about any specific pillar?";
            } else if (msgLower.includes('halal') || msgLower.includes('food') || msgLower.includes('eat')) {
                return "Halal food follows Islamic dietary guidelines. Meat must be from permissible animals slaughtered in Allah's name, and alcohol and pork are prohibited. The iPray app can help you find halal restaurants nearby.";
            } else {
                return "Islam is a monotheistic faith centered on belief in one God (Allah) and following the teachings of Prophet Muhammad ﷺ. How can I help you learn more about Islamic beliefs and practices?";
            }
        }
        
        // App features
        if (msgLower.match(/\b(app|feature|ipray|help|use|how|work)\b/)) {
            if (msgLower.includes('prayer') || msgLower.includes('salah')) {
                return "The iPray app offers accurate prayer times, qibla direction, adhan notifications, and prayer tracking. Would you like me to explain how to set up prayer notifications?";
            } else if (msgLower.includes('quran')) {
                return "The Quran feature in iPray includes complete text, translations, audio recitations, bookmarks, and study tools. Would you like tips on how to use these features?";
            } else {
                return "The iPray app offers many features including prayer times, Quran reader, qibla finder, Islamic calendar, dua collection, and Ramadan tools. Which feature would you like to learn more about?";
            }
        }
        
        // Thanks and appreciation
        if (msgLower.match(/\b(thank|thanks|jazak|shukran|grateful|appreciate)\b/)) {
            return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about Islamic practices or the iPray app?";
        }
        
        // Check for follow-up questions based on history
        const lastBotMessage = findLastBotMessage(history);
        if (lastBotMessage) {
            if (lastBotMessage.includes("Would you like") && (msgLower.includes("yes") || msgLower.includes("sure") || msgLower.includes("please"))) {
                if (lastBotMessage.includes("prayer times")) {
                    return "To find prayer times, go to the Prayer Times tab in the iPray app. You can set your location manually or allow automatic detection. The app will show all five daily prayer times and notify you before each prayer if you enable notifications.";
                } else if (lastBotMessage.includes("step-by-step method")) {
                    return "A basic prayer involves: 1) Make intention (niyyah), 2) Say 'Allahu Akbar' and raise hands, 3) Place hands over chest, 4) Recite Surah Al-Fatiha and another surah, 5) Bow (ruku), 6) Stand straight, 7) Prostrate (sujud) twice with a sitting in between, 8) Complete required rakats, 9) End with tashahhud and tasleem.";
                } else if (lastBotMessage.includes("beginner tips") || lastBotMessage.includes("Quran learning")) {
                    return "For beginners learning Quran: 1) Start with Arabic alphabet, 2) Learn pronunciation rules (tajweed), 3) Begin with short surahs, 4) Listen to recitations, 5) Practice daily, even if just for 5 minutes, 6) Join a study group or get a teacher, 7) Use the iPray app's learning features for guided practice.";
                }
            }
        }
        
        // Default response if no patterns match
        return "Thank you for your question about Islamic practices. To provide you with the most accurate information, could you please clarify what specific aspect you're interested in learning about?";
    }
    
    // Helper function to find the last bot message
    function findLastBotMessage(history) {
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].sender === 'bot') {
                return history[i].content;
            }
        }
        return null;
    }

    // Add CSS for the typing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
        }
        
        .dot {
            animation: blink 1.5s infinite;
            animation-fill-mode: both;
            margin-left: 2px;
        }
        
        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});