import React from 'react';

const AboutUs = () => {
  const shadowStyle = {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s',
  };

  return (
    <div className="container mt-5 p-4 rounded" style={{ ...shadowStyle, background: '#f8f9fa' }}>
      <div className="row">
        <div className="col-lg-6">
          <h2 className="mb-4">About Us</h2>
          <p>
            Welcome to <span style={{ color: '#f72585' }}>OurEventMagic</span>! We are a passionate team of event specialists committed to turning your special moments into unforgettable experiences.
          </p>
          <p>
            Our mission is simple: to make your events <span style={{ color: '#f72585' }}>extraordinary</span> and <span style={{ color: '#7209b7' }}>stress-free</span>. We offer a wide range of services to cater to your every need:
          </p>
          <ul>
            <li>Stunning <span style={{ color: '#40916c' }}>venue bookings</span> in dream locations.</li>
            <li>Exquisite <span style={{ color: '#7209b7' }}>catering</span> services to delight your guests.</li>
            <li>Exceptional <span style={{ color: '#f72585' }}>DJ</span> services to keep the party alive.</li>
            <li>Professional <span style={{ color: '#40916c' }}>photography</span> to capture every moment beautifully.</li>
          </ul>
          <p>
            We take pride in our attention to detail, customer-centric approach, and commitment to excellence. Your <span style={{ color: '#40916c' }}>satisfaction</span> is our top priority, and we're dedicated to bringing your vision to life.
          </p>
          <p>
            Ready to make your event magical? <a href="/contactus" className="btn btn-primary">Contact Us</a>
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us"
            className="img-fluid rounded"
            style={{ ...shadowStyle, transition: 'transform 0.3s', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="mt-5">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="question1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#answer1" aria-expanded="true" aria-controls="answer1" >
                Question 1: What is Lorem Ipsum?
              </button>
            </h2>
            <div id="answer1" className="accordion-collapse collapse show" aria-labelledby="question1" >
              <div className="accordion-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="question2">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#answer2" aria-expanded="false" aria-controls="answer2" >
                Question 2: Where does it come from?
              </button>
            </h2>
            <div id="answer2" className="accordion-collapse collapse" aria-labelledby="question2" >
              <div className="accordion-body">
                Contrary to popular belief, Lorem Ipsum is not simply random text.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="question3">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#answer3" aria-expanded="false" aria-controls="answer3" >
                Question 3: How can I customize my event package?
              </button>
            </h2>
            <div id="answer3" className="accordion-collapse collapse" aria-labelledby="question3" >
              <div className="accordion-body">
                Yes, we understand that every event is unique. We offer customizable packages to suit your specific requirements. Contact us to discuss your preferences and create a personalized package.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="question4">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#answer4" aria-expanded="false" aria-controls="answer4" >
                Question 4: What sets OurEventMagic apart from others?
              </button>
            </h2>
            <div id="answer4" className="accordion-collapse collapse" aria-labelledby="question4" >
              <div className="accordion-body">
                At OurEventMagic, we prioritize your satisfaction and the success of your event. Our team of professionals is dedicated to delivering top-notch services, attention to detail, and a commitment to excellence. We stand out because we care about making your event truly magical.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="question5">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#answer5" aria-expanded="false" aria-controls="answer5" >
                Question 5: Can you make my event unique and special?
              </button>
            </h2>
            <div id="answer5" className="accordion-collapse collapse" aria-labelledby="question5" >
              <div className="accordion-body">
                We go above and beyond to make your special moments truly magical. Our team of experienced professionals works tirelessly to ensure that every detail is perfect and that your event runs smoothly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
