import React from "react";

const logo = "https://scontent.find2-1.fna.fbcdn.net/v/t1.0-9/120047607_2681038168827463_1520712113747932418_n.jpg?_nc_cat=107&_nc_sid=730e14&_nc_ohc=2ELZVD0bQWkAX96Tszc&_nc_ht=scontent.find2-1.fna&oh=dba255d4c23e4c421d79904a40e5ae3f&oe=5F8EF27D";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">rentnoww</h1>
  </div>
);

export default Hero;
