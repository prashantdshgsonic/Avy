import React, { useState } from "react";
import s from "./LandingForm.module.css";
import ReactFlagsSelected from "react-flags-select";
import womenLanding from "../../assets/images/WomenLanding.png";
import divider from '../../assets/images/dividerTop.png'
function LandingForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  return (
    <div className={s.formWrapper}>
      <img src={divider} alt="divider" className={s.dividerTop} />
      <div className={s.formContainer}>
        <img src={womenLanding} alt="women" />
        <div className={s.formInfo}>
          <h2>Request a demo</h2>
          <p>
            A new way of learning, engaging and fun. Behavioral game mechanics
            designed to improve course completions. Progressive rewards and
            redemption. Book a call with us and we will take you through a demo.
          </p>
          <form>
            <div className={s.landingInputs}>
              <input
                type="text"
                placeholder="Name"
                className={s.inputLanding}
              />
              <input
                type="text"
                placeholder="Company Name"
                className={s.inputLanding}
              />
              <input
                type="email"
                placeholder="Email"
                className={s.inputLanding}
              />
              <input
                type="tel"
                placeholder="Phone"
                className={s.inputLanding}
              />
              <div className={s.countryInput}>
                <ReactFlagsSelected
                  selected={selectedCountry}
                  onSelect={(code) => setSelectedCountry(code)}
                ></ReactFlagsSelected>
              </div>

              <input
                type="text"
                placeholder="Employee size"
                className={s.inputLanding}
              />
            </div>
            <textarea
              className={s.formMessage}
              placeholder="Message"
            ></textarea>
            <button className={s.formButton}>Book a demo</button>
          </form>
        </div>
      </div>
      <img src={divider} alt="divider" className={s.dividerBottom} />
    </div>
  );
}

export default LandingForm;
