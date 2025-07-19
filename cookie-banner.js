// GDPR Cookie Consent Banner
class CookieConsent {
    constructor() {
        this.cookieName = 'blankonia-cookie-consent';
        this.cookieVersion = '1.0';
        this.init();
    }

    init() {
        // Check if consent already given
        const consent = this.getCookie(this.cookieName);
        if (!consent) {
            this.showBanner();
        }
    }

    showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3>🍪 We use cookies</h3>
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">Accept All</button>
                    <button id="cookie-reject-all" class="cookie-btn cookie-btn-reject">Reject All</button>
                    <button id="cookie-preferences" class="cookie-btn cookie-btn-settings">Cookie Settings</button>
                </div>
            </div>
            <button id="cookie-close" class="cookie-close">×</button>
        `;

        document.body.appendChild(banner);
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            this.setConsent('all');
            this.hideBanner();
        });

        document.getElementById('cookie-reject-all').addEventListener('click', () => {
            this.setConsent('essential');
            this.hideBanner();
        });

        document.getElementById('cookie-preferences').addEventListener('click', () => {
            this.showPreferences();
        });

        document.getElementById('cookie-close').addEventListener('click', () => {
            this.setConsent('essential');
            this.hideBanner();
        });
    }

    showPreferences() {
        const modal = document.createElement('div');
        modal.id = 'cookie-preferences-modal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>Cookie Preferences</h2>
                    <button id="cookie-modal-close" class="cookie-close">×</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Essential Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="essential-cookies" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Analytics Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies help us understand how visitors interact with our website.</p>
                    </div>
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Marketing Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are used to deliver personalized advertisements.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="save-preferences" class="cookie-btn cookie-btn-accept">Save Preferences</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners for modal
        document.getElementById('cookie-modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.getElementById('save-preferences').addEventListener('click', () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            
            let consent = 'essential';
            if (analytics && marketing) {
                consent = 'all';
            } else if (analytics) {
                consent = 'analytics';
            } else if (marketing) {
                consent = 'marketing';
            }

            this.setConsent(consent);
            this.hideBanner();
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    setConsent(type) {
        const consentData = {
            version: this.cookieVersion,
            timestamp: new Date().toISOString(),
            consent: type
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consentData), 365);
        
        // Enable/disable tracking based on consent
        this.handleTracking(type);
    }

    handleTracking(consentType) {
        // Here you would enable/disable actual tracking scripts
        console.log('Cookie consent set to:', consentType);
        
        // Example: Enable Google Analytics if analytics consent given
        if (consentType === 'all' || consentType === 'analytics') {
            // Enable analytics tracking
            console.log('Analytics tracking enabled');
        }
        
        if (consentType === 'all' || consentType === 'marketing') {
            // Enable marketing tracking
            console.log('Marketing tracking enabled');
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(banner);
            }, 300);
        }
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
}); 