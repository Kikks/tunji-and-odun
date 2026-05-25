export const wedding = {
	couple: {
		one: "Tunji",
		two: "Odun"
	},
	dateISO: "2026-07-07T17:00:00+01:00",
	dateDisplay: {
		day: "07",
		month: "July",
		year: "2026"
	},
	invitationCopy:
		"We would like to invite you to celebrate with us the most special day of our lives. It would be an honour to have you present at this important moment.",
	venue: {
		name: "GLT Campground",
		address: "Alomaja, Idi Ayunre, Ibadan",
		time: "10:00 AM",
		mapEmbedUrl:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.60347143213!2d3.860704975614751!3d7.285875913833506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398f17970eb341%3A0x50c9dc383c19e88!2sGLT%20CAMP%20GROUND!5e0!3m2!1sen!2sng!4v1779670821848!5m2!1sen!2sng",
		mapLinkUrl: "https://maps.app.goo.gl/5NNrqEv3cJaHr3gy8"
	},
	menu: [
		{ title: "Appetisers", description: "Seasonal canapés and amuse-bouches." },
		{
			title: "Starter",
			description: "Chilled heirloom tomato gazpacho with basil oil."
		},
		{ title: "Main", description: "Pan-seared sea bass with saffron risotto." },
		{
			title: "Dessert",
			description: "Vanilla bean panna cotta with raspberry coulis."
		}
	],
	dressCode: {
		title: "Cocktail Attire",
		description:
			"We'd love to see you in your finest. Warm jewel tones are encouraged to match the evening's mood.",
		palette: ["#6B1E1E", "#C8A24B", "#2C3E2D", "#E8D5B7"]
	},
	registry: {
		message:
			"Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.",
		bank: "Moniepoint",
		accountName: "Olatunji Bright Olawale",
		accountNumber: "7030312013",
		signoff: "With all our love"
	},
	directions: {
		notes:
			"The venue is a 15-minute drive from the city centre. Parking is available on-site. Shuttle service will run from the main hotel at 4:30pm."
	},
	rsvpFormUrl: "https://forms.gle/JDbGMw9G3mGs7qCv9",
	thankYou: {
		heading: "Thank you",
		body: "We cannot wait to share this day with you."
	}
} as const;

export type WeddingConfig = typeof wedding;
