import React from 'react';
import { useQuery } from 'react-query';
import classNames from 'classnames';
import league from '../../content/content.json';

const filterGames = (liveGames, league) => {
    return league.map((person) => {
        const matchingGame = liveGames.find((game) =>
            game.name.includes(person.team)
        );

        console.log('matching game', matchingGame);
        return {
            ...person,
            ...matchingGame,
        };
    });
};

const LiveGames = () => {
    const { isLoading, error, data, isFetching } = useQuery('live-games', () =>
        fetch(
            'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=100&dates=20210903-20210905'
        )
            .then((res) => res.json())
            .then((res) => {
                const { events } = res;
                return filterGames(events, league);
            })
    );

    if (isLoading) {
        return <div>Loading......</div>;
    }

    if (error) {
        return <div>Whoops, something went wrong. Error: {error}</div>;
    }

    console.log('data', data);

    return (
        <div>
            {isFetching && <div>Grabbing all the data....</div>}
            {isFetching ? (
                <div>Fetching....</div>
            ) : (
                <div className="grid grid-cols-2 gap-5">
                    {data.map((event) => (
                        <div
                            key={event.id}
                            className={classNames(
                                'w-full border-2 shadow rounded p-3 m-4 bg-white',
                                {
                                    'border-green-600':
                                        event.status.type.completed,
                                    'border-red-700': !event.status.type
                                        .completed,
                                    'bg-green-100': event.status.type.completed
                                }
                            )}
                        >
                            <div className="border-b pb-2 mb-2 flex flex-row justify-between">
                                <div>
                                    <h1 className="text-xl">{event.person}</h1>
                                    <div>
                                        {event.team} ({event.projected})
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="border border-black flex flex-col items-center rounded">
                                        <div className="uppercase border-b px-4 py-1 text-sm">
                                            {
                                                event.competitions[0]
                                                    .competitors[0].homeAway
                                            }
                                        </div>
                                        <div>
                                            {
                                                event.competitions[0]
                                                    .competitors[0].team
                                                    .abbreviation
                                            }
                                        </div>
                                        <div className="bold text-3xl">
                                            {
                                                event.competitions[0]
                                                    .competitors[0].score
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center m-2">VS</div>
                                    <div className="border border-black flex flex-col items-center rounded">
                                        <div className="uppercase border-b px-4 py-1 text-sm">
                                            {
                                                event.competitions[0]
                                                    .competitors[1].homeAway
                                            }
                                        </div>
                                        <div>
                                            {
                                                event.competitions[0]
                                                    .competitors[1].team
                                                    .abbreviation
                                            }
                                        </div>
                                        <div className="bold text-3xl">
                                            {
                                                event.competitions[0]
                                                    .competitors[1].score
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2>{event.shortName}</h2>
                            <small>{event.name}</small>
                            <dl className="grid grid-cols-2 mt-5 border-t">
                                <dt className="my-3">Game Time</dt>
                                <dd className="my-3">
                                    {event.status.type.detail}
                                </dd>
                                <dt className="my-3">Status</dt>
                                <dd className="my-3">
                                    {event.status.type.name}
                                </dd>
                            </dl>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveGames;
