function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth, 
        finalPlayerHealth: playerHealth
    };
    switch (event) {
        case LOGEVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOGEVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOGEVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOGEVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
    default:
        logEntry = {};
    };
    battleLog.push(logEntry);
}