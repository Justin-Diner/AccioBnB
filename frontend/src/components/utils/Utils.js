export const calculateRating = (rating) => {
	return rating % 1 === 0 ? rating.toFixed(1) : rating.toFixed(2);
}