export const wedding = {
  couple: {
    one: "Tunji",
    two: "Odun",
  },
  dateISO: "2026-07-07T17:00:00+01:00",
  dateDisplay: {
    day: "07",
    month: "July",
    year: "2026",
  },
  invitationCopy:
    "We would like to invite you to celebrate with us the most special day of our lives. It would be an honour to have you present at this important moment.",
  venue: {
    name: "GLT Campground",
    address: "Alomaja, Idi Ayunre, Ibadan",
    time: "10:00 AM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVenue!5e0!3m2!1sen!2sus!4v0!5m2!1sen!2sus",
    mapLinkUrl: "https://maps.google.com",
  },
  menu: [
    { title: "Appetisers", description: "Seasonal canapés and amuse-bouches." },
    { title: "Starter", description: "Chilled heirloom tomato gazpacho with basil oil." },
    { title: "Main", description: "Pan-seared sea bass with saffron risotto." },
    { title: "Dessert", description: "Vanilla bean panna cotta with raspberry coulis." },
  ],
  dressCode: {
    title: "Cocktail Attire",
    description:
      "We'd love to see you in your finest. Warm jewel tones are encouraged to match the evening's mood.",
    palette: ["#6B1E1E", "#C8A24B", "#2C3E2D", "#E8D5B7"],
  },
  registry: {
    message:
      "Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.",
    accountHolder: "TUNJI & ODUN",
    iban: "ES00 0000 0000 0000 0000 0000",
    reference: "Tunji & Odun Wedding",
    signoff: "With all our love",
  },
  directions: {
    notes:
      "The venue is a 15-minute drive from the city centre. Parking is available on-site. Shuttle service will run from the main hotel at 4:30pm.",
  },
  rsvpFormUrl: "https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/viewform",
  thankYou: {
    heading: "Thank you",
    body: "We cannot wait to share this day with you.",
  },
} as const;

export type WeddingConfig = typeof wedding;
