function Contact() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>📩 Contact Us</h1>
        <p>Have a question about space? Send us a message.</p>
      </div>
      <div className="col-md-6 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your name"
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
        />
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Enter your message"
        ></textarea>
        <button className="btn btn-primary w-100">Send Message</button>
      </div>
    </div>
  );
}
export default Contact;
