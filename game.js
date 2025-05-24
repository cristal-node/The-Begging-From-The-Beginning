// =================================================================
// GAME STATE VARIABLES
// =================================================================
let money = 0;
let respect = 0;
let gameEnded = false;
let maxUnlockedPlayerTier = 1;

const impactfulEvents = [
	{
		text: "A kind aunty gives you an old saree. It's not money, but it's warm.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "You find a slightly-used 10 Taka note on the ground! Lucky day!",
		effect: { money: 10, respect: 0 },
	},
	{
		text: "You share your food with a stray dog. Another beggar sees this and nods.",
		effect: { money: 0, respect: 5 },
	},
	{
		text: "A security guard shoos you away from the front of a fancy hotel.",
		effect: { money: 0, respect: -2 },
	},
	{
		text: "You are caught telling a fake story! Someone calls you out. Humiliating.",
		effect: { money: -20, respect: -5 },
	},
	{
		text: "It starts raining. People are more generous! You get a bonus <b>+[bonus]</b> Taka.",
		effect: { money: 25, respect: 1 },
	},
	{
		text: "You help an old man cross the street. He blesses you.",
		effect: { money: 0, respect: 10 },
	},
	{
		text: "A rickshaw driver tosses you <b>৳5</b> for holding his spot in line.",
		effect: { money: 5, respect: 1 },
	},
	{
		text: "You sing a Bollywood tune off-key, but a kid drops <b>৳10</b> in your bowl.",
		effect: { money: 10, respect: 1 },
	},
	{
		text: "A shopkeeper mistakes you for a customer and gives you change—<b>৳20</b>!",
		effect: { money: 20, respect: 0 },
	},
	{
		text: "You hold a parking spot for a shiny car. Driver slips you <b>৳15</b>.",
		effect: { money: 15, respect: 1 },
	},
	{
		text: "A street performer shares <b>৳10</b> from his crowd after you cheer loudly.",
		effect: { money: 10, respect: 2 },
	},
	{
		text: "You tell a sob story about a lost job to a chai vendor. He gives <b>৳8</b>.",
		effect: { money: 8, respect: 1 },
	},
	{
		text: 'A tourist snaps your photo and hands you <b>৳50</b> to "keep it real."',
		effect: { money: 50, respect: 0 },
	},
	{
		text: "You juggle some mangoes for laughs. Passersby toss <b>৳12</b> your way.",
		effect: { money: 12, respect: 2 },
	},
	{
		text: "A wedding procession passes by, and a guest throws <b>৳25</b> in celebration.",
		effect: { money: 25, respect: 1 },
	},
	{
		text: "You point a lost biker to the right alley. He gives you <b>৳10</b> for the help.",
		effect: { money: 10, respect: 2 },
	},
	{
		text: "A fruit vendor pays you <b>৳7</b> to watch his cart during a quick break.",
		effect: { money: 7, respect: 1 },
	},
	{
		text: 'You sell a shiny pebble as a "lucky charm" to a gullible teen for <b>৳15</b>.',
		effect: { money: 15, respect: 0 },
	},
	{
		text: "A festival stall gives you a free jilapi. Sweet win for the day!",
		effect: { money: 0, respect: 2 },
	},
	{
		text: "A kind bhabi hands you a half-eaten paratha. It’s still warm!",
		effect: { money: 0, respect: 3 },
	},
	{
		text: "You find a torn lungi in a dumpster. It’s patchy but keeps you cozy.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A street tailor gives you an old cap to shield you from the sun.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A kid trades you a plastic water bottle for a smile. Useful for later!",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "You snag a cracked plastic chair from a chai stall’s trash. Comfy seat!",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A vegetable seller tosses you a bruised mango. Tastes sweet anyway.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A barber gives you a free trim. You’re looking sharp for begging!",
		effect: { money: 0, respect: 2 },
	},
	{
		text: "You grab a discarded umbrella before the monsoon hits. Dry for now!",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A bakery tosses you a stale roti. It’s tough but fills your belly.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A street artist sketches your face and gives it to you. Frame-worthy!",
		effect: { money: 0, respect: 2 },
	},
	{
		text: "A street cat curls up next to you. It’s nice to have company.",
		effect: { money: 0, respect: 2 },
	},
	{
		text: "A stranger thinks you’re a holy man and bows. No cash, but respect +10!",
		effect: { money: 0, respect: 10 },
	},
	{
		text: "A stray dog steals your bread. Now you’re hungrier than ever. Lost <b>৳2</b>.",
		effect: { money: -2, respect: -1 },
	},
	{
		text: "You trip in a pothole and lose <b>৳3</b> from your pocket. Damn!",
		effect: { money: -3, respect: -1 },
	},
	{
		text: "A shop owner yells at you for loitering. You move to a worse spot. Respect -1.",
		effect: { money: 0, respect: -1 },
	},
	{
		text: "Your begging bowl cracks when a kid kicks it. Gotta find a new one. Respect -1.",
		effect: { money: -1, respect: -1 },
	},
	{
		text: "A rickshaw splashes mud on you. Now you look even rougher. Respect -1.",
		effect: { money: 0, respect: -1 },
	},
	{
		text: 'A cop confiscates your "lucky" stick. There goes your prop! Respect -2.',
		effect: { money: 0, respect: -2 },
	},
	{
		text: "You get caught in a crowd and lose track of a generous donor.",
		effect: { money: -5, respect: 0 },
	},
	{
		text: "A rival beggar takes your prime corner spot. Tough competition! Respect -2.",
		effect: { money: 0, respect: -2 },
	},
	{
		text: "Your tattered shirt rips more. Time to find some thread. Respect -1.",
		effect: { money: 0, respect: -1 },
	},
	{
		text: "A fruit cart blocks your begging spot. No one sees you now.",
		effect: { money: -2, respect: 0 },
	},
	{
		text: "You accidentally offend a passerby with your plea. They walk away. Respect -1.",
		effect: { money: 0, respect: -1 },
	},
	{
		text: "A sudden gust blows your <b>৳5</b> note into a drain. Bad luck!",
		effect: { money: -5, respect: -1 },
	},
	{
		text: "You find a single sandal on the road. One foot’s better than none!",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "A bus driver hands you a torn bus ticket. Maybe it’s a collector’s item?",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "You overhear a spicy gossip about a local politician. Juicy!",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "A kid stares at you like you’re a movie star. Fame, but no cash.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "You watch a street magician’s trick. Mind blown, pockets empty.",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "A crow drops a shiny bottle cap near you. Worthless but cool.",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "You hum a tune and a passerby nods along. No money, just vibes.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A streetlight flickers above you. Feels like a movie scene.",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "You find a shady tree to rest under. Beats the scorching sun.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "A kid asks for your life story. You tell it, but they just listen.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "You spot a colorful kite stuck in a tree. Pretty, but out of reach.",
		effect: { money: 0, respect: 0 },
	},
	{
		text: "A vendor teaches you a new slang word. You sound cooler now.",
		effect: { money: 0, respect: 1 },
	},
	{
		text: "You watch ants march in a line. Nature’s got its own hustle.",
		effect: { money: 0, respect: 0 },
	},
];

