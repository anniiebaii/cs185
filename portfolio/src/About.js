import React from 'react';
import './style.css';

function About() {
  return (
      <div className="page-container">
      {/* ADD ONCLICK */}
          <button id="back-to-top" title="Go to top">^</button>
          <script>
            {/*
            //Get the button
            var mybutton = document.getElementById("back-to-top");
            window.onscroll = function() {scrollFunction()};
            */}
          </script>
          <h2 className="subheader">About Me</h2>
          <img className="image" src={require('./images/Me.JPG')} alt="Me"></img>
          <p className="text-body">
          My name is Annie Bai and I'm a fourth year Computer Science major in the UCSB College of Engineering.
          I will be graduating in June 2020 with a Bachelor of Science degree in Computer Science.
          After graduation, I am excited to know that I will be joining Ontraport's Backend Engineering Team as a Junior Backend Engineer!</p>
          <h3 className="subheader_1">Career</h3>
          <p className="text-body">
          I have two years of industry experience from my backend engineering internship with Ontraport.
          My career interests include software engineering, with an emphasis on web security and web development.
          You can find more about my skillset and previous experiences in my <a href="files/Resume.pdf">resume</a>. </p>
      </div>


  );
}

export default About;
