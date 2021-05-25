import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
	return (
		<span className="btn btn-success" {...props} role="button" tabIndex="0">
			★
		</span>
	);
}

export default SaveBtn;