const upgrades = {
	// This includes your image paths and rebalanced numbers
	hireFriend: {
		name: "Hire a Friend",
		description: "Two people can beg more than one. Each new friend is slightly better!",
		level: 0,
		baseCost: 20,
		power: 2,
		powerIncrement: 0.25,
		type: "click",
		requires: 0,
		tier: 1,
		imageUrl: [
			"images/Beggar1-sprite.png",
			"images/beggar2-sprite.png",
			"images/beggar11-sprite.png",
			"images/beggar4-sprite.png",
			"images/beggar5-sprite.png",
			"images/beggar6-sprite.png",
			"images/beggar7-sprite.png",
			"images/beggar8-sprite.png",
			"images/beggar9-sprite.png",
			"images/beggar10-sprite.png",
		],
		storeIconUrl: [
			"images/beggar1.jpg",
			"images/beggar2.jpg",
			"images/beggar11-sprite.png",
			"images/beggar4-sprite.png",
			"images/beggar5-sprite.png",
			"images/beggar6-sprite.png",
			"images/beggar7-sprite.png",
			"images/beggar8-sprite.png",
			"images/beggar9-sprite.png",
			"images/beggar10-sprite.png",
		],
	},
	sadDog: {
		name: "Beg with a Sad Dog",
		description: "Everyone feels for a hungry dog. Each new dog is a bit more effective!",
		level: 0,
		baseCost: 75,
		power: 1,
		powerIncrement: 0.15,
		type: "idle",
		requires: 50,
		tier: 1,
		imageUrl: ["images/dog1_sprite.png", "images/dog2_sprite.png"],
		storeIconUrl: [
			"images/dog11.jpg",
			"images/dog2.jpg",
			"images/dog3.jpg",
			"images/dog4.jpg",
			"images/dog5.jpg",
			"images/dog6.jpg",
			"images/dog7.jpg",
			"images/dog8.jpg",
			"images/dog9.webp",
		],
	},
	fakeLimp: {
		name: "Fake a Broken Leg",
		description: "A convincing limp makes people give more. +30% click boost.",
		level: 0,
		baseCost: 1000,
		power: 0.3,
		type: "click_percent",
		requires: 150,
		tier: 1,
		storeIconUrl: "images/brokenleg.webp",
		statusIconUrl: "images/leginjury.png",
	},
	shareDailyEarnings: {
		name: "Share Food with Others",
		description: "Show generosity. Each level is a more respected act!",
		level: 0,
		baseCost: 250,
		power: 0.1,
		powerIncrement: 0.1,
		type: "respect_per_second",
		requires: 100,
		tier: 1,
		storeIconUrl: "images/respect.png",
	},
	fakeMedicalPapers: {
		name: "Fake Medical Papers",
		description: "Show 'proof' of a serious illness for +50% click boost.",
		level: 0,
		baseCost: 5000,
		power: 0.5,
		type: "click_percent",
		requires: 750,
		tier: 2,
		storeIconUrl: "images/certificate.png",
		statusIconUrl: "images/certificate.png",
	},
	hireCryingChild: {
		name: "Hire a Crying Child",
		description: "Rent a child for the day. Very effective in busy markets.",
		level: 0,
		baseCost: 2000,
		power: 50,
		type: "idle",
		requires: 900,
		tier: 2,
		imageUrl: ["images/babyboy.png", "images/babygirl.png"],
		storeIconUrl: ["images/babyboy.png", "images/babygirl.png"],
		statusIconUrl: "images/babyboy.png",
	},
	hostStreetFeast: {
		name: "Host a Street Feast",
		description: "Feed dozens of fellow beggars. Costs ৳2000. Gains 100 Respect.",
		level: 0,
		baseCost: 5000,
		power: 100,
		type: "action_respect_boost",
		requires: 1500,
		tier: 2,
		storeIconUrl: "images/feast.jpg",
		statusIconUrl: "images/feast.jpg",
	},
	mediateDisputes: {
		name: "Mediate Street Disputes",
		description: "Become known as a just figure. Your wisdom grows with each intervention!",
		level: 0,
		baseCost: 3000,
		power: 0.5,
		powerIncrement: 0.5,
		type: "respect_per_second",
		requires: 2000,
		tier: 2,
		storeIconUrl: "images/mediate.jpg",
	},
	standardRate: {
		name: "Set the 'Standard' Rate",
		description: "Form a union to demand a minimum of 10 Taka per click.",
		level: 0,
		baseCost: 7500,
		power: 9,
		type: "special_click_base",
		requires: 5000,
		tier: 3,
		storeIconUrl: "images/standard.png",
		statusIconUrl: "images/standard.png",
	},
	workTrafficSignals: {
		name: "Work the Traffic Signals",
		description: "Knock on car windows during red lights.",
		level: 0,
		baseCost: 8000,
		power: 100,
		type: "idle",
		requires: 3000,
		tier: 3,
		storeIconUrl: "images/traffic.png",
	},
	donateToLocalMosque: {
		name: "Donate to Local Mosque",
		description: "Publicly donate ৳10000. Gains 400 Respect.",
		level: 0,
		baseCost: 15000,
		power: 500,
		type: "action_respect_boost",
		requires: 7000,
		tier: 3,
		storeIconUrl: "images/masjid.png",
		statusIconUrl: "images/masjid.png",
	},
	formBeggarGang: {
		name: "Form a Beggar Gang",
		description: "Take over the best spots and get a cut.",
		level: 0,
		baseCost: 20000,
		power: 300,
		type: "idle",
		requires: 15000,
		tier: 4,
		imageUrl: "images/gang.png",
		storeIconUrl: "images/gang.png",
	},
	fundCommunityWell: {
		name: "Fund a Community Well",
		description: "Provide clean water for a slum. Costs ৳30000. Gains 1000 Respect.",
		level: 0,
		baseCost: 30000,
		power: 1000,
		type: "action_respect_boost",
		requires: 20000,
		tier: 4,
		storeIconUrl: "images/well.png",
		statusIconUrl: "images/well.png",
	},
	contributeToPoliticalRally: {
		name: "Contribute to Political Rally",
		description: 'Donate ৳15000 (for "development"). Gains 500 Respect.',
		level: 0,
		baseCost: 15000,
		power: 500,
		type: "action_respect_boost",
		requires: 10000,
		tier: 4,
		storeIconUrl: "images/donation.jpg",
		statusIconUrl: "images/donation.png",
	},
};

