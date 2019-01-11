import React, { Component } from "react";
import axios from "axios";

import {
  Carousel,
  CarouselInner,
  CarouselItem,
  View,
  Container
} from "mdbreact";
class SelectedPropertyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPropId: this.props.propid,
      PropertyDetail: "",
      PropertyPhotos: []
    };
  }

  async componentDidMount() {
    var photos = [];
    console.log("this.state.currentPropId", this.state.currentPropId);
    axios
      .get(
        "http://localhost:3001/places/getListings/" + this.state.currentPropId
      )
      .then(async response => {
        this.setState({
          PropertyDetail: response.data[0]
        });
        console.log(JSON.stringify(response.data[0]));

        const data = { id: this.state.currentPropId };
        console.log("inside", this.state.currentPropId);

        axios
          .post("http://localhost:3001/getSelectedPropertyImg", data)
          .then(response => {
            // setTimeout(10000);

            console.log(JSON.stringify("response.data", response.data));
            console.log(
              "response dta length",
              JSON.stringify(response.data.results.length)
            );
            photos.push(response.data.results);
            console.log("photos inside", photos);
            this.setState({
              PropertyPhotos: photos[0]
            });
            console.log("response imagee", JSON.stringify(photos));
            console.log("photos.length", photos.length);
            console.log(
              "PropertyPhotos",
              JSON.stringify(this.state.PropertyPhotos.length)
            );
          });
      });
  }

  render() {
    let carousalBlock = this.state.PropertyPhotos.map(function(item, index) {
      return (
        <div
          className={index == 0 ? "carousel-item active" : "carousel-item"}
          key={index}
        >
          {console.log("item", item)}
          <img
            className=" carousel-img property-display-img"
            src={"data:image/png;base64," + item}
            alt="property-image"
          />
        </div>
      );
    });

    let carousalIndicator = this.state.PropertyPhotos.map(function(
      item,
      index
    ) {
      return (
        <li
          data-target="#myCarousel"
          data-slide-to={index}
          className={index == 0 ? "active" : ""}
          key={index}
        />
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div className="carousel-container">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <ul className="carousel-indicators">{carousalIndicator}</ul>

                <div className="carousel-inner">{carousalBlock}</div>

                <a
                  className="carousel-control-prev"
                  href="#myCarousel"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                </a>
                <a
                  className="carousel-control-next"
                  href="#myCarousel"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                </a>
              </div>
            </div>
            <div className="pdp-listing-headline-container gtPDPMovePropertyHeadlineBelowGalleryTst hidden-xs">
              <h1 className="listing-headline ">
                <span className="listing-headline-text">
                  {this.state.PropertyDetail.headline}
                </span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="booking-assistance">
              <strong>Book Online</strong> or call HomeAway Booking Assistance{" "}
              <span className="booking-phone">888-829-7076</span>
            </div>
            <div className="control-label quotebar-dates-label js-quotebarMessagingLabel form-group">
              Your dates are <strong>Available!</strong>
            </div>
            <div className="form-inline">
              <div className="left-date" data-toggle="label">
                <input
                  id="startDateInput"
                  type="text"
                  placeholder="Arrive"
                  className="form-control price-bar-control start-calendar"
                />
                <i className="icon-calendar form-control-feedback has-date" />
              </div>
              <div
                className="form-group has-feedback price-bar-form-group"
                data-toggle="label"
              >
                <input
                  id="endDateInput"
                  type="text"
                  placeholder="Depart"
                  className="form-control price-bar-control end-calendar"
                />
                <i className="icon-calendar form-control-feedback has-date" />
              </div>
            </div>
            <div className="quotebar-bg-container no-cta" />
            <button
              className="btn btn-book cta cta-primary btn-sm btn-primary "
              data-loading-text="Instant Quote"
            >
              <span>Request to Book</span>
            </button>
          </div>
        </div>
        <div className="listing-headline-container">
          <h1 className="listing-headline ">
            <span className="listing-headline-text">
              {this.state.PropertyDetail.description}
            </span>
          </h1>
        </div>
        <hr />
        <div className="item">
          <i className="home icon">
            Type &nbsp;&nbsp;
            {this.state.PropertyDetail.houseType}{" "}
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i className="bed icon">
            {" "}
            Bed &nbsp;&nbsp;
            {this.state.PropertyDetail.bed}
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i className="users icon">
            {" "}
            Sleeps &nbsp;&nbsp;
            {this.state.PropertyDetail.capacity}{" "}
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i className="bath icon">
            {" "}
            Bath &nbsp;&nbsp; {this.state.PropertyDetail.bath}
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i className="moon icon">
            {" "}
            MinStay&nbsp;&nbsp; {this.state.PropertyDetail.minStay}
          </i>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className="row">
          <div className="col-sm-2">
            <div className="summary-subtitle summary-subtitle--description">
              About the property
            </div>
          </div>
          <div
            className="property-description-wrapper  col-sm-10"
            data-overlay-id="property-description-wrapper-loader"
          >
            <div className="property-description js-summarySection ">
              <h3>{this.state.PropertyDetail.headline}</h3>
              <div className="prop-desc-txt">
                <div className="preview">
                  <p>{this.state.PropertyDetail.description}</p>
                </div>
                <div className="js-descriptionCollapse collapse">
                  <p>
                    Unit:
                    {this.state.PropertyDetail.unit}
                  </p>
                  <p>zip: {this.state.PropertyDetail.zip}</p>
                  <p />
                  <p />
                  <p />
                  <p>
                    Prices are subject to change unless confirmed in writing.
                  </p>
                  <p>
                    Minimum of {this.state.PropertyDetail.minStay} nights,
                    {this.state.PropertyDetail.minStay}
                    nights for holiday weekends, plus a cleaning fee of up to
                    10% or $50. minimum per stay and 50% of rent due when
                    reservations are made and balance of rent due 30 days before
                    arrival at the guest unit, via checks or money order. Credit
                    card payments via paypal (+3.5% processing fee){" "}
                  </p>
                  <p>
                    Cancellation Policy: 30 days' advance written notice; No
                    refunds on any cancellation within 30 days of arrival date.
                    No refund for shortened stays, early departures, or last
                    minute cancellations.{" "}
                  </p>
                  <p>
                    No smoking - no pets - no partying are allowed on the
                    premises{" "}
                  </p>
                  <p>
                    Please state the exact arrival &amp; departure dates and the
                    number of adults / children in your email inquiry.
                  </p>
                </div>
              </div>
              <a
                data-toggle="collapse"
                className="js-descriptionCollapseText"
                data-target=".js-descriptionCollapse"
                href="javascript:;"
              >
                More Details
              </a>
              <div className="unit-description">
                <strong>Registration Number : </strong>
                Long-Term Only
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedPropertyDetail;
