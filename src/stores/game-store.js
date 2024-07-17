import {defineStore} from "pinia";
import {i18n} from "/src/i18n/i18n.js"
import {useLocalStorage} from "@vueuse/core";

export const useGameStore = defineStore('game', {
    state() {
        return {
            players: [],
            currentPlayer: null,
            alpineExpansion: useLocalStorage("alpineExpansion", true),
            distributedScoring: useLocalStorage("distributedScoring", false),
            duererExpansion: useLocalStorage("duererExpansion", false),
            startTime: new Date()
        }
    },
    actions: {
        addPlayer(name) {
            this.players.push({name})
        },
        updatePlayerName(oldName, newName) {
            if (this.players.find(p => p.name !== oldName && p.name === newName))
                throw new Error(i18n.t('error.nameTaken', [name]))
            const idx = this.players.findIndex(p => p.name === oldName)
            this.players[idx].name = newName
        },
        selectPlayer(name) {
            this.currentPlayer = this.players.find(p => p.name === name)
        },
        resetPlayers() {
            this.players = []
            this.currentPlayer = null
        },
        toggleAlpineExpansion() {
            this.alpineExpansion = !this.alpineExpansion
        },
        toggleDuererExpansion() {
            this.duererExpansion = !this.duererExpansion
        },
        toggleDistributedScoring() {
            this.distributedScoring = !this.distributedScoring
        },
        newGameStarted(){
            this.startTime = new Date()
        }
    }
})

