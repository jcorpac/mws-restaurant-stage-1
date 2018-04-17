if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
            // Registration was successful
            console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
        }, error => {
            // Registration failed
            console.log(`ServiceWorker registration failed: ${error}`);
        });
    });
}