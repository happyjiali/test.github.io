     window.alreadyProcessedMarkdeep || (document.body.onload = () => {
         markdeepOptions = { tocStyle: 'medium', toc: true };
         window.processMarkdeep && processMarkdeep();
     }, window.alreadyProcessedMarkdeep = true);