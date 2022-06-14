const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOGEVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOGEVENT_PLAYER_STRONG_ATTACK= 'PLAYER_STRONG_ATTACK';
const LOGEVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOGEVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOGEVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];

function getMaxLifeValues() {
    let chosenMaxLife = parseInt(prompt('Enter max life for you and the monster:', 100));
    if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
        //chosenMaxLife = 100;
        throw {message: 'Invalid user input. Not a number > 0!'};
        //chosenMaxLife = parseInt(prompt('Max life must be a number or > 0 :', 100));
    } 
    return chosenMaxLife; 
}

let maxLife;
try {
    maxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    maxLife = 100;
    alert('Incorrect input. Default value used');
    //could re-throw an error here --> then use a finally for cleanup
    //throw error
} //finally {

// }

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth, 
        finalPlayerHealth: playerHealth
    };
    if (event == LOGEVENT_PLAYER_ATTACK || event == LOGEVENT_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if (event == LOGEVENT_MONSTER_ATTACK || event == LOGEVENT_PLAYER_HEAL) {
        logEntry.target = 'PLAYER';
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = maxLife;
    currentPlayerHealth = maxLife;
    resetGame(maxLife);
}

function endRound() {
    const playerHealthBeforeAttack = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOGEVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = playerHealthBeforeAttack;
        alert('You would be dead, but the bonus life saved you!');
        setPlayerHealth(currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToLog(LOGEVENT_MONSTER_ATTACK, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        writeToLog(LOGEVENT_MONSTER_ATTACK, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToLog(LOGEVENT_MONSTER_ATTACK, 'DRAW', currentMonsterHealth, currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(attackMode) {
    // tenerary epressions:
    //   const maxDamage = mode == MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    //   const logEvent =
    //     mode == MODE_ATTACK
    //       ? LOGEVENT_PLAYER_ATTACK
    //       : LOGEVENT_PLAYER_STRONG_ATTACK;
    //   const monsterDamage = dealMonsterDamage(maxDamage);
    let maxDamage;
    let logEvent;
    if (attackMode == MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOGEVENT_PLAYER_ATTACK;
    } else if (attackMode == MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOGEVENT_PLAYER_STRONG_ATTACK
    }
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    writeToLog(logEvent, monsterDamage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttckHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    increasePlayerHealth(HEAL_VALUE);
    if (currentPlayerHealth >= maxLife - HEAL_VALUE) {
        alert("Heal is already at max!");
        healValue = maxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += healValue;
    writeToLog(LOGEVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log('----LOG----')
    for (let i = 0; i < battleLog.length; i++) {
        console.log(battleLog[i]);    
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttckHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);