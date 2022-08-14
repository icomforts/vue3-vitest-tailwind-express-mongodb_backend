"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Team_1 = __importDefault(require("../models/Team"));
const createTeam = (teamData) => {
    return new Promise((resolve, reject) => {
        Team_1.default.insertMany(teamData, (err) => {
            if (err) {
                reject(err);
            }
            console.log('success to create teams');
            resolve();
        });
    });
};
const getAll = async (req, res, next) => {
    const TEAM_COUNT = 30;
    const teamsExits = (await Team_1.default.estimatedDocumentCount()) === TEAM_COUNT;
    if (!teamsExits) {
        await Team_1.default.deleteMany();
        await fetchAllTeam();
    }
    return Team_1.default.find()
        .then((teams) => res.status(200).json({ teams }))
        .catch((error) => console.log(error));
};
const getTeam = (req, res, next) => {
    const { teamName } = req.params;
    return Team_1.default.find({ name: teamName })
        .then((team) => (team ? res.status(200).json({ team }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTeam, getAll, getTeam };
const fetchAllTeam = async () => {
    try {
        const res = await axios_1.default.get(`https://tw.global.nba.com/stats2/league/conferenceteamlist.json?locale=en`);
        let teams = res.data.payload.listGroups;
        teams = teams
            .reduce((acc, key) => {
            return [...acc, ...key.teams];
        }, [])
            .map((team) => team.profile);
        await createTeam(teams);
        console.log('success fetch all team');
    }
    catch (err) {
        console.log(err);
    }
};
