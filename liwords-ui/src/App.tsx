import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useMountedState } from './utils/mounted';
import './App.scss';
import 'antd/dist/antd.min.css';

import { Table as GameTable } from './gameroom/table';
import { SinglePuzzle } from './puzzles/puzzle';
import TileImages from './gameroom/tile_images';
import { Lobby } from './lobby/lobby';
import {
  useExcludedPlayersStoreContext,
  useLoginStateStoreContext,
  useResetStoreContext,
  useModeratorStoreContext,
  FriendUser,
  useFriendsStoreContext,
} from './store/store';

import { LiwordsSocket } from './socket/socket';
import { Team } from './about/team';
import { Register } from './lobby/register';
import { PlayerProfile } from './profile/profile';
import { Settings } from './settings/settings';
import { PasswordReset } from './lobby/password_reset';
import { NewPassword } from './lobby/new_password';
import { encodeToSocketFmt } from './utils/protobuf';
import { Clubs } from './clubs';
import { TournamentRoom } from './tournament/room';
import { Admin } from './admin/admin';
import { DonateSuccess } from './donate_success';
import { TermsOfService } from './about/termsOfService';
import { ChatMessage } from './gen/api/proto/ipc/chat_pb';
import { MessageType } from './gen/api/proto/ipc/ipc_pb';
import Footer from './navigation/footer';
import { Embed } from './embed/embed';

import {
  connectErrorMessage,
  flashError,
  useClient,
} from './utils/hooks/connect';
import {
  AuthenticationService,
  SocializeService,
} from './gen/api/proto/user_service/user_service_connectweb';

const useDarkMode = localStorage?.getItem('darkMode') === 'true';
document?.body?.classList?.add(`mode--${useDarkMode ? 'dark' : 'default'}`);

const userTile = localStorage?.getItem('userTile');
if (userTile) {
  document?.body?.classList?.add(`tile--${userTile}`);
}

const userBoard = localStorage?.getItem('userBoard');
if (userBoard) {
  document?.body?.classList?.add(`board--${userBoard}`);
}
const bnjyTile = localStorage?.getItem('bnjyMode') === 'true';
if (bnjyTile) {
  document?.body?.classList?.add(`bnjyMode`);
}

// A temporary component until we auto-redirect with Cloudfront
const HandoverSignedCookie = () => {
  // No render.
  const [searchParams] = useSearchParams();
  const jwt = searchParams.get('jwt');
  const ls = searchParams.get('ls');
  const path = searchParams.get('path');

  const successFn = useCallback(() => {
    if (ls) {
      const lsobj = JSON.parse(ls);
      for (const k in lsobj) {
        localStorage.setItem(k, lsobj[k]);
      }
    }
    if (path) {
      window.location.replace(path);
    }
  }, [ls, path]);
  const authClient = useClient(AuthenticationService);
  const cookieSetFunc = useCallback(async () => {
    if (!jwt) {
      return;
    }
    try {
      await authClient.installSignedCookie({ jwt });
      successFn();
    } catch (e) {
      flashError(e);
    }
  }, [authClient, jwt, successFn]);

  useEffect(() => {
    if (jwt) {
      cookieSetFunc();
    } else {
      successFn();
    }
  }, [cookieSetFunc, jwt, successFn]);

  return null;
};

