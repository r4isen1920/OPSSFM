
import { world, system, TicksPerSecond, TimeOfDay } from "@minecraft/server";

/**
 * 
 * Main function for this code
 * 
 * @param { import('@minecraft/server').Player } player 
 */
function main(player) {

  if (!player.isSleeping) {
    const currentSleepRunID = player.getDynamicProperty('r4isen1920_oppsfm:sleepRunID')
    if (currentSleepRunID > 0) system.clearRun(currentSleepRunID)
    player.setDynamicProperty('r4isen1920_oppsfm:sleepRunID', 0)

    return
  }

  const sleepRunID = system.runTimeout(() => {
    const nextTime = world.getAbsoluteTime() + (25000 - world.getTimeOfDay());
    world.setAbsoluteTime(nextTime);
    world.setTimeOfDay(TimeOfDay.Day);
  }, 102)
  player.setDynamicProperty('r4isen1920_oppsfm:sleepRunID', sleepRunID)

}

/**
 * 
 * Handles the sleep system runtime
 * for all players
 */
function runner() {
  system.runInterval(() => {

    const allPlayers = world.getAllPlayers()
    if (allPlayers.length <= 1) return

    allPlayers.forEach(player => {
      main(player)
    })

  })
}

system.runTimeout(runner, TicksPerSecond * 3)
