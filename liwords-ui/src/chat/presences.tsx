import React from 'react';
import { PresenceEntity } from '../store/store';
import { UsernameWithContext } from '../shared/usernameWithContext';

type Props = {
  players: { [uuid: string]: PresenceEntity };
  sendMessage: (msg: string, receiver: string) => void;
};

export const Presences = React.memo((props: Props) => {
  const vals = Object.values(props.players);
  vals.sort((a, b) => (a.username < b.username ? -1 : 1));

  const profileLink = (player: PresenceEntity) => (
    <UsernameWithContext
      username={player.username}
      userID={player.uuid}
      sendMessage={props.sendMessage}
    />
  );
  const knownUsers = Object.keys(props.players).filter(
    (p) => !props.players[p].anon
  );
  const presences = knownUsers.length
    ? knownUsers
        .map<React.ReactNode>((u) => profileLink(props.players[u]))
        .reduce((prev, curr) => [prev, ', ', curr])
    : null;
  const anonCount = Object.keys(props.players).length - knownUsers.length;
  if (!knownUsers.length) {
    return <span className="anonymous">No logged in players.</span>;
  }
  return (
    <>
      {presences}
      <span className="anonymous">
        {anonCount === 1 ? ' and 1 anonymous viewer' : null}
        {anonCount > 1 ? ` and ${anonCount} anonymous viewers` : null}
      </span>
    </>
  );
});
