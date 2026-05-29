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
		name: "GLT Ife Auditorium",
		address: "Opposite Diganga Anex, Ile-Ife, Osun state",
		time: "10:00 AM",
		mapEmbedUrl:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.721016204566!2d4.516799975615648!3d7.496022311097267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103837d604e13543%3A0xb8706988e61eb305!2sGod&#39;s%20Love%20Tabernacle%20International%20Church%2C%20Ile-Ife!5e0!3m2!1sen!2suk!4v1780078559901!5m2!1sen!2suk",
		mapLinkUrl: "https://maps.app.goo.gl/7NPAvmbAA3WGYRH47"
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
