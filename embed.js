const desktopPath = "desktop/index.html";
const mobilePath = "mobile/index.html";

const mobileMaxWidth = 960.0;

var isMobile = false;

const updateEmbed = () => {
	// if mobile
	if (!isMobile && document.body.clientWidth < mobileMaxWidth) {
		isMobile = true;
		document
			.getElementById("embedded-index")
			.setAttribute("src", mobilePath);
	}
	if (isMobile && document.body.clientWidth >= mobileMaxWidth) {
		isMobile = false;
		document
			.getElementById("embedded-index")
			.setAttribute("src", desktopPath);
	}
};

updateEmbed();
window.onresize = () => updateEmbed();
