// =============== send emailjs ==================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("VTXcwdOQSIsNfvX84");

  const form = document.getElementById("emailForm");
  const status = document.getElementById("status");
  const button = document.getElementById("sendBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phonenumber");
  const subjectInput = document.getElementById("emailsubject");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    button.disabled = true;
    spinner.style.display = "inline-block";
    btnText.innerText = "Sending...";
    status.innerText = "";
    status.style.color = "";

    emailjs
      .send("service_00emrq7", "template_eweqn7l", {
        from_name: nameInput.value,
        from_email: emailInput.value,
        phone: phoneInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
        message_html: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
      <div style="background:#fff; padding:20px; border-radius:10px; max-width:600px; margin:auto;">
        <h2 style="color:#333;">Welcome to Our Service!</h2>
        <p>Hi ${nameInput.value},</p>
        <p>Thank you for contacting us. We’re excited to help you get started.</p>
        <a href="https://example.com" style="display:inline-block; background-color:#007BFF; color:#fff; text-decoration:none; padding:10px 20px; border-radius:5px;">
          Get Started
        </a>
        <p style="font-size:12px; color:#999; margin-top:20px;">© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  `,
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          status.style.cssText =
            "font-size: 20px; text-align: center; color: green;";
          status.innerText = "Email sent successfully!";
          form.reset();
        },
        function (error) {
          console.log("FAILED...", error);
          status.innerText = "Error: " + (error.text || "Failed to send email");
          status.style.color = "red";
        }
      )
      .finally(function () {
        button.disabled = false;
        spinner.style.display = "none";
        btnText.innerText = "Send Message";
      });
  });
});
