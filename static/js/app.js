document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HELPERS
    ===================================================== */

    function generateId(prefix) {
        return prefix + "-" + Math.floor(1000 + Math.random() * 9000);
    }

    function currentTime() {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function createOverlay() {
        const overlay = document.createElement("div");

        overlay.id = "sc-modal";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: rgba(0,0,0,0.78);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: Arial, sans-serif;
        `;

        document.body.appendChild(overlay);

        return overlay;
    }

    function closeModal() {
        const modal = document.getElementById("sc-modal");

        if (modal) {
            modal.remove();
        }

        document.body.style.overflow = "";
    }


    /* =====================================================
       SOS
    ===================================================== */

    function openSOS() {

        closeModal();

        const overlay = createOverlay();

        document.body.style.overflow = "hidden";

        overlay.innerHTML = `
            <div class="sc-dialog">

                <button class="sc-close">×</button>

                <div class="sc-icon">
                    SOS
                </div>

                <div class="sc-label">
                    SAFECIRCLE EMERGENCY ASSISTANCE
                </div>

                <h2>Do you need help?</h2>

                <p>
                    You're about to start the SafeCircle
                    emergency assistance process.
                </p>

                <div class="sc-warning">
                    <strong>⚠ Prototype mode</strong>
                    <span>
                        This demonstration does not contact
                        emergency services or send your location.
                    </span>
                </div>

                <div class="sc-buttons">

                    <button id="sos-continue" class="sc-primary">
                        Continue →
                    </button>

                    <button id="sos-cancel" class="sc-secondary">
                        Cancel
                    </button>

                </div>

            </div>
        `;

        addStyles();

        overlay.querySelector(".sc-close").onclick = closeModal;
        overlay.querySelector("#sos-cancel").onclick = closeModal;

        overlay.querySelector("#sos-continue").onclick = function () {
            showEmergencyQuestion(overlay);
        };
    }


    /* =====================================================
       SOS QUESTION
    ===================================================== */

    function showEmergencyQuestion(overlay) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-icon">
                SOS
            </div>

            <div class="sc-label">
                SAFECIRCLE EMERGENCY ASSISTANCE
            </div>

            <h2>What happened?</h2>

            <p>
                Select the type of assistance you need.
            </p>

            <div class="sc-options">

                <button class="sc-option" data-type="Medical">
                    <span>🚑</span>
                    <div>
                        <strong>Medical</strong>
                        <small>
                            Health or medical emergency
                        </small>
                    </div>
                </button>

                <button class="sc-option" data-type="Personal Safety">
                    <span>🛡️</span>
                    <div>
                        <strong>Personal Safety</strong>
                        <small>
                            I feel unsafe or threatened
                        </small>
                    </div>
                </button>

                <button class="sc-option" data-type="Fire">
                    <span>🔥</span>
                    <div>
                        <strong>Fire</strong>
                        <small>
                            Fire or immediate hazard
                        </small>
                    </div>
                </button>

                <button class="sc-option" data-type="Other">
                    <span>⚠️</span>
                    <div>
                        <strong>Other</strong>
                        <small>
                            Another urgent situation
                        </small>
                    </div>
                </button>

            </div>

            <div class="sc-note">
                🛡️ Choose the option that best describes
                your situation.
            </div>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;

        dialog.querySelectorAll(".sc-option").forEach(function (button) {

            button.onclick = function () {

                const type = button.dataset.type;

                showIncidentConfirmation(overlay, type);
            };

        });
    }


    /* =====================================================
       SOS CONFIRMATION
    ===================================================== */

    function showIncidentConfirmation(overlay, type) {

        const dialog = overlay.querySelector(".sc-dialog");

        const incidentId = generateId("SC");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-success">
                ✓
            </div>

            <div class="sc-label">
                SAFECIRCLE INCIDENT
            </div>

            <h2>Assistance started.</h2>

            <p>
                Your emergency type has been recorded as:
                <strong>${type}</strong>
            </p>

            <div class="sc-info">

                <div>
                    <span>Incident ID</span>
                    <strong>${incidentId}</strong>
                </div>

                <div>
                    <span>Type</span>
                    <strong>${type}</strong>
                </div>

                <div>
                    <span>Created</span>
                    <strong>${currentTime()}</strong>
                </div>

                <div class="sc-active">
                    <span></span>
                    Active
                </div>

            </div>

            <div class="sc-warning">
                <strong>✓ Safety Circle notified</strong>
                <span>
                    Prototype notification —
                    no real message has been sent.
                </span>
            </div>

            <button id="sos-done" class="sc-primary">
                Done
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;
        dialog.querySelector("#sos-done").onclick = closeModal;
    }


    /* =====================================================
       COMMUNITY
    ===================================================== */

    function openCommunity() {

        closeModal();

        const overlay = createOverlay();

        document.body.style.overflow = "hidden";

        overlay.innerHTML = `
            <div class="sc-dialog">

                <button class="sc-close">×</button>

                <div class="sc-label">
                    SAFECIRCLE COMMUNITY
                </div>

                <h2>
                    Help starts
                    <span>with us.</span>
                </h2>

                <p>
                    Connect with people and resources
                    around you when you need support.
                </p>

                <div class="sc-options">

                    <button class="sc-option" id="need-help">
                        <span>🆘</span>
                        <div>
                            <strong>I Need Help</strong>
                            <small>
                                Create a community help request
                            </small>
                        </div>
                    </button>

                    <button class="sc-option" id="can-help">
                        <span>🤝</span>
                        <div>
                            <strong>I Can Help</strong>
                            <small>
                                Offer support to someone nearby
                            </small>
                        </div>
                    </button>

                    <button class="sc-option" id="resources">
                        <span>📚</span>
                        <div>
                            <strong>Safety Resources</strong>
                            <small>
                                Learn practical safety information
                            </small>
                        </div>
                    </button>

                </div>

                <div class="sc-note">
                    🛡️ SafeCircle uses approximate areas
                    instead of exposing exact locations publicly.
                </div>

            </div>
        `;

        addStyles();

        overlay.querySelector(".sc-close").onclick = closeModal;

        overlay.querySelector("#need-help").onclick = function () {
            showHelpForm(overlay);
        };

        overlay.querySelector("#can-help").onclick = function () {
            showHelperForm(overlay);
        };

        overlay.querySelector("#resources").onclick = function () {
            showResources(overlay);
        };
    }


    /* =====================================================
       COMMUNITY — NEED HELP
    ===================================================== */

    function showHelpForm(overlay) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-label">
                COMMUNITY HELP REQUEST
            </div>

            <h2>
                What do you
                <span>need?</span>
            </h2>

            <p>
                Tell the SafeCircle community what
                kind of support you need.
            </p>

            <label>Help category</label>

            <select id="help-category">
                <option value="">Select a category</option>
                <option>Personal Safety</option>
                <option>Medical</option>
                <option>Lost & Found</option>
                <option>Other</option>
            </select>

            <label>Approximate area</label>

            <input
                id="help-area"
                type="text"
                placeholder="Example: Central Guwahati"
            >

            <label>Description</label>

            <textarea
                id="help-description"
                placeholder="Briefly describe the situation..."
            ></textarea>

            <div class="sc-note">
                🛡️ Do not enter your exact address
                or personal contact details.
            </div>

            <button id="submit-help" class="sc-primary">
                Create Help Request →
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;

        dialog.querySelector("#submit-help").onclick = function () {

            const category =
                dialog.querySelector("#help-category").value;

            const area =
                dialog.querySelector("#help-area").value.trim();

            if (!category || !area) {
                alert("Please complete the required fields.");
                return;
            }

            showHelpConfirmation(
                overlay,
                category,
                area
            );
        };
    }


    function showHelpConfirmation(overlay, category, area) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-success">
                ✓
            </div>

            <div class="sc-label">
                COMMUNITY REQUEST CREATED
            </div>

            <h2>
                Help request
                <span>active.</span>
            </h2>

            <div class="sc-info">

                <div>
                    <span>Request ID</span>
                    <strong>${generateId("HELP")}</strong>
                </div>

                <div>
                    <span>Category</span>
                    <strong>${category}</strong>
                </div>

                <div>
                    <span>Area</span>
                    <strong>${area}</strong>
                </div>

                <div class="sc-active">
                    <span></span>
                    Open
                </div>

            </div>

            <div class="sc-note">
                🛡️ Prototype mode — this request
                has not been published to a real community.
            </div>

            <button id="close-community" class="sc-primary">
                Done
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;
        dialog.querySelector("#close-community").onclick = closeModal;
    }


    /* =====================================================
       COMMUNITY — CAN HELP
    ===================================================== */

    function showHelperForm(overlay) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-label">
                COMMUNITY SUPPORT
            </div>

            <h2>
                How can you
                <span>help?</span>
            </h2>

            <p>
                Let people know what kind of support
                you can provide.
            </p>

            <label>Support category</label>

            <select id="offer-category">
                <option value="">Select a category</option>
                <option>Personal Safety</option>
                <option>Basic Medical Support</option>
                <option>Transport / Escort</option>
                <option>Information / Guidance</option>
                <option>Other</option>
            </select>

            <label>Approximate area</label>

            <input
                id="offer-area"
                type="text"
                placeholder="Example: Central Guwahati"
            >

            <label>What can you offer?</label>

            <textarea
                id="offer-description"
                placeholder="Briefly describe how you can help..."
            ></textarea>

            <div class="sc-note">
                🛡️ Use an approximate area.
                Never share your exact address publicly.
            </div>

            <button id="submit-helper" class="sc-primary">
                Become a Community Helper →
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;

        dialog.querySelector("#submit-helper").onclick = function () {

            const category =
                dialog.querySelector("#offer-category").value;

            const area =
                dialog.querySelector("#offer-area").value.trim();

            if (!category || !area) {
                alert("Please complete the required fields.");
                return;
            }

            showHelperConfirmation(
                overlay,
                category,
                area
            );
        };
    }


    function showHelperConfirmation(overlay, category, area) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-success">
                ✓
            </div>

            <div class="sc-label">
                COMMUNITY HELPER
            </div>

            <h2>
                You're ready to
                <span>help.</span>
            </h2>

            <div class="sc-info">

                <div>
                    <span>Helper ID</span>
                    <strong>${generateId("HELPER")}</strong>
                </div>

                <div>
                    <span>Support</span>
                    <strong>${category}</strong>
                </div>

                <div>
                    <span>Area</span>
                    <strong>${area}</strong>
                </div>

                <div class="sc-active">
                    <span></span>
                    Available
                </div>

            </div>

            <div class="sc-note">
                🛡️ Prototype mode — your helper profile
                has not been published to a real community.
            </div>

            <button id="close-helper" class="sc-primary">
                Done
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;
        dialog.querySelector("#close-helper").onclick = closeModal;
    }


    /* =====================================================
       RESOURCES
    ===================================================== */

    function showResources(overlay) {

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-label">
                SAFECIRCLE RESOURCES
            </div>

            <h2>
                Safety
                <span>knowledge.</span>
            </h2>

            <div class="sc-options">

                <div class="sc-option">
                    <span>🚨</span>
                    <div>
                        <strong>Emergency Preparedness</strong>
                        <small>
                            Know what to do before an emergency.
                        </small>
                    </div>
                </div>

                <div class="sc-option">
                    <span>🔐</span>
                    <div>
                        <strong>Digital Security</strong>
                        <small>
                            Protect accounts and personal information.
                        </small>
                    </div>
                </div>

                <div class="sc-option">
                    <span>🤝</span>
                    <div>
                        <strong>Community Support</strong>
                        <small>
                            Ask trusted people for support.
                        </small>
                    </div>
                </div>

            </div>

            <div class="sc-note">
                🛡️ SafeCircle resources are educational.
            </div>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;
    }


    /* =====================================================
       CYBER SAFETY
    ===================================================== */

    function openCyberSafety() {

        closeModal();

        const overlay = createOverlay();

        document.body.style.overflow = "hidden";

        overlay.innerHTML = `
            <div class="sc-dialog">

                <button class="sc-close">×</button>

                <div class="sc-label">
                    SAFECIRCLE CYBER SAFETY
                </div>

                <h2>
                    Stay safer
                    <span>online.</span>
                </h2>

                <p>
                    Choose a situation and SafeCircle
                    will guide you through practical steps.
                </p>

                <div class="sc-options">

                    <button class="sc-option cyber-option" data-cyber="Suspicious Link">
                        <span>🔗</span>
                        <div>
                            <strong>Suspicious Link</strong>
                            <small>
                                You received a link you don't trust
                            </small>
                        </div>
                    </button>

                    <button class="sc-option cyber-option" data-cyber="Scam">
                        <span>🎣</span>
                        <div>
                            <strong>Scam / Phishing</strong>
                            <small>
                                A message or website seems fraudulent
                            </small>
                        </div>
                    </button>

                    <button class="sc-option cyber-option" data-cyber="Hacked">
                        <span>🔐</span>
                        <div>
                            <strong>Account Hacked</strong>
                            <small>
                                You think someone accessed your account
                            </small>
                        </div>
                    </button>

                    <button class="sc-option cyber-option" data-cyber="Cyberbullying">
                        <span>💬</span>
                        <div>
                            <strong>Cyberbullying</strong>
                            <small>
                                Harmful online behaviour
                            </small>
                        </div>
                    </button>

                    <button class="sc-option cyber-option" data-cyber="Impersonation">
                        <span>🪪</span>
                        <div>
                            <strong>Impersonation</strong>
                            <small>
                                Someone is pretending to be you
                            </small>
                        </div>
                    </button>

                    <button class="sc-option cyber-option" data-cyber="Security">
                        <span>🛡️</span>
                        <div>
                            <strong>Account Security</strong>
                            <small>
                                Improve your digital security
                            </small>
                        </div>
                    </button>

                </div>

            </div>
        `;

        dialog = overlay.querySelector(".sc-dialog");

        dialog.querySelector(".sc-close").onclick = closeModal;

        dialog.querySelectorAll(".cyber-option").forEach(function (button) {

            button.onclick = function () {

                showCyberGuide(
                    overlay,
                    button.dataset.cyber
                );

            };

        });
    }


    /* =====================================================
       CYBER GUIDANCE
    ===================================================== */

    function showCyberGuide(overlay, situation) {

        const guides = {

            "Suspicious Link": [
                "Don't open the link again.",
                "Do not enter passwords or personal information.",
                "Check the sender and message context.",
                "If you entered credentials, change the affected password.",
                "Report the message through the platform."
            ],

            "Scam": [
                "Stop communicating with the sender.",
                "Never share OTPs, passwords or banking details.",
                "Verify the organisation through its official website.",
                "Save relevant evidence.",
                "Report the scam through an appropriate official channel."
            ],

            "Hacked": [
                "Use the account provider's official recovery process.",
                "Change your password if you still have access.",
                "Enable two-factor authentication.",
                "Review recent login activity.",
                "Ask a trusted adult for help if needed."
            ],

            "Cyberbullying": [
                "Don't engage with abusive messages.",
                "Save evidence of the behaviour.",
                "Block or mute the person where appropriate.",
                "Report the behaviour on the platform.",
                "Talk to a trusted adult, teacher or counsellor."
            ],

            "Impersonation": [
                "Save evidence of the fake profile.",
                "Report the impersonating account.",
                "Tell friends not to interact with it.",
                "Secure your real accounts.",
                "Enable two-factor authentication."
            ],

            "Security": [
                "Use a unique password for important accounts.",
                "Enable two-factor authentication.",
                "Review active sessions and connected devices.",
                "Keep your phone and apps updated.",
                "Never share passwords or verification codes."
            ]

        };

        const titles = {
            "Suspicious Link": "Suspicious link?",
            "Scam": "Possible scam or phishing?",
            "Hacked": "Think your account was hacked?",
            "Cyberbullying": "Experiencing cyberbullying?",
            "Impersonation": "Someone is impersonating you?",
            "Security": "Improve your account security."
        };

        const dialog = overlay.querySelector(".sc-dialog");

        dialog.innerHTML = `
            <button class="sc-close">×</button>

            <div class="sc-icon">
                🛡️
            </div>

            <div class="sc-label">
                CYBER SAFETY GUIDE
            </div>

            <h2>
                ${titles[situation]}
            </h2>

            <p>
                Follow these steps to respond safely.
            </p>

            <div class="cyber-steps">

                ${guides[situation].map(function (step, index) {

                    return `
                        <div class="cyber-step">
                            <span>${index + 1}</span>
                            <p>${step}</p>
                        </div>
                    `;

                }).join("")}

            </div>

            <button id="cyber-done" class="sc-primary">
                Done
            </button>
        `;

        dialog.querySelector(".sc-close").onclick = closeModal;
        dialog.querySelector("#cyber-done").onclick = closeModal;
    }


    /* =====================================================
       BUTTON CONNECTIONS
    ===================================================== */

    document.querySelectorAll(
        ".sos-button, .nav-sos, #quick-sos, #final-sos"
    ).forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            openSOS();

        });

    });


    document.querySelectorAll(
        ".pillar-card.community a, #dashboard-community, #quick-community, #quick-help"
    ).forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            openCommunity();

        });

    });


    document.querySelectorAll(
        ".pillar-card.cyber a, #dashboard-cyber, #quick-cyber"
    ).forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            openCyberSafety();

        });

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =====================================================
       MODAL STYLES
    ===================================================== */

    function addStyles() {

        if (document.getElementById("safecircle-js-styles")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "safecircle-js-styles";

        style.textContent = `

            .sc-dialog {
                width: min(520px, 100%);
                max-height: 90vh;
                overflow-y: auto;
                background: #12090c;
                color: white;
                border: 1px solid rgba(220,40,70,0.35);
                border-radius: 24px;
                padding: 34px;
                box-shadow: 0 30px 100px rgba(0,0,0,0.7);
                position: relative;
            }

            .sc-close {
                position: absolute;
                top: 14px;
                right: 18px;
                background: transparent;
                border: none;
                color: #aaa;
                font-size: 30px;
                cursor: pointer;
            }

            .sc-icon,
            .sc-success {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                font-weight: 800;
            }

            .sc-icon {
                background: #c91f3d;
            }

            .sc-success {
                background: #218653;
                font-size: 28px;
            }

            .sc-label {
                color: #ef3656;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 2px;
                margin-bottom: 10px;
            }

            .sc-dialog h2 {
                font-size: 30px;
                margin: 0 0 12px;
            }

            .sc-dialog h2 span {
                color: #ef3656;
            }

            .sc-dialog p {
                color: #aaa;
                line-height: 1.6;
            }

            .sc-warning,
            .sc-note {
                margin: 20px 0;
                padding: 15px;
                border-radius: 12px;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.07);
            }

            .sc-warning strong {
                display: block;
                color: #ef3656;
                margin-bottom: 5px;
            }

            .sc-warning span {
                display: block;
                color: #888;
                font-size: 12px;
                line-height: 1.5;
            }

            .sc-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }

            .sc-primary,
            .sc-secondary {
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 700;
                font-size: 14px;
            }

            .sc-primary {
                border: none;
                background: #c91f3d;
                color: white;
            }

            .sc-secondary {
                border: 1px solid rgba(255,255,255,0.12);
                background: transparent;
                color: white;
            }

            .sc-options {
                display: grid;
                gap: 11px;
                margin-top: 20px;
            }

            .sc-option {
                width: 100%;
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 14px;
                text-align: left;
                border-radius: 13px;
                border: 1px solid rgba(255,255,255,0.09);
                background: rgba(255,255,255,0.035);
                color: white;
                cursor: pointer;
                transition: 0.2s ease;
            }

            .sc-option:hover {
                transform: translateX(4px);
                background: rgba(201,31,61,0.14);
                border-color: rgba(220,40,70,0.45);
            }

            .sc-option > span {
                font-size: 24px;
            }

            .sc-option strong {
                display: block;
                margin-bottom: 4px;
            }

            .sc-option small {
                display: block;
                color: #888;
            }

            .sc-info {
                margin: 20px 0;
                padding: 16px;
                border-radius: 14px;
                background: rgba(255,255,255,0.035);
            }

            .sc-info > div {
                display: flex;
                justify-content: space-between;
                gap: 15px;
                padding: 9px 0;
                border-bottom: 1px solid rgba(255,255,255,0.06);
            }

            .sc-info > div:last-child {
                border-bottom: none;
            }

            .sc-info span {
                color: #777;
            }

            .sc-active {
                color: #5ee59a;
                align-items: center;
            }

            .sc-active > span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #42d884;
                display: inline-block;
            }

            .sc-dialog label {
                display: block;
                margin: 15px 0 7px;
                color: #ccc;
                font-size: 13px;
            }

            .sc-dialog input,
            .sc-dialog textarea,
            .sc-dialog select {
                width: 100%;
                box-sizing: border-box;
                padding: 13px;
                border-radius: 10px;
                border: 1px solid rgba(255,255,255,0.1);
                background: #0c0809;
                color: white;
                outline: none;
            }

            .sc-dialog textarea {
                min-height: 100px;
                resize: vertical;
            }

            .cyber-steps {
                display: grid;
                gap: 10px;
                margin: 20px 0;
            }

            .cyber-step {
                display: flex;
                gap: 13px;
                align-items: flex-start;
                padding: 12px;
                border-radius: 11px;
                background: rgba(255,255,255,0.035);
            }

            .cyber-step > span {
                min-width: 27px;
                height: 27px;
                border-radius: 50%;
                background: #c91f3d;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .cyber-step p {
                margin: 3px 0;
                font-size: 13px;
            }

            @media (max-width: 600px) {

                .sc-dialog {
                    padding: 25px;
                }

                .sc-buttons {
                    flex-direction: column;
                }

                .sc-dialog h2 {
                    font-size: 25px;
                }

            }

        `;

        document.head.appendChild(style);
    }

});