const App = React.memo(() => {
  const { useState } = useMountedState();

  const {
    setExcludedPlayers,
    setExcludedPlayersFetched,
    pendingBlockRefresh,
    setPendingBlockRefresh,
  } = useExcludedPlayersStoreContext();

  const { loginState } = useLoginStateStoreContext();
  const { loggedIn, userID } = loginState;

  const { setAdmins, setModerators, setModsFetched } =
    useModeratorStoreContext();

  const { setFriends, pendingFriendsRefresh, setPendingFriendsRefresh } =
    useFriendsStoreContext();

  const { resetStore } = useResetStoreContext();

  // See store.tsx for how this works.
  const [socketId, setSocketId] = useState(0);
  const resetSocket = useCallback(() => setSocketId((n) => (n + 1) | 0), []);

  const [liwordsSocketValues, setLiwordsSocketValues] = useState({
    sendMessage: (msg: Uint8Array) => {},
    justDisconnected: false,
  });
  const { sendMessage } = liwordsSocketValues;

  const location = useLocation();
  const knownLocation = useRef(location.pathname); // Remember the location on first render.
  console.log('loc pathname', location.pathname);
  const isCurrentLocation = knownLocation.current === location.pathname;
  useEffect(() => {
    if (!isCurrentLocation) {
      resetStore();
    }
  }, [isCurrentLocation, resetStore]);

  const isEmbeddedPath = useMemo(() => {
    const embedPrefixes = ['/embed'];
    return embedPrefixes.some((v) => location.pathname.startsWith(v));
  }, [location.pathname]);

  const socializeClient = useClient(SocializeService);
  const getFullBlocks = useCallback(() => {
    void userID; // used only as effect dependency
    (async () => {
      let toExclude = new Set<string>();
      try {
        if (loggedIn) {
          const resp = await socializeClient.getFullBlocks({});
          toExclude = new Set<string>(resp.userIds);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setExcludedPlayers(toExclude);
        setExcludedPlayersFetched(true);
        setPendingBlockRefresh(false);
      }
    })();
  }, [
    loggedIn,
    userID,
    setExcludedPlayers,
    setExcludedPlayersFetched,
    setPendingBlockRefresh,
    socializeClient,
  ]);

  useEffect(() => {
    getFullBlocks();
  }, [getFullBlocks]);

  useEffect(() => {
    if (pendingBlockRefresh) {
      getFullBlocks();
    }
  }, [getFullBlocks, pendingBlockRefresh]);

  const getMods = useCallback(async () => {
    try {
      const resp = await socializeClient.getModList({});
      setAdmins(new Set<string>(resp.adminUserIds));
      setModerators(new Set<string>(resp.modUserIds));
    } catch (e) {
      console.log(e);
    } finally {
      setModsFetched(true);
    }
  }, [setAdmins, setModerators, setModsFetched, socializeClient]);

  useEffect(() => {
    if (!isEmbeddedPath) {
      getMods();
    }
  }, [getMods, isEmbeddedPath]);

  const getFriends = useCallback(async () => {
    if (loggedIn) {
      try {
        const resp = await socializeClient.getFollows({});
        const friends: { [uuid: string]: FriendUser } = {};
        resp.users.forEach((f: FriendUser) => {
          friends[f.uuid] = f;
        });
        setFriends(friends);
      } catch (e) {
        console.log(e);
      } finally {
        setPendingFriendsRefresh(false);
      }
    }
  }, [setFriends, setPendingFriendsRefresh, loggedIn, socializeClient]);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  useEffect(() => {
    if (pendingFriendsRefresh) {
      getFriends();
    }
  }, [getFriends, pendingFriendsRefresh]);

  const sendChat = useCallback(
    (msg: string, chan: string) => {
      const evt = new ChatMessage({ message: msg, channel: chan });
      sendMessage(encodeToSocketFmt(MessageType.CHAT_MESSAGE, evt.toBinary()));
    },
    [sendMessage]
  );

  const authClient = useClient(AuthenticationService);
  // Some magic code here to force everyone to use the naked domain before
  // using Cloudfront to redirect:
  {
    const loc = window.location;
    if (loc.hostname.startsWith('www.')) {
      const redirectToHandoff = (path: string) => {
        const protocol = loc.protocol;
        const hostname = loc.hostname;
        const nakedHost = hostname.replace(/www\./, '');
        localStorage.clear();
        window.location.replace(`${protocol}//${nakedHost}${path}`);
      };
      authClient
        .getSignedCookie({})
        .then((response) => {
          console.log('got jwt', response.jwt);
          const newPath = `/handover-signed-cookie?${new URLSearchParams({
            jwt: response.jwt,
            ls: JSON.stringify(localStorage),
            path: loc.pathname,
          })}`;
          redirectToHandoff(newPath);
        })
        .catch((e) => {
          if (connectErrorMessage(e) === 'need auth for this endpoint') {
            // We don't have a jwt because we're not logged in. That's ok;
            // let's hand off just the local storage then.
            const newPath = `/handover-signed-cookie?${new URLSearchParams({
              ls: JSON.stringify(localStorage),
              path: loc.pathname,
            })}`;
            redirectToHandoff(newPath);
          }
        });
    }
  }

  // Avoid useEffect in the new path triggering xhr twice.
  if (!isCurrentLocation) return null;

  return (
    <div className="App">
      {!isEmbeddedPath && (
        <LiwordsSocket
          key={socketId}
          resetSocket={resetSocket}
          setValues={setLiwordsSocketValues}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Lobby
              sendSocketMsg={sendMessage}
              sendChat={sendChat}
              DISCONNECT={resetSocket}
            />
          }
        />
        <Route
          path="tournament/:partialSlug/*"
          element={
            <TournamentRoom sendSocketMsg={sendMessage} sendChat={sendChat} />
          }
        />
        <Route
          path="club/:partialSlug/*"
          element={
            <TournamentRoom sendSocketMsg={sendMessage} sendChat={sendChat} />
          }
        />
        <Route path="clubs" element={<Clubs />} />
        <Route
          path="game/:gameID"
          element={
            <GameTable sendSocketMsg={sendMessage} sendChat={sendChat} />
          }
        />
        <Route path="puzzle" element={<SinglePuzzle sendChat={sendChat} />}>
          <Route
            path=":puzzleID"
            element={<SinglePuzzle sendChat={sendChat} />}
          />
        </Route>

        <Route path="embed/game/:gameID" element={<Embed />} />

        <Route path="about" element={<Team />} />
        <Route path="team" element={<Team />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="register" element={<Register />} />
        <Route path="password">
          <Route path="reset" element={<PasswordReset />} />
          <Route path="new" element={<NewPassword />} />
        </Route>
        <Route path="profile/:username" element={<PlayerProfile />} />
        <Route path="profile/" element={<PlayerProfile />} />
        <Route path="settings" element={<Settings />}>
          <Route path=":section" element={<Settings />} />
        </Route>
        <Route path="tile_images" element={<TileImages />}>
          <Route path=":letterDistribution" element={<TileImages />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route
          path="donate"
          element={<Navigate replace to="/settings/donate" />}
        />
        <Route path="donate_success" element={<DonateSuccess />} />
        <Route
          path="handover-signed-cookie"
          element={<HandoverSignedCookie />}
        />
      </Routes>
      {!isEmbeddedPath && <Footer />}
    </div>
  );
});

export default App;
