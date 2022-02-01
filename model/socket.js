module.exports = function(io) {
    /* 接收在线人数，传给前端，保证在线人数是最新的 */
    let userList = [{
        name: '默认群聊',
        img: ''
    }];
    let users = [];
    io.on('connection', function(socket) {
        /**
         * 监听用户事件,
         * @{login}登陆事件
         * @{talk}发布事件
         * */
        socket.on('login', (data, callback) => {
                let socketId = socket.id
                console.log("登陆成功")
                let backData = Object.assign(data, { socketId: socketId })
                socket.broadcast.emit('welcome', backData)
                callback(backData)
            }),

            socket.on('settalk', (data, callback) => {
                socket.broadcast.emit('gettalk', data);
                callback(data)
            })







        // socket.on('login', (data, callback) => {
        //     /* 遍历服务器连接对象 */
        //     let islogin = true;
        //     io.sockets.sockets.forEach(iss => {
        //         if (iss.name == data.name) {
        //             islogin = false;
        //         }
        //     });
        //     if (islogin) {
        //         // console.log('用户登录成功：',data);
        //         userList.push(data);
        //         socket.name = data.name;
        //         callback(true);
        //         io.emit('login', userList);
        //     } else {
        //         console.log('用户登录失败！：', data);
        //         callback(false);
        //     }
        // });

        // /* 监听群聊事件 */
        // socket.on('groupChat', data => {
        //     // 发送给所有客户端，除了发送者
        //     /* 修改源数据的属性 */
        //     data.type = 'user';
        //     socket.broadcast.emit('updateChatMessageList', data);
        // });

        // /* 监听私聊事件 */
        // socket.on('privateChat', data => {
        //     /* 找到对应的私聊对象 */
        //     io.sockets.sockets.forEach(iss => {
        //         if (iss.name == data.receiver) {
        //             data.type = 'user';
        //             io.to(iss.id).emit('updateChatMessageList', data);
        //         }
        //     });
        // });

        // /* 用户掉线 */
        // socket.on('disconnect', () => {
        //     /* 删除用户 */
        //     let index = userList.findIndex(i => i.name == socket.name);
        //     if (index != -1) {
        //         userList.splice(index, 1);
        //         /* 通知前端 */
        //         io.emit('login', userList);
        //     }
        // });
    });




}