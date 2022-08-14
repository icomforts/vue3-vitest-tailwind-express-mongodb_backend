import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import Team, { ITeam } from '../models/Team';

const createTeam = (teamData: ITeam) => {
    return new Promise<void>((resolve, reject) => {
        Team.insertMany(teamData, (err: any) => {
            if (err) {
                reject(err);
            }
            console.log('success to create teams');
            resolve();
        });
    });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const TEAM_COUNT = 30;
    const teamsExits = (await Team.estimatedDocumentCount()) === TEAM_COUNT;
    if (!teamsExits) {
        await Team.deleteMany();
        await fetchAllTeam();
    }
    return Team.find()
        .then((teams) => res.status(200).json({ teams }))
        .catch((error) => console.log(error));
};
const getTeam = (req: Request, res: Response, next: NextFunction) => {
    const { teamName } = req.params;

    return Team.find({ name: teamName })
        .then((team) => (team ? res.status(200).json({ team }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTeam, getAll, getTeam };

const fetchAllTeam = async () => {
    try {
        const res = await axios.get(`https://tw.global.nba.com/stats2/league/conferenceteamlist.json?locale=en`);
        let teams = res.data.payload.listGroups;
        teams = teams
            .reduce((acc: [], key: { teams: any }) => {
                return [...acc, ...key.teams];
            }, [])
            .map((team: { profile: {} }) => team.profile);
        await createTeam(teams);

        console.log('success fetch all team');
    } catch (err) {
        console.log(err);
    }
};
