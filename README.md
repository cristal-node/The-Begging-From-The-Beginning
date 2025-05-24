# The Begging: From the Beginning

![](https://github.com/shoytanbaba99/The-Begging-From-The-Beginning/blob/e5e4daa662f01e08c8ffc2e01e90425e2ba0dbf5/Images/image.png)
*(Suggestion: Take a nice screenshot of your game in action and include it here. Upload the image to your repository and link to it.)*

A PHP & JavaScript based idle clicker game simulating a journey of a "Beggar" in a bustling city environment inspired by Dhaka.

---

## 🌟 Features

* **Core Clicker Mechanic:** Click to earn Taka, the primary game currency.
* **Idle Income:** Purchase upgrades that generate Taka passively over time.
* **Diverse Upgrade System:**
    * **Money Upgrades:** Increase Taka per click (flat and percentage-based) and Taka per second.
    * **Respect Upgrades:** Generate "Street Respect" passively or through one-time actions.
    * **Tiered Unlocking:** Upgrades are grouped into tiers, unlocked as the player gains more Respect and achieves higher Player Statuses.
    * **Proportional Power Increase:** Certain upgrades (like "Hire a Friend," "Beg with a Sad Dog," "Share Food") become more effective with each level.
    * **Max Level Caps:** Some levelable upgrades disappear from the store after reaching a maximum level.
    * **One-Time Permanent Upgrades:** Special upgrades that provide lasting effects and are removed from the store after purchase.
* **Street Respect System:**
    * A secondary progression metric earned through actions, events, and specific upgrades.
    * Provides a percentage bonus to all Taka earnings.
    * Determines the Player's Status/Title.
* **Player Status System:**
    * Players progress through various titles (e.g., "Street Urchin," "Known Face," "Local Hero," "Matubbor," "👑 Street Legend 👑") based on their Respect level.
* **Dynamic Event System (News Ticker):**
    * A scrolling news ticker displays random events triggered by clicks.
    * Events can positively or negatively impact Money and/or Respect, or be purely for flavor, adding to the game's atmosphere.
    * Features over 50 unique event strings.
* **Visual Progression & Feedback:**
    * **Sprite Collection Bar:** Displays visual sprites (e.g., hired friends, dogs) that accumulate as upgrades are purchased. Sprites cycle if multiple images are defined for an upgrade.
    * **Store Icons:** Upgrade buttons in the store feature icons, which can cycle for multi-level/multi-image upgrades.
    * **Permanent Status Icons:** Small icons display in the UI to indicate key permanent upgrades or strategies acquired.
    * **Click Animation:** Visual feedback (+৳[amount]) appears at the mouse cursor on each click, with a special "empowered" glow effect after purchasing the "Set the 'Standard' Rate" upgrade.
* **End-Game Sequence:**
    * Triggered by reaching a high level of Street Respect (~7500 for the demo version).
    * Presents the player with a choice, leading to a "To Be Continued..." screen, providing a sense of completion and potential for future expansion.
* **Save/Load System:**
    * Uses **PHP Sessions** to store and retrieve game progress (Money, Respect, Upgrade Levels, Max Unlocked Player Tier) on the server.
    * Allows players to continue their game across browser sessions.
* **Polished UI/UX:**
    * Dark "White on Black" theme.
    * Custom-styled scrollbars for UI elements.
    * Responsive click handling to prevent jitter.
    * Organized layout with clear visual hierarchy.

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling Framework:** Bootstrap 5 (for grid and base components)
* **Backend (for Saving):** PHP (using Sessions)
* **Local Development Environment:** XAMPP (or any Apache+PHP server like WAMP, MAMP)

---

## 🚀 How to Run the Game Locally

To run "The Begging: From the Beginning" on your local machine, you'll need a web server environment that supports PHP, like XAMPP.

1.  **Prerequisites:**
    * Install XAMPP (or a similar package like WAMP for Windows, MAMP for Mac). Make sure Apache and PHP are running. You can download XAMPP from [apachefriends.org](https://www.apachefriends.org/).

2.  **Setup Instructions:**
    * **Clone or Download:**
        * If you have Git: `git clone https://github.com/your-username/your-repository-name.git`
        * Alternatively, download the project ZIP from GitHub and extract it.
    * **Place Project Folder:** Move the entire project folder (e.g., `The-Begging-From-The-Beginning`) into your XAMPP `htdocs` directory.
        * On Windows, this is usually `C:\xampp\htdocs\`
        * On macOS, this is usually `/Applications/XAMPP/htdocs/`
    * **Start XAMPP:** Open the XAMPP Control Panel and start the **Apache** module. (MySQL is not strictly required for this game's current features, but it's okay if it's running).
    * **Access the Game:** Open your web browser and navigate to:
        `http://localhost/your-project-folder-name/`
        (e.g., `http://localhost/The-Begging-From-The-Beginning/`)

    The game should now load and be playable! Your progress will be saved using PHP sessions on your local server.

---

## 🎮 How to Play (Briefly)

* Click anywhere on the background to beg for Taka.
* Use your earned Taka to buy upgrades from "The Store" to increase your earnings per click and per second.
* Manage your "Street Respect" by performing actions, getting lucky with events, or buying specific upgrades. Higher respect unlocks new upgrade tiers and provides an income bonus.
* Keep an eye on the "News Ticker" for random events that can help or hinder your progress.
* Progress through different "Player Status" ranks by gaining Respect.
* Reach the ultimate status of "Street Legend" to see the game's current ending.


---

## 🧑‍💻 Author

* **[Shoytanbaba99]**
    * (https://github.com/shoytanbaba99)

---

* This project was developed as part of [Internet Programming Lab] Course.
