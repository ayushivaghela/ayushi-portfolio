document.addEventListener('DOMContentLoaded', () => {
  const typedTextSpan = document.getElementById('typed-text');
  
  if (typedTextSpan) {
    const textArray = ["Strategic Operations Professional", "Alumni Engagement Officer", "Medical Biosciences Graduate", "Data Translator"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } 
      else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } 
      else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
      }
    }

    setTimeout(type, newTextDelay);
  }
});
