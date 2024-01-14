import React, { Component } from "react";
import Slider from "react-slick";
import { BASE_URL } from "../../services/helper";
import { Button } from "reactstrap";

export default class PauseOnHover extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      centerMode: true, // Center the active slide
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <div className="px-5 pt-5" style={{backgroundColor:'#000', color:'#fff'}}>
        
        <Slider className="px-5 pt-5" style={{width:'100%'}} {...settings}>
          <div>
            <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
          <div>
          <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
          <div>
          <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
          <div>
          <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
          <div>
          <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
          <div>
          <img style={{height:'250px', width:'250px'}} src={BASE_URL+"/games/image/banner.jpg"} />
          </div>
        </Slider>

        <div className="text-end pb-3">
        <Button className="mt-5 btn btn-success">View ALL</Button>
        </div>
        
        
      </div>
    );
  }
}