const statusQuips = {
	"Street Urchin": "Every taka counts when you're just a speck in the city's dust.",
	"Corner Regular": "You've found your spot! The local dogs are starting to ignore you. Progress!",
	"Known Face":
		"Heads are turning... or maybe they're just avoiding eye contact with practiced speed.",
	"Alleyway Advisor": "Folks now ask you for directions... mostly to other, better begging spots.",
	"Local Hero": "You're like a local Robin Hood, except you keep the parathas. And the money.",
	"Street Sage": "Younger beggars occasionally offer you stale bread. Out of respect... or pity?",
	"Saint of the Streets": "Your generosity is legendary! Even the pigeons seem to bow before you.",
	"Moholla Matobbor":
		"Small-time disputes are now brought to *you* before the police. Cheaper, and the street tea is better.", // NEW
	"Shadow Mayor":
		"Local politicians now send 'gifts' hoping for your 'blessing' on their projects.", // NEW (Changed from "of the Slums" for broader appeal)
	"👑 Street Legend 👑":
		"You don't walk the streets; the streets roll out a red (if slightly dirty) carpet for you.",
};

// DOM ELEMENT REFERENCES
const backgroundClicker = document.getElementById("background-clicker");
const moneyDisplay = document.getElementById("money-display");
const moneyPerClickDisplay = document.getElementById("money-per-click-display");
const moneyPerSecondDisplay = document.getElementById("money-per-second-display");
const storeContainer = document.getElementById("store-container");
const saveButton = document.getElementById("save-button");
const resetButton = document.getElementById("reset-button");
const newsTicker = document.getElementById("news-ticker");
const playerTitle = document.getElementById("player-title");
const playerStatusDescription = document.getElementById("player-status-description");
const visualArea = document.getElementById("sprite-collection-bar"); // Points to the bar under news ticker
const respectDisplay = document.getElementById("respect-display");
const endGameScreen = document.getElementById("end-game-screen");
const endGameButton = document.getElementById("end-game-button");
const toBeContinuedScreen = document.getElementById("to-be-continued-screen");
const permanentStatusIconsDisplay = document.getElementById("permanent-status-icons");
const statusUpModalElement = document.getElementById("statusUpModal");
const statusUpModalBodyNewRank = document.getElementById("modalNewRank");
const statusUpModalBodyDescription = document.getElementById("modalNewRankDescription");
const statusUpModalQuirkyQuip = document.getElementById("modalQuirkyQuip");
let statusModalInstance;

