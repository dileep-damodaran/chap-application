
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

require("dotenv").config();

import { Room } from './src/model/room/roomDocumentSchema.js';
import { User } from './src/model/user/userDocumentSchema.js';
import { Message } from './src/model/message/messageDocumentSchema.js';
import { RoomService } from './src/services/room/room.js';
import { UserService } from './src/services/user/user.js';
import { ChatRoomService } from './src/services/chatRoom/chatRoom.js';
import { MessageService } from './src/services/message/message.js';
import { Db } from "./src/data/db.js";
import { IRoomDocument } from './src/model/room/roomDocument.js';




Db.connect();

io.on('connection', (socket: any) => {

    socket.on('join', async (onboard_data: { un: string, rn: string }, callback: any) => {

        try {

            let newRoom = false;

            const un: string = onboard_data.un ? onboard_data.un.toLowerCase() : "";
            const rn: string = onboard_data.rn ? onboard_data.rn.toLowerCase() : "";

            let room = await RoomService.getRoomByName(rn);

            if (!room) {
                room = await RoomService.createRoom(rn);
                newRoom = true;
            }

            console.log(`room id is ${room.id} and ${room._id}`);
            let chatRoom = await ChatRoomService.getChatRoom(room.id);

            console.log('getChatRoom passed ');
            console.log(chatRoom);

            if (!chatRoom) {
                chatRoom = await ChatRoomService.createChatRoom(room.id);
                console.log('createChatRoom passed ');
                console.log(chatRoom);
            }

            let user = await UserService.getUserByName(un);

            console.log('getUserByName passed ');
            console.log(user);

            if (!user) {
                user = await UserService.addUser(un);
                console.log('addUser passed ');
                console.log(user);
            }


            console.log(`user is `);
            console.log(user);
            chatRoom = await ChatRoomService.addUserInChatRoom(room.id, user.id, socket.id);


            socket.join(chatRoom.id);

            if (newRoom) {
                await MessageService.sendMessage(chatRoom.id, `${user.user_name} created the room`, user.id, socket.io);
            }

            const allMessages = await MessageService.getMessages(chatRoom.id);


            let oldThreads: any[] = [];
            for (let thread of allMessages.messages) {

                const sender = await UserService.getUser(thread.user_id);

                oldThreads.push({ user: sender.user_name, text: thread.message });
            }

            socket.emit('admin-message', oldThreads);

            socket.broadcast.to(room.id).emit('admin-message', {
                user: 'admin',
                text: `${user.user_name} has joined`
            });


            // socket.join(room.id);
            callback();
        }
        catch (err) {
            console.log('*****************Error in join*********************');
            console.log(err);
        }

    });

    // socket.on('send-message', async (socket_id: string, text: string, callback: any) => {

    //     try {

    //         const user = await UserService.getUser(socket_id);
    //         const room = await RoomService.getRoom(socket_id);

    //         const message = new Message();
    //         message.room_id = room.id;
    //         message.user_id = user.id;
    //         message.user_name = user.user_name;
    //         message.message = text
    //         await message.save();

    //         io.to(room.id).emit('admin-message', {
    //             user: user.user_name,
    //             text: text
    //         });

    //         callback();
    //     }

    //     catch (err) {
    //         console.log('*****************Error in sending message*********************');
    //         console.log(err);
    //     }
    // });


    // socket.on('disconnect', async (obj: any) => {

    //     try {

    //         const room = await RoomService.getRoom(socket.id);
    //         const user = await UserService.getUser(socket.id);

    //         if (room && user) {

    //             socket.broadcast.to(room.id).emit('admin-message', {
    //                 user: 'admin',
    //                 text: `${user.user_name} left the room`
    //             });

    //             const message = new Message();
    //             message.room_id = room.id;
    //             message.user_id = 'admin';
    //             message.user_name = 'admin';
    //             message.message = `${user.user_name} left the room`
    //             await message.save();
    //         }
    //     }

    //     catch (err) {
    //         console.log('*****************Error while disconnecting*********************');
    //         console.log(err);
    //     }
    // });
})



server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});