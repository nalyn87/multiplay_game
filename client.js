import net from 'net'

const HOST = '0.0.0.0'
const PORT = '1234'

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('서버와 연결되었습니다')
})

client.on('data', (data) => {
    console.log(data);
})

client.on('close', () => {
    console.log('연결이 끊어졌습니다')
})

process.on('SIGINT', () => {
    client.end(() => process.exit(0))
})

client.on('error', (err) => {
    console.log('클라이언트 에러: ', err)
})