function createDarkMode() {
    const docs = [document];
    const darkMode = {
        elements: new Array(docs.length).fill().map(() => document.createElement('style')),
    };
    docs.forEach((doc, i) => doc.body.appendChild(darkMode.elements[i]));
    return darkMode;
}

function startDarkMode() {
    delete window.darkMode;
    const darkMode = createDarkMode();
    darkMode.elements.forEach(s =>
        s.sheet.insertRule(
            '* { color: white !important; background-color: black !important; font-size: 20px !important; }'
        )
    );
    window.darkMode = darkMode;
}

function stopDarkMode() {
    window.darkMode.elements.forEach(s => {
        s.sheet.deleteRule(0);
        s.parentElement.removeChild(s);
    });
    delete window.darkMode;
}

function toggleDarkMode() {
    if (!window.darkMode) {
        startDarkMode();
    } else {
        stopDarkMode();
    }
}

window.addEventListener(
    'message',
    function(event) {
        // We only accept messages from ourselves
        if (event.source !== window || !event.data.type) return;

        switch(event.data.type) {
            case 'TOGGLE_DARK_MODE': toggleDarkMode();
        }
    },
    false
);
