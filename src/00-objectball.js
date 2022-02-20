function gameObject() {
    return { "home": {
            teamName: "Brooklyn Nets", 
            colors: ["black", "white"],
            players: {
                    "Alan Anderson": {number: 0, shoe: 16, points: 22, rebounds: 12, assists: 12, steals: 3, blocks: 1, slamDunks: 1 },
                    "Reggie Evans": { number: 30, shoe: 14, points: 12, rebounds: 12, assists: 12, steals: 12, blocks: 12, slamDunks: 7 },
                    "Brook Lopez": { number: 11, shoe: 17, points: 17, rebounds: 19, assists: 10, steals: 3, blocks: 1, slamDunks: 15 },
                    "Mason Plumlee": { number: 1, shoe: 19, points: 26, rebounds: 12, assists: 6, steals: 3, blocks: 8, slamDunks: 5 },
                    "Jason Terry": { number: 31, shoe: 15, points: 19, rebounds: 2, assists: 2, steals: 4, blocks: 11, slamDunks: 1 },
                    },
                
        }, 
        "away": {
            teamName: "Charlotte Hornets",
            colors: ["turquoise", "purple"],
            players: {
                    "Jeff Adrien": { number: 4, shoe: 18, points: 10, rebounds: 1, assists: 1, steals: 2, blocks: 7, slamDunks: 2 },
                    "Bismak Biyombo": { number: 0, shoe: 16, points: 12, rebounds: 4, assists: 7, steals: 7, blocks: 15, slamDunks: 10 },
                    "DeSagna Diop": { number: 2, shoe: 14, points: 24, rebounds: 12, assists: 12, steals: 4, blocks: 5, slamDunks: 5 },
                    "Ben Gordon": { number: 8, shoe: 15, points: 33, rebounds: 3, assists: 2, steals: 1, blocks: 1, slamDunks: 0 },
                    "Brendan Haywood": { number: 33, shoe: 15, points: 6, rebounds: 12, assists: 12, steals: 22, blocks: 5, slamDunks: 12 },
                },

        }
        }
}


//function takes in an argument of a player's name and returns the number of points scored for that player

// //this function is written in a way that loops through each "layer" of the object. The reason for looping is that the players are not all kept in the same object, so we need to iterate. Version of the function that is simplified is below.
// function numPointsScored(playerInput) {
//     const game = gameObject() //creates a variable that references the gameObject function
//     for (const gameKey in game) { //for loop that iterates through the game keys (home, away)
//         const teamObj = game[gameKey] //teamObj is the team (Brooklyn Nets or Charlotte Hornets)
//         const playerObj = teamObj.players //this gets the players (playerObj is the players)
//         for (const playerKey in playerObj) { //for loop that iteratest through each of the players
//             if (playerKey === playerInput) { //check that reviews the value entered as playerInput in the function to see if it matches the current player being looped through
//                 return playerObj[playerKey].points //if the playerKey and playerInput are a match: return the points for that player
//             }
//         }
//     }
// }

// console.log(numPointsScored("Ben Gordon"))

//in this version of the numPointsScored function, the players are combined into a single object, which allows simplifying the function and not looping through each layer of the object to get to the points.
function allPlayers() { //making a separate function to store all the players data in a "flatter" structure; keeping this as a separate function will allow reusing the data
    const game = gameObject()
    const homePlayers = game.home.players //creates a variable that stores all the data within the home object
    const awayPlayers = game.away.players //creates a variable that stores all the data within the away object
    return {...homePlayers, ...awayPlayers}
    //below - alternative way to accomplish the same return result
    //return Object.assign({}, homePlayers, awayPlayers) //assigns to an empty object {} data from the homePlayers and awayPlayers variables
}

function homeTeam() {
    return gameObject().home
}

function awayTeam() {
    return gameObject().away
}

function allTeams() {
    return [homeTeam(), awayTeam()]
}



// //this is a better version of the numPointsScoreed function, but it can be refacrored even further (see below)
// function numPointsScored(playerInput) {
//     const players = allPlayers()
//     for (const playerName in players) { //only necessary to have one loop to loop through the players (vs the previous version of the function (above) where it was necessary to loop through all the different layers of the object)
//     if (playerName === playerInput) {
//         return players[playerName].points
//         } 
//     return 'Player not found.'    
//     }
// }

function numPointsScored(playerInput) {
    //below are 3 different ways to do a return for this function (all constructed for both, the optimal case (player found), and non-optimal (player not found))
    //return allPlayers()[playerInput] ? allPlayers()[playerInput].points : "Player not found."
    //return allPlayers()[playerInput] && allPlayers()[playerInput].points
    return allPlayers()[playerInput]?.points //the downside of this one is that it will not provide an error if there is no result found for the input (will always be undefined in that case)
}

