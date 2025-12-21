export default function ContactPage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>Contact Us</h1>

      <p>If you need help, reach us directly:</p>

      <ul>
        <li>
          WhatsApp:{" "}
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank">
            Chat on WhatsApp
          </a>
        </li>
        <li>Email: support@chumungclothing.com</li>
      </ul>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#6b6b6b" }}>
        We usually respond within 24 hours.
      </p>
    </main>
  );
}
