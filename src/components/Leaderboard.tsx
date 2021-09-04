import React, { useEffect, useState } from 'react';

const Leaderboard = ({ players }) => {
    const [filtered, setFiltered] = useState();

    useEffect(() => {
        const addDetails = players.map((player) => {
            const teams = player.competitions[0].competitors;
            const activeTeam = teams.find((team) =>
                team.team.displayName.includes(player.team)
            );
            return {
                ...player,
                score: parseInt(activeTeam.score),
            };
        });
        setFiltered(addDetails);
    }, []);

    const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

    const getPoints = (event) => {
        const teams = event.competitions[0].competitors;
        const activeTeam = teams.find((team) =>
            team.team.displayName.includes(event.team)
        );
        return parseInt(activeTeam.score);
    };

    return (
        <div className="mb-8">
            <h3 className="text-white text-3xl">Leaderboard</h3>
            {filtered ? (
                <div className="bg-white border-2 border-black">
                    {sortPlayers(filtered).map((player, i) => (
                        <dl
                            key={player.person}
                            className="grid grid-cols-2 p-2 border"
                        >
                            <dt>
                                [{i + 1}] {player.person} ({player.projected})
                            </dt>
                            <dd>{getPoints(player)}</dd>
                        </dl>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Leaderboard;
