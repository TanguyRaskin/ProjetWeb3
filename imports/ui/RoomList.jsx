import { useSubscribe, useFind } from "meteor/react-meteor-data";
import React from "react";
import { RoomCollection } from "../api/rooms";
import { useNavigate } from "react-router-dom";

export const RoomList = () => {
  const navigate = useNavigate();
  const listLoading = useSubscribe('rooms')
  const rooms = useFind(() => RoomCollection.find({}), []);

  if (listLoading()) return "Loading...";
  return (
    <div>
      <button
        onClick={() => {
          Meteor.call("createRoom");
        }}
      >
        {" "}
        Create Room{" "}
      </button>
      <ul>
        {rooms.map(({ _id, capacity, winner }) => (
          <li key={_id}>
            Room {_id} <br />
            {winner ? `Winner:${winner}` : ""}
            <br />
            <button
              disabled={capacity <= 0}
              onClick={() => {
                Meteor.call(
                  "joinRoom",
                  { roomId: _id },
                  (err, { room, color }) => {
                    navigate(`/game/${room._id}`, { state: { color } });
                  }
                );
              }}
            >
              {" "}
              Join Room{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