// =================================================================
// GAME LOGIC FUNCTIONS
// =================================================================
function gameClick(event) {
	event.preventDefault();
	if (gameEnded) return;
	const { totalMpc } = calculateTotals();
	money += totalMpc;
	let clickDisplayAmount = Math.round(totalMpc);
	if (Math.random() < 0.15) {
		setTimeout(() => {
			let randomEvent = impactfulEvents[Math.floor(Math.random() * impactfulEvents.length)];
			let eventTextForLog = randomEvent.text;
			if (randomEvent.text.includes("[bonus]")) {
				let bonusAmount =
					clickDisplayAmount > 0 ? Math.max(1, Math.round(clickDisplayAmount * 0.5)) : 10;
				eventTextForLog = randomEvent.text.replace("[bonus]", `<b>${bonusAmount}</b>`);
			}
			logEvent({ text: eventTextForLog, effect: randomEvent.effect });
		}, 50);
	}
	showClickFeedback(event, clickDisplayAmount);
	updateGame();
}

function logEvent(eventData) {
	if (eventData.effect.money) {
		money += eventData.effect.money;
	}
	if (eventData.effect.respect) {
		respect += eventData.effect.respect;
	}
	if (respect < 0) respect = 0;
	const eventElement = document.createElement("div");
	eventElement.innerHTML = eventData.text;
	newsTicker.insertBefore(eventElement, newsTicker.firstChild);
	if (newsTicker.children.length > 6) {
		newsTicker.removeChild(newsTicker.lastChild);
	}
}

function updateGame() {
	if (gameEnded) return;
	const { totalMpc, totalMps, totalRps } = calculateTotals();
	moneyDisplay.textContent = "৳" + Math.floor(money);
	respectDisplay.textContent = Math.floor(respect);
	moneyPerClickDisplay.textContent = Math.round(totalMpc);
	moneyPerSecondDisplay.textContent = Math.round(totalMps);
	drawStore();
	updateVisuals();
	updatePlayerStatus();
	updatePermanentStatusIcons();
}

