new class GameUi {

    constructor() {

        this.button = document.getElementById('add-xp');
        this.progressBar = document.getElementById('level-progress');
        this.currentXp = document.getElementById('current-xp');
        this.nextLevelXp = document.getElementById('next-level-xp');
        this.currentLevel = document.getElementById('current-level');
        this.currentXp = document.getElementById('current-xp');
        this.huzzah = document.getElementById('huzzah');

        this.button.addEventListener('click', () => {
            PubSub.publish('user_click_xp');
        });

        PubSub.subscribe('xp_changed', (tag, data) => {
            this.updateProgressBar(data.xp, data.next_level_xp);
            this.updateCurrentXp(data.xp);
        });

        PubSub.subscribe('level_up', (tag, data) => {
            this.congratulations(data.level, data.next_level_xp);
        });

    }

    updateCurrentXp(xp) {
        this.currentXp.innerHTML = xp;
    }

    updateProgressBar(xp, next_level_xp) {
        this.progressBar.style.width = (xp / next_level_xp) * 100 + '%';
    }

    congratulations(level, next_level_xp) {

        this.currentLevel.innerHTML = level;
        this.nextLevelXp.innerHTML = next_level_xp;

        this.huzzah.style.opacity = 1;
        setTimeout(() => {
            this.huzzah.style.opacity = 0;
        }, 2000);

    }


}
