import React from "react";

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from "./ErrorBoundary.styles";

class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false
  };

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {}

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/Oqnene0.png"/>
          <ErrorImageText>
            Ups... Den her side er skrald.
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
