import './style.css'
lucide.createIcons();
        const observer = new IntersectionObserver((e)=>{e.forEach((e)=>{e.isIntersecting&&e.target.classList.add("visible")})},{threshold:.1});
        document.querySelectorAll(".reveal").forEach((e)=>{observer.observe(e)});
        document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{e.parentElement.classList.toggle("active")})});

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatWindow = document.getElementById('chatWindow');
            const closeChatBtn = document.getElementById('closeChat');
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const sendMessageBtn = document.getElementById('sendMessageBtn');

            let chatHistory = []; // Stores chat history for context

            // --- Chatbot UI Toggle ---
            chatbotToggle.addEventListener('click', () => {
                chatWindow.classList.toggle('open');
                if (chatWindow.classList.contains('open')) {
                    chatInput.focus();
                    scrollToBottom();
                    // Send initial welcome message if chat history is empty
                    if (chatHistory.length === 0) {
                        appendMessage("Hello! I'm your AI assistant. How can I help you learn about this website today?", 'bot');
                    }
                }
            });

            closeChatBtn.addEventListener('click', () => {
                chatWindow.classList.remove('open');
            });

            // --- Message Handling ---
            function appendMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', sender);
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                scrollToBottom();
            }

            function scrollToBottom() {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Auto-resize textarea
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = chatInput.scrollHeight + 'px';
            });

            // Send message on Enter key (Shift+Enter for new line)
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent new line
                    sendMessage();
                }
            });

            sendMessageBtn.addEventListener('click', sendMessage);

            async function sendMessage() {
                const userMessage = chatInput.value.trim();
                if (userMessage === '') return;

                appendMessage(userMessage, 'user');
                chatInput.value = '';
                chatInput.style.height = 'auto'; // Reset height after sending

                // Add user message to chat history
                chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

                // Show loading indicator
                const loadingMessageDiv = document.createElement('div');
                loadingMessageDiv.classList.add('message', 'bot', 'loading');
                loadingMessageDiv.innerHTML = 'Thinking... <span class="spinner"></span>';
                chatMessages.appendChild(loadingMessageDiv);
                scrollToBottom();

                sendMessageBtn.disabled = true; // Disable send button
                chatInput.disabled = true; // Disable input

                try {
                    // Define the prompt for the LLM.
                    // IMPORTANT: In a real application, you would dynamically fetch or inject
                    // content from your website here to make the bot truly knowledgeable.
                    // For this demo, we're giving it a generic context.
                    const websiteContext = `
                        This website is called "Metascanner".
                        It is a premier image metadata analysis engine and an OSINT (Open-Source Intelligence) project, primarily focused on cyber security and digital forensics.

                        **Project Team & Affiliation:**
                        Metascanner was developed by Team Delta, comprising students from Prabhu Jagatbandhu College:
                        - Debmalya Mondal (GitHub: https://github.com/debmalyamondal) (Role: Lead Developer)
                        - Ayush Kumar Singh (GitHub: https://github.com/ayushkrsingh07) (Role: System Tester)
                        - Arnab Bag (GitHub: https://github.com/anomav) (Role: Frontend & UX Developer)
                        - Ankita Pantu (GitHub: https://github.com/ankita-pantu) (Role: Project Manager)
                        The project copyright is © 2025.

                        **Core Purpose:**
                        Metascanner's primary purpose is to retrieve, analyze, and decipher deep metadata from image files. It leverages advanced AI protocols to reveal critical data and hidden truths embedded within visual assets, aiding in digital forensics and investigative journalism.

                        **Key Features & Capabilities:**
                        1.  **Deep Metadata Extraction:** Extracts and deciphers comprehensive data sets including EXIF (camera settings, date/time, exposure, ISO, focal length, flash status), IPTC (copyright, keywords, creator, headline, description), and XMP (edit history, author information). It reveals camera models, lens specifications, software used, and image dimensions.
                        2.  **Precision Geolocation Mapping:** Pinpoints the exact geographical location an image was captured using GPS coordinates (latitude, longitude, altitude, speed, direction, DOP). It visualizes these locations on an interactive world map (using OpenStreetMap, Satellite, and Topography layers via Leaflet.js) and provides human-readable addresses through reverse geocoding (OpenCage API). Users can also view locations directly on Google Maps.
                        3.  **Intelligent AI Content Analysis:** Utilizes a proprietary AI engine (Gemini API) to analyze the visual content of images. It identifies objects, scenes, dominant colors, and potential manipulations, providing unmatched contextual understanding and indicators of digital alteration.
                        4.  **Secure & Comprehensive History:** Stores analysis history securely, allowing users to access previous sessions, detailed reports, and compressed image previews via an encrypted user dashboard. History entries include location, timestamp, and extracted metadata, with options to delete entries.
                        5.  **Data Export & Reporting:** Allows users to download comprehensive analysis reports in PDF format (including image preview, extracted metadata, AI analysis, and raw metadata) and export raw metadata in JSON format.

                        **How Metascanner Works (Process):**
                        1.  **Submit Your Image:** Users securely upload an image file (supports JPEG, PNG, TIFF, HEIC, RAW formats).
                        2.  **Initiate Analysis Protocol:** The platform performs a multi-layered analysis, cross-referencing metadata with AI content evaluation.
                        3.  **Uncover the Full Report:** A detailed, interactive report is generated, displaying metadata, geolocation on a map, and AI-generated insights.

                        **Security & Privacy:**
                        Metascanner prioritizes user privacy and data security. All uploads are encrypted in transit and at rest. The platform adheres to a strict policy of not sharing, selling, or analyzing user images for any purpose other than generating the requested report.

                        **Support & Contact:**
                        For support or inquiries, users can typically find links to a privacy policy, terms of service, and contact operations in the footer of the website.
                        (Note: Specific contact email/page not provided in the code, but typically support@metascanner.com or a contact form would be available.)

                        **Technologies Used (Backend/Client-side):**
                        - Frontend: HTML, CSS, JavaScript
                        - External Libraries: Leaflet.js (for maps), exifr (for EXIF parsing), jspdf (for PDF generation), html2canvas (for canvas rendering), Lucide Icons.
                        - APIs: Google Gemini API (for AI analysis), OpenCage Geocoding API (for reverse geocoding).
                        - Backend/Data Storage: Firebase (for user authentication and secure history storage in Firestore).
                    `;

                    const prompt = `
                        You are Metascan AI, You are a friendly and helpful AI assistant for the "Metascanner" website.
                        Your goal is to answer user questions about the website's features, purpose, services, and how to get support.
                        Here is some context about the website:
                        ${websiteContext}

                        Based on the conversation history and the provided context, respond to the user's last message.
                        If you don't have specific information, you can say something like "I don't have that specific detail, but I can tell you about our main services."
                        Keep your answers concise and professional.
                    `;

                    // Prepare chat history for the API call, including the system prompt
                    let conversationForAPI = [{ role: "user", parts: [{ text: prompt }] }];
                    // Add previous user and bot messages to maintain context
                    chatHistory.forEach(msg => conversationForAPI.push(msg));


                    const payload = { contents: conversationForAPI };
                    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json();

                    // Remove loading message
                    chatMessages.removeChild(loadingMessageDiv);

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const botResponse = result.candidates[0].content.parts[0].text;
                        appendMessage(botResponse, 'bot');
                        // Add bot message to chat history
                        chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
                    } else {
                        appendMessage('Sorry, I could not get a response from the AI. Please try again.', 'bot');
                        console.error('Unexpected API response structure:', result);
                    }
                } catch (error) {
                    // Remove loading message even on error
                    if (chatMessages.contains(loadingMessageDiv)) {
                        chatMessages.removeChild(loadingMessageDiv);
                    }
                    appendMessage('An error occurred while connecting to the AI. Please check your network and try again.', 'bot');
                    console.error('Error calling Gemini API:', error);
                } finally {
                    sendMessageBtn.disabled = false; // Re-enable send button
                    chatInput.disabled = false; // Re-enable input
                    chatInput.focus(); // Focus input for next message
                }
            }
        });


