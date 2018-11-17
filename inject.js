function getDocuments(win = window) {
    if (!win.frames.length) {
        try {
            return [win.document];
        } catch (error) {
            // IFrame cross-origin bullshit
            if (error.name === 'SecurityError' && error.code === 18) {
                return [];
            } else {
                throw error;
            }
        }
    }
    return [win.document, ...Array.from(win.frames).flatMap(getDocuments)];
}
function createDarkMode() {
    const docs = getDocuments();
    const darkMode = {
        elements: new Array(docs.length).fill().map(() => document.createElement('style')),
        active: false,
    };
    docs.forEach((doc, i) => doc.body.appendChild(darkMode.elements[i]));
    return darkMode;
}
if (!window.darkMode) {
    const darkMode = createDarkMode();
    darkMode.elements.forEach(s =>
        s.sheet.insertRule(
            '* { color: white !important; background-color: black !important; font-size: 20px !important; }'
        )
    );
    window.darkMode = darkMode;
} else {
    window.darkMode.elements.forEach(s => {
        s.sheet.deleteRule(0);
        s.parentElement.removeChild(s);
    });
    delete window.darkMode;
}
