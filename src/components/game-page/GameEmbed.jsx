import React from "react";

const GameEmbed = () => {
  return (
    <div>
      <React.Fragment>
        <iframe
          title="Your Game"
          src="../../games/kingsandpigs/index.html"  // Update this path to the location of your HTML5 game
          width="800"  // Set the width to the desired value
          height="600"  // Set the height to the desired value
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </React.Fragment>
    </div>
  );
};

export default GameEmbed;