function updatePlayerStatus() {
	if (gameEnded) return;
	let oldTier = maxUnlockedPlayerTier;
	let oldPlayerTitle = playerTitle.textContent;

	let newTitle = "Street Urchin";
	let newDescription = "Just trying to survive another day.";
	let newTier = 1;

	// Adjusted Respect Thresholds for new titles & ~30 min game
	if (respect >= 7500) {
		// End game
		newTitle = "👑 Street Legend 👑";
		newDescription = "The city whispers your name. A choice awaits.";
		newTier = 5;
	} else if (respect >= 5500) {
		// NEW Threshold for Shadow Mayor
		newTitle = "Shadow Mayor";
		newDescription = "Your influence is undeniable; you shape the daily life of the streets.";
		newTier = 4; // Stays in Tier 4 unlock range
	} else if (respect >= 3500) {
		// NEW Threshold for Moholla Matobbor
		newTitle = "Moholla Matobbor";
		newDescription = "Your word carries weight in the local alleys and markets.";
		newTier = 4; // Stays in Tier 4 unlock range (or unlocks Tier 4 if Saint was T3)
	} else if (respect >= 2000) {
		newTitle = "Saint of the Streets";
		newDescription = "Your generosity is known far and wide.";
		newTier = 4; // This is the primary Tier 4 unlock trigger
	} else if (respect >= 1200) {
		newTitle = "Street Sage";
		newDescription = "Your wisdom (and collection techniques) are noteworthy.";
		newTier = 3;
	} else if (respect >= 500) {
		newTitle = "Local Hero";
		newDescription = "You have earned the people's admiration.";
		newTier = 3; // This is the primary Tier 3 unlock trigger
	} else if (respect >= 250) {
		newTitle = "Alleyway Advisor";
		newDescription = "People seek your... unique perspective on street life.";
		newTier = 2;
	} else if (respect >= 100) {
		newTitle = "Known Face";
		newDescription = "People recognize you and offer nods... or quickly walk away.";
		newTier = 2; // This is the primary Tier 2 unlock trigger
	} else if (respect >= 40) {
		newTitle = "Corner Regular";
		newDescription = "You've claimed a spot. It's not much, but it's yours.";
		newTier = 1;
	}
	// Default is "Street Urchin" if below 40 respect, tier 1

	playerTitle.textContent = newTitle;
	playerStatusDescription.textContent = newDescription;

	// Only update maxUnlockedPlayerTier if the newTier is greater
	// This ensures tier unlocks are tied to the more significant status jumps
	if (newTier > maxUnlockedPlayerTier) {
		maxUnlockedPlayerTier = newTier;
	}

	if (newTitle !== oldPlayerTitle) {
		logEvent({
			text: `Your reputation grows! You are now known as: <b>${newTitle}</b>`,
			effect: { money: 0, respect: 0 },
		});

		if (statusUpModalElement && bootstrap.Modal) {
			if (!statusModalInstance) {
				statusModalInstance = new bootstrap.Modal(statusUpModalElement);
			}
			if (statusUpModalBodyNewRank) statusUpModalBodyNewRank.textContent = newTitle;
			if (statusUpModalBodyDescription) statusUpModalBodyDescription.innerHTML = newDescription; // Use innerHTML if desc has HTML
			if (statusUpModalQuirkyQuip)
				statusUpModalQuirkyQuip.textContent =
					statusQuips[newTitle] || "The streets are tough, but so are you!";
			statusModalInstance.show();
		}

		if (maxUnlockedPlayerTier > oldTier) {
			// This check is fine
			logEvent({
				text: `Your influence reveals new opportunities! (Tier ${maxUnlockedPlayerTier} upgrades may be available)`,
				effect: { money: 0, respect: 0 },
			});
			drawStore();
		}
	}
}

