import "./styles.css";
import React from "react";
import ReactCardFlip from "react-card-flip";

const dummyElement = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);

const ServiceContainer = dummyElement;
const ServiceCards = dummyElement;
const ServiceCard = dummyElement;
const ServiceTitle = dummyElement;

export default class index extends React.Component {
  constructor() {
    super();
    this.state = {
      flipped: new Set()
    };
  }

  handleClick(id) {
    return (e) => {
      e.preventDefault();
      let flipped = new Set(this.state.flipped);
      if (flipped.has(id)) {
        flipped.delete(id);
      } else {
        flipped.add(id);
      }
      this.setState({ flipped });
    };
  }

  render() {
    return (
      <ServiceContainer>
        <ServiceCards>
          <ReactCardFlip
            isFlipped={this.state.flipped.has(1)}
            flipDirection="vertical"
          >
            {/* FRONTSIDE */}
            <ServiceCard onClick={this.handleClick(1)}>
              <ServiceTitle>Frontside</ServiceTitle>
            </ServiceCard>
            {/* BACKSIDE */}
            <ServiceCard onClick={this.handleClick(1)}>
              <ServiceTitle>Backside</ServiceTitle>
            </ServiceCard>
          </ReactCardFlip>

          <ReactCardFlip
            isFlipped={this.state.flipped.has(2)}
            flipDirection="vertical"
          >
            {/* FRONTSIDE */}
            <ServiceCard onClick={this.handleClick(2)}>
              <ServiceTitle>Frontside</ServiceTitle>
            </ServiceCard>
            {/* BACKSIDE */}
            <ServiceCard onClick={this.handleClick(2)}>
              <ServiceTitle>Backside</ServiceTitle>
            </ServiceCard>
          </ReactCardFlip>
        </ServiceCards>
      </ServiceContainer>
    );
  }
}
