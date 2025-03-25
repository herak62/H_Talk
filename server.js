const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("새 클라이언트 접속!");

    ws.on("message", (message) => {
        console.log(`받은 메시지: ${message}`);

        // 모든 클라이언트에게 메시지 전송
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("클라이언트 연결 종료"));
});

console.log("✅ 웹소켓 서버가 8080 포트에서 실행 중...");