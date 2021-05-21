import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import MatchCategories from "./modules/views/MatchCategories";
import QuestionsHero from "./modules/views/QuestionsHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import Newsletter from "./modules/views/Newsletter";
import AppAppBar from "./modules/views/AppAppBar";
import AvailableMatches from "./modules/views/AvailableMatches";
import Teams from "./modules/views/Teams";

class Home extends React.Component {
  state = {
    matches: [],
    currentLocation: {
      lat: "",
      lon: "",
    },
  };

  componentDidMount() {
    fetch(
      "http://api.ipstack.com/check?access_key=8f0af5c4d95ea86b0ae3944323331ad0",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.setState({
          currentLocation: {
            lat: res.latitude,
            lon: res.longitude,
          },
        });
      })
      .catch((err) => console.error("Problem fetching my IP", err))
      .then((res) => {
        fetch("http://35.163.180.234/api/match/match_cards/", {
          method: "GET",
          headers: {
            lat: this.state.currentLocation.lat,
            lon: this.state.currentLocation.lon,
            dist: "150",
          },
        })
          .then((resp) => resp.json())
          .then((res) => {
            this.setState({ matches: res.result });
          })
          .then((res) => {
            if (this.state.matches.length === 0) {
              fetch("http://35.163.180.234/api/match/match_cards/", {
                method: "GET",
                headers: {
                  lat: this.state.currentLocation.lat,
                  lon: this.state.currentLocation.lon,
                  dist: "10000",
                },
              })
                .then((resp) => resp.json())
                .then((res) => {
                  this.setState({ matches: res.result });
                });
            }
          })
          .catch((error) => alert(error));
      });
  }

  render() {
    return (
      <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <AvailableMatches matches={this.state.matches} />
        <div id="section">
          <MatchCategories />
        </div>
        <ProductHowItWorks />
        <Teams />
        <Newsletter />
        <QuestionsHero />
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRoot(Home);
