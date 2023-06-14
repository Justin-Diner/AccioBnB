export const calculateRating = (rating) => {
	if (rating) {
	return rating % 1 === 0 ? rating.toFixed(1) : rating.toFixed(2);
	} 
}

export const capitalizeFirstLetter = (word) => {
	let newAnswer = "";

		if (word.length) {
		let firstLetter = word[0].toUpperCase();
		let restOfWord = word.slice(1);
		newAnswer = firstLetter + restOfWord;
	}
	return newAnswer;
	
}