function buyUpgrade(upgradeName) {
	if (gameEnded) return;
	const upgrade = upgrades[upgradeName];
	const cost = calculateCost(upgradeName);
	if (money >= cost) {
		money -= cost;
		upgrade.level++;
		let respectGained = 0;
		let eventMessageText = `Upgrade Purchased: <b>${upgrade.name}</b>!`;
		if (upgrade.type === "action_respect_boost") {
			respectGained = upgrade.power;
			eventMessageText = `You performed: <b>${upgrade.name}</b>! You gain massive respect.`;
		} else {
			respectGained = Math.ceil(upgrade.power * 0.2 + cost * 0.02); // Default respect gain
			if (respectGained > 0) eventMessageText += ` Your influence grows.`;
		}
		if (respectGained !== 0) {
			logEvent({ text: eventMessageText, effect: { money: 0, respect: respectGained } });
		} else {
			logEvent({ text: eventMessageText, effect: { money: 0, respect: 0 } }); // Log purchase even if no direct respect
		}
		updateGame();
	} else {
		alert("Not enough money!");
	}
}
function updateVisuals() {
	if (gameEnded || !visualArea) return;
	visualArea.innerHTML = ""; // Clear existing sprites

	for (const key in upgrades) {
		const upgrade = upgrades[key];
		if (upgrade.imageUrl && upgrade.level > 0) {
			let numberOfSpritesToShow = upgrade.level; // Default to showing one sprite per level

			// NEW: Apply caps for specific upgrades
			if (key === "sadDog") {
				numberOfSpritesToShow = Math.min(upgrade.level, 2); // Show a maximum of 2 dog sprites
			} else if (key === "hireCryingChild") {
				numberOfSpritesToShow = Math.min(upgrade.level, 2); // Show a maximum of 2 child sprites
			}

			for (let i = 0; i < numberOfSpritesToShow; i++) {
				const img = document.createElement("img");
				if (Array.isArray(upgrade.imageUrl)) {
					// If it's a list, cycle through it based on the sprite instance 'i'
					// This ensures if you have 2 dog images, the first dog shown is image 0, second is image 1.
					img.src = upgrade.imageUrl[i % upgrade.imageUrl.length];
				} else {
					// If it's a single image path (e.g., for formBeggarGang)
					img.src = upgrade.imageUrl;
				}
				img.alt = upgrade.name;
				visualArea.appendChild(img);
			}
		}
	}
}

function updatePermanentStatusIcons() {
	if (gameEnded || !permanentStatusIconsDisplay) return;
	permanentStatusIconsDisplay.innerHTML = "";
	for (const key in upgrades) {
		const upgrade = upgrades[key];
		const isOneTimePurchased =
			(upgrade.type === "click_percent" ||
				upgrade.type === "special_click_base" ||
				upgrade.type === "action_respect_boost") &&
			upgrade.level > 0;
		const isCryingChildActive = key === "hireCryingChild" && upgrade.level > 0;
		const shouldDisplayStatusIcon =
			upgrade.statusIconUrl &&
			(isOneTimePurchased || isCryingChildActive || (key === "standardRate" && upgrade.level > 0));
		if (shouldDisplayStatusIcon) {
			const iconImg = document.createElement("img");
			iconImg.src = upgrade.statusIconUrl;
			iconImg.alt = upgrade.name;
			iconImg.title = upgrade.name;
			iconImg.classList.add("permanent-upgrade-icon");
			permanentStatusIconsDisplay.appendChild(iconImg);
		}
	}
}

function calculateTotals() {
	let respectBonusMultiplier = 1 + Math.min(respect / 2000, 1);
	if (respect < 0) respectBonusMultiplier = 1;

	let totalMpsCalculated = 0;
	let baseMpcCalculated = 1;
	let totalRpsCalculated = 0;

	if (upgrades.standardRate.level > 0) {
		baseMpcCalculated = 10;
	}

	for (const key in upgrades) {
		const upgrade = upgrades[key];
		if (upgrade.tier <= maxUnlockedPlayerTier) {
			if (key === "hireFriend" && upgrade.type === "click") {
				let currentUpgradePower = 0;
				for (let i = 0; i < upgrade.level; i++) {
					currentUpgradePower += upgrade.power + i * (upgrade.powerIncrement || 0);
				}
				baseMpcCalculated += currentUpgradePower;
			} else if (key === "sadDog" && upgrade.type === "idle") {
				let currentUpgradePower = 0;
				for (let i = 0; i < upgrade.level; i++) {
					currentUpgradePower += upgrade.power + i * (upgrade.powerIncrement || 0);
				}
				totalMpsCalculated += currentUpgradePower;
			} else if (upgrade.type === "click") {
				baseMpcCalculated += upgrade.level * upgrade.power;
			} else if (upgrade.type === "idle") {
				totalMpsCalculated += upgrade.level * upgrade.power;
			} else if (upgrade.type === "respect_per_second") {
				if (upgrade.powerIncrement) {
					let currentRpsFromThis = 0;
					for (let i = 0; i < upgrade.level; i++) {
						currentRpsFromThis += upgrade.power + i * upgrade.powerIncrement;
					}
					totalRpsCalculated += currentRpsFromThis;
				} else {
					totalRpsCalculated += upgrade.level * upgrade.power;
				}
			}
		}
	}

	let totalPercentBoostFromUpgrades = 0;
	for (const key in upgrades) {
		const upgrade = upgrades[key];
		if (
			upgrade.tier <= maxUnlockedPlayerTier &&
			upgrade.type === "click_percent" &&
			upgrade.level > 0
		) {
			totalPercentBoostFromUpgrades += upgrade.power;
		}
	}

	let finalTotalMpc = baseMpcCalculated * (1 + totalPercentBoostFromUpgrades);
	finalTotalMpc *= respectBonusMultiplier;
	totalMpsCalculated *= respectBonusMultiplier;

	return {
		totalMpc: finalTotalMpc,
		totalMps: Math.round(totalMpsCalculated),
		totalRps: parseFloat(totalRpsCalculated.toFixed(2)),
	};
}

function drawStore() {
	if (gameEnded) return;
	storeContainer.innerHTML = "";
	let upgradesActuallyDrawable = 0;
	for (const key in upgrades) {
		const upgrade = upgrades[key];
		const isOneTimePermanentAndPurchased =
			(upgrade.type === "special_click_base" ||
				upgrade.type === "click_percent" ||
				upgrade.type === "action_respect_boost") &&
			upgrade.level > 0;
		if (isOneTimePermanentAndPurchased) {
			continue;
		}
		if ((key === "hireFriend" && upgrade.level >= 9) || (key === "sadDog" && upgrade.level >= 8)) {
			continue;
		}
		if (upgrade.tier <= maxUnlockedPlayerTier && (money >= upgrade.requires || upgrade.level > 0)) {
			upgradesActuallyDrawable++;
			const cost = calculateCost(key);
			const button = document.createElement("button");
			button.classList.add("list-group-item", "list-group-item-action", "upgrade-button");
			let levelText = `Level: ${upgrade.level}`;
			let iconSrc = "";
			if (upgrade.storeIconUrl) {
				if (Array.isArray(upgrade.storeIconUrl)) {
					iconSrc = upgrade.storeIconUrl[upgrade.level % upgrade.storeIconUrl.length];
				} else {
					iconSrc = upgrade.storeIconUrl;
				}
			}
			button.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 d-flex align-items-center">
                        ${iconSrc ? `<img src="${iconSrc}" class="store-icon">` : ""}
                        <span>${upgrade.name}</span>
                    </h6>
                    <small>${levelText}</small>
                </div>
                <p class="mb-1 small">${upgrade.description}</p>
                <p class="mb-1"><em>${getEffectText(upgrade)}</em></p>
                <small class="fw-bold">Cost: ${cost === Infinity ? "---" : "৳" + cost}</small>
            `;
			if (money < cost || cost === Infinity) {
				button.disabled = true;
			}
			button.onclick = () => buyUpgrade(key);
			storeContainer.appendChild(button);
		}
	}
	if (upgradesActuallyDrawable === 0 && !gameEnded) {
		storeContainer.innerHTML =
			'<p class="text-white-50 small text-center">More opportunities will appear as your wealth and respect grow.</p>';
	} else if (upgradesActuallyDrawable === 0 && gameEnded) {
		storeContainer.innerHTML =
			'<p class="text-white-50 small text-center">The path has been chosen.</p>';
	}
}

function getEffectText(upgrade) {
	if (
		upgrade.powerIncrement &&
		(upgrade.name === "Hire a Friend" ||
			upgrade.name === "Beg with a Sad Dog" ||
			(upgrade.type === "respect_per_second" && upgrade.powerIncrement))
	) {
		const nextLevelPower = upgrade.power + upgrade.level * (upgrade.powerIncrement || 0);
		let typeText = "";
		if (upgrade.type === "click") typeText = "৳/click";
		else if (upgrade.type === "idle") typeText = "৳/sec";
		else if (upgrade.type === "respect_per_second") typeText = "Respect/sec";
		return `Next level adds +${nextLevelPower.toFixed(2)} ${typeText}.`;
	}
	if (upgrade.type === "click") return `Adds +${upgrade.power} to ৳/click.`;
	if (upgrade.type === "idle") return `Adds +${upgrade.power} to ৳/sec.`;
	if (upgrade.type === "special_click_base") return `Sets base income to 10 ৳/click.`;
	if (upgrade.type === "click_percent")
		return `Adds +${upgrade.power * 100}% to ৳/click. (Permanent)`;
	if (upgrade.type === "respect_per_second")
		return `Generates +${upgrade.power.toFixed(1)} Respect/sec.`;
	if (upgrade.type === "action_respect_boost") return `Gain +${upgrade.power} Respect. (One Time)`;
	return "";
}

function calculateCost(upgradeName) {
	const upgrade = upgrades[upgradeName];
	if (
		(upgrade.type === "special_click_base" ||
			upgrade.type === "click_percent" ||
			upgrade.type === "action_respect_boost") &&
		upgrade.level > 0
	) {
		return Infinity;
	}
	if (upgradeName === "hireFriend" && upgrade.level >= 9) return Infinity;
	if (upgradeName === "sadDog" && upgrade.level >= 8) return Infinity;

	let exponent = 1.25;
	if (upgradeName === "hireFriend") exponent = 1.35;
	else if (upgradeName === "sadDog") exponent = 1.35;
	else if (upgrade.type === "respect_per_second") exponent = 1.25;
	return Math.floor(upgrade.baseCost * Math.pow(exponent, upgrade.level));
}

function showClickFeedback(event, amount) {
	const feedback = document.createElement("div");
	feedback.classList.add("click-feedback");
	if (upgrades.standardRate.level > 0) {
		feedback.classList.add("click-feedback-empowered");
	}
	feedback.textContent = `+৳${amount}`;
	feedback.style.left = `${event.clientX}px`;
	feedback.style.top = `${event.clientY}px`;
	document.body.appendChild(feedback);
	setTimeout(() => {
		feedback.remove();
	}, 1000);
}

// GAME LOOP AND EVENT LISTENERS
backgroundClicker.addEventListener("click", gameClick);
const mainGameLoop = setInterval(() => {
	if (gameEnded) {
		clearInterval(mainGameLoop);
		return;
	}
	const { totalMps, totalRps } = calculateTotals();
	respect += 0.2;
	if (totalRps > 0) {
		respect += totalRps;
	}
	if (respect < 0) respect = 0;
	if (totalMps > 0) {
		money += totalMps;
	}
	if (respect >= 10000 && !gameEnded) {
		gameEnded = true;
		endGameScreen.classList.remove("hidden");
		logEvent({
			text: "<b>You have reached the pinnacle of street respect! A new path opens...</b>",
			effect: { money: 0, respect: 0 },
		});
	}
	updateGame();
}, 1000);

endGameButton.addEventListener("click", () => {
	endGameScreen.classList.add("hidden");
	toBeContinuedScreen.classList.remove("hidden");
});
async function saveGame() {
	if (gameEnded) return;
	const gameState = {
		money: money,
		respect: respect,
		maxUnlockedPlayerTier: maxUnlockedPlayerTier,
		upgrades: {},
	};
	for (const key in upgrades) gameState.upgrades[key] = { level: upgrades[key].level };
	try {
		const response = await fetch("save.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(gameState),
		});
		const result = await response.json();
		if (result.status === "success") {
			alert("Game Saved!");
		} else {
			alert("Save failed: " + result.message);
		}
	} catch (error) {
		console.error("Error saving game:", error);
		alert("An error occurred while saving.");
	}
}
saveButton.addEventListener("click", saveGame);
resetButton.addEventListener("click", () => {
	if (confirm("Are you sure you want to reset your game? All progress will be lost permanently.")) {
		window.location.href = "reset.php";
	}
});
function loadGame() {
	const savedState = window.gameStateFromServer;
	if (savedState) {
		money = savedState.money || 0;
		respect = savedState.respect || 0;
		if (typeof savedState.maxUnlockedPlayerTier !== "undefined") {
			maxUnlockedPlayerTier = savedState.maxUnlockedPlayerTier;
		} else {
			if (respect >= 2000) maxUnlockedPlayerTier = 4;
			else if (respect >= 500) maxUnlockedPlayerTier = 3;
			else if (respect >= 100) maxUnlockedPlayerTier = 2;
			else maxUnlockedPlayerTier = 1;
		}
		for (const key in savedState.upgrades) {
			if (upgrades[key]) {
				upgrades[key].level = savedState.upgrades[key].level;
			}
		}
	}
}
window.onload = () => {
	loadGame();
	if (statusUpModalElement && typeof bootstrap !== "undefined") {
		// Check bootstrap is defined
		statusModalInstance = new bootstrap.Modal(statusUpModalElement);
	}
	updateGame();
	updatePermanentStatusIcons();
	logEvent({
		text: "The city awakens. Time to earn your keep.",
		effect: { money: 0, respect: 0 },
	});
};
