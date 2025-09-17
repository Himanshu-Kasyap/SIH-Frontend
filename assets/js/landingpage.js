  const questions = document.querySelectorAll(".faq-question");
    questions.forEach(q => {
      q.addEventListener("click", () => {
        q.classList.toggle("active");
        const answer = q.nextElementSibling;
        answer.classList.toggle("open");
        const icon = q.querySelector('.faq-icon');
        const minus = q.querySelector('.faq-minus');
        if(q.classList.contains('active')) {
          icon.style.display = 'none';
          minus.style.display = 'inline-block';
        } else {
          icon.style.display = 'inline-block';
          minus.style.display = 'none';
        }
      });
    });
