import React, { useCallback, useEffect } from 'react';
import { useMountedState } from '../utils/mounted';

import { TopBar } from '../topbar/topbar';

import { SoughtGame } from '../store/reducers/lobby_reducer';
import { GameLists } from './gameLists';
import { Chat } from '../chat/chat';
import { useLoginStateStoreContext } from '../store/store';
import './lobby.scss';
import { Announcements } from './announcements';
import {
  sendAccept,
  sendAcceptOffer,
  sendSeek,
} from './sought_game_interactions';

type Props = {
  sendSocketMsg: (msg: Uint8Array) => void;
  sendChat: (msg: string, chan: string) => void;
  DISCONNECT: () => void;
};

export const Lobby = (props: Props) => {
  const { useState } = useMountedState();
  const { sendSocketMsg } = props;
  const { loginState } = useLoginStateStoreContext();

  const { loggedIn, username, userID } = loginState;

  const [selectedGameTab, setSelectedGameTab] = useState(
    loggedIn ? 'PLAY' : 'WATCH'
  );

  useEffect(() => {
    setSelectedGameTab(loggedIn ? 'PLAY' : 'WATCH');
  }, [loggedIn]);

  const handleNewGame = useCallback(
    (seekID: string) => {
      sendAccept(seekID, sendSocketMsg);
    },
    [sendSocketMsg]
  );

  const acceptSeek = useCallback(
    (req: Uint8Array) => {
      console.log('offering seek accept');
      sendAcceptOffer(req, sendSocketMsg);
    },
    [sendSocketMsg]
  );

  const onSeekSubmit = useCallback(
    (g: SoughtGame) => {
      console.log('sought game', g);
      sendSeek(g, sendSocketMsg);
    },
    [sendSocketMsg]
  );

  return (
    <>
      <TopBar />
      <div className="lobby">
        <div className="chat-area">
          <Chat
            sendChat={props.sendChat}
            defaultChannel="chat.lobby"
            defaultDescription="Help chat"
            DISCONNECT={props.DISCONNECT}
          />
        </div>
        <GameLists
          loggedIn={loggedIn}
          userID={userID}
          username={username}
          newGame={handleNewGame}
          onOfferAccept={acceptSeek}
          selectedGameTab={selectedGameTab}
          setSelectedGameTab={setSelectedGameTab}
          onSeekSubmit={onSeekSubmit}
        />
        <Announcements />
      </div>
    </>
  );
};
