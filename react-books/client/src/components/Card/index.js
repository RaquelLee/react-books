import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Card({ children }) {
	return (
		<div className="card" style="width: 18rem;">
			<img src={children} class="card-img-top" alt={children}></img>
			<div className="card-body">
				<h5 className="card-title">{children}</h5>
				<p class="card-text">{children}</p>
			</div>
			<div class="card-body">
				{children}
			</div>
		</div>
	);
}

export default Card;



