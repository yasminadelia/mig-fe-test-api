
export const parseDate = (strDate) => {
    const date = new Date(strDate).toLocaleDateString("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});
	const time = new Date(strDate).toLocaleTimeString();

	return `${date} ${time}`;
}