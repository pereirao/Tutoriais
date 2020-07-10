new class GameData {

    constructor() {

        console.log('Game Started!');

        this.xp = 0;
        this.level = 1;
        this.next_level_xp = 100;

        setInterval(() => {
            this.autoIncrementXp();
        }, 1000);

        PubSub.subscribe('xp_changed', () => {
            this.maybeLevelUp();
        });

        PubSub.subscribe('user_click_xp', () => {
            this.clickXp();
        });

    }

    maybeLevelUp() {

        if (this.xp >= this.next_level_xp) {

            this.xp = 0;
            this.level = this.level + 1;
            this.next_level_xp = this.next_level_xp * (2 * this.level);

            PubSub.publish('level_up', {
                level: this.level,
                next_level_xp: this.next_level_xp
            });

        }

    }

    addXp(amount) {

        this.xp += amount;

        PubSub.publish('xp_changed', {
            xp: this.xp,
            next_level_xp: this.next_level_xp
        });

    }

    clickXp() {
        this.addXp(this.level * 10);
    }

    autoIncrementXp() {
        this.addXp(this.level * 5);
    }

}