console.log(numPointsScored("alisa"))


//this works, but could be refactored further (see below)
// function shoeSize(playerInput) {
//     for (const playerName in allPlayers()) {
//         if (playerName === playerInput) {
//             return allPlayers()[playerName].shoe
//         }
//     }
// }

function shoeSize(playerInput) {
    return allPlayers()[playerInput]?.shoe
}

function teamColors(teamInput) {
    for (const team in gameObject()) {
        const teamObj = gameObject()[team]
        if (teamObj.teamName === teamInput) {
            return teamObj.colors
        }
    }
}



function teamNames() {
    return [gameObject().home.teamName, gameObject().away.teamName]
    }


function playerNumbers(teamInput) {
    //const playerJerseys = []
    const allPlayers = homeTeam().teamName === teamInput ? homeTeam().players : awayTeam().players //this works for two options (either/or logic), but will not support a third option. if there were more than 2 options, then a for loop should have been used
    return Object.values(allPlayers).map(playerStat => playerStat.number)


    // for (player in allPlayers) {
    //     playerJerseys.push(allPlayers[player].number)
    // }
    // return playerJerseys
}
console.log(playerNumbers("Brooklyn Nets"))

function playerStats(playerInput) {
    return allPlayers()[playerInput]
}

// function bigShoeRebounds() {
//     let largestShoe = 0
//     let playerWithLargestShoe = ''
//     const playerObj = allPlayers()
//     const allShoes = []
//     const arrayAllPlayers = []
//     for (player in playerObj) {
//         arrayAllPlayers.push(player)
//         allShoes.push(playerObj[player].shoe)
//     }
//     largestShoe = Math.max(...allShoes)

//     playerWithLargestShoe = arrayAllPlayers[allShoes.indexOf(largestShoe)]
//     return playerObj[playerWithLargestShoe].rebounds
// }

function bigShoeRebounds() {
    const playerObj = allPlayers()
    let largestShoe = 0
    let playerWithLargestShoe = {}
        for (const player in playerObj) {
        if (playerObj[player].shoe > largestShoe) {
            largestShoe = player.shoe
            playerWithLargestShoe = allPlayers()[player]
        }
    }
    return playerWithLargestShoe.rebounds
}


function mostPointsScored() {
    let mostPoints = 0
    let playerWithMostPoints = ''
    const playerObj = allPlayers()
    const allPoints = []
    const arrayAllPlayers = []
    for (player in playerObj) {
        arrayAllPlayers.push(player)
        allPoints.push(playerObj[player].points)
    }
    mostPoints = Math.max(...allPoints)
    playerWithMostPoints = arrayAllPlayers[allPoints.indexOf(mostPoints)]

    return playerWithMostPoints
}

function winningTeam() {
    let teamWithMostPoints = ''
    const homePlayers = homeTeam().players
    const awayPlayers = awayTeam().players
    let homeTotalPoints = 0
    let awayTotalPoints = 0
    for (player in homePlayers) {
        homeTotalPoints += homePlayers[player].points
    }
    for (player in awayPlayers) {
        awayTotalPoints += awayPlayers[player].points
        
    }
    if (homeTotalPoints > awayTotalPoints) {
        teamWithMostPoints = homeTeam().teamName
    }
    else {
        teamWithMostPoints = awayTeam().teamName
       
    }
    return teamWithMostPoints
}

function playerWithLongestName() {
    arrayOfPlayerNames = Object.keys(allPlayers())
    const lengthOfPlayerNames = arrayOfPlayerNames.map(player => player.length)
    const indexOfLongestName = lengthOfPlayerNames.indexOf(Math.max(...lengthOfPlayerNames))
    return arrayOfPlayerNames[indexOfLongestName]
}


function playerWithMostSteals() {
    let mostSteals = 0
    let playerWithMostSteals = ''
    const playerObj = allPlayers()
    const allSteals = []
    const arrayAllPlayers = []
    for (player in playerObj) {
        arrayAllPlayers.push(player)
        allSteals.push(playerObj[player].steals)
    }
    mostSteals = Math.max(...allSteals)
    playerWithMostSteals = arrayAllPlayers[allSteals.indexOf(mostSteals)]

    return playerWithMostSteals
}

function doesLongNameStealATon() {
    const mostStealsPlayer = playerWithMostSteals()
    const longestNamePlayer = playerWithLongestName()
    if (mostStealsPlayer === longestNamePlayer) {
        return true
    } else {
        return false
    }